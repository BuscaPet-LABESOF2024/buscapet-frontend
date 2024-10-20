import About from './About';
import Adoption from './Adoption';
import Header from './header/Header';
import AnnouncementPanel from './AnnouncementPanel';

export default function Home() {
  return (
    <>
      <Header />
      <AnnouncementPanel />
      <Adoption />
      <About />
    </>
  );
}
