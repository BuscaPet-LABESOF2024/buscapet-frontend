import { useGetUser } from './api/user/hooks';
import About from './components/home/About';
import Adoption from './components/home/Adoption';
import Header from './components/home/header/Header';

export default function Home() {
  const {
    data: user,
    isError,
    isSuccess,
    isLoading,
    error,
  } = useGetUser({ userId: 12 });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    throw error;
  }

  if (isSuccess) {
    return (
      <>
        <div>{user}</div>
        <Header />
        <Adoption />
        <About />
      </>
    );
  }
}
