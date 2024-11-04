import About from './About';
import Header from './header/Header';
import AnnouncementPanel from './AnnouncementPanel';
import HeroSection from './HeroSection';
import AdoptionProcess from './AdoptionProcess';
import FAQSection from './FAQSection';
import Footer from './Footer';

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
