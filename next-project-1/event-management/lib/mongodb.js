import dns from "dns";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI?.trim();
const FALLBACK_DNS_SERVERS = ["8.8.8.8", "1.1.1.1"];

// Initialize the cache on the global object to persist across hot reloads in development
let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Ensures DNS fallback servers are configured for MongoDB SRV resolution.
 */
function setFallbackDnsServers() {
  if (MONGODB_URI?.startsWith("mongodb+srv://")) {
    try {
      dns.setServers(FALLBACK_DNS_SERVERS);
    } catch (error) {
      console.warn(
        "Unable to configure fallback DNS servers for MongoDB SRV resolution:",
        error,
      );
    }
  }
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Caches the connection to prevent multiple connections during development hot reloads.
 * @returns Promise resolving to the Mongoose instance
 */
async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
      );
    }

    const options = {
      bufferCommands: false,
    };

    setFallbackDnsServers();

    // Try primary connection. If SRV DNS resolution fails, retry by
    // converting the `mongodb+srv://` URI to a standard `mongodb://` URI
    // as a fallback (helps when SRV DNS queries are blocked on the host).
    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongooseInstance) => mongooseInstance)
      .catch(async (error) => {
        // If SRV resolution failed and we have an +srv URI, try a non-SRV fallback
        const isSrv = MONGODB_URI && MONGODB_URI.startsWith("mongodb+srv://");
        if (
          isSrv &&
          error &&
          /querySrv|ENOTFOUND|ECONNREFUSED/i.test(error.message)
        ) {
          try {
            const fallbackUri = MONGODB_URI.replace(
              "mongodb+srv://",
              "mongodb://",
            );
            console.warn(
              "MongoDB SRV lookup failed; retrying with fallback URI (non-SRV)",
            );
            const inst = await mongoose.connect(fallbackUri, options);
            return inst;
          } catch (fallbackErr) {
            cached.promise = null;
            throw fallbackErr;
          }
        }

        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
