import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import BrandStatement from '../components/landing/BrandStatement';
import ShowsSection from '../components/landing/ShowsSection';
import CoreValues from '../components/landing/CoreValues';
import ManifestoSection from '../components/landing/ManifestoSection';
import GalleryStrip from '../components/landing/GalleryStrip';
import SponsorshipSection from '../components/landing/SponsorshipSection';
import FooterCTA from '../components/landing/FooterCTA';
import SiteFooter from '../components/landing/SiteFooter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <BrandStatement />
        <ManifestoSection />
        <ShowsSection />
        <CoreValues />
        <SponsorshipSection />
        <GalleryStrip />
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
