import Footer from '../home/Footer';
import Header from '../home/header/Header';
import SidebarMenu from '../profile/SidebarMenu';

type UserProfileLayoutProps = {
  children: React.ReactNode;
};

export default function UserProfileLayout({
  children,
}: UserProfileLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <SidebarMenu />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
