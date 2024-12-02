import Footer from '../home/Footer';
import Header from '../home/header/Header';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
