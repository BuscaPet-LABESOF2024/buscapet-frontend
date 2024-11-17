import About from './About';
import Header from './header/Header';
import HeroSection from './HeroSection';
import AdoptionProcess from './AdoptionProcess';
import FAQSection from './FAQSection';
import Footer from './Footer';
import AnnouncementPanel from './AnnouncementPanel';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <AdoptionProcess />
      <AnnouncementPanel />
      <FAQSection />
      <About />
      <Footer />
    </>
  );
}
