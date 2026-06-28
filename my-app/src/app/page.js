import BannerSec from "./components/home-components/BannerSec";
import LatestProducts from "./components/home-components/LatestProducts";

export const metadata = {};

export default function Home() {
  metadata.title = "Home Page";
  metadata.description = "Home description";
  return (
    <main className="min-h-screen">
      <BannerSec />
      <LatestProducts />
    </main>
  );
}
