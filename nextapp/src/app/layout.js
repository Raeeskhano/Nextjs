import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nextjs App",
  description:
    "i am Raees khan, and right now i am practicing nextjs which is amazing and simplify things which we are doing in react.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
