import Hero from "../components/Hero";
import PilihanBelajar from "../components/PilihanBelajar";
import ProvinceCarousel from "../components/ProvinceCarousel";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Hero />
      <div className="relative z-10">
        <PilihanBelajar />
        <ProvinceCarousel />
      </div>
      <Footer />
    </div>
  );
}
