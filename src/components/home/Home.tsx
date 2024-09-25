import { useGetUser } from '../../api/user/hooks';
import About from './About';
import Adoption from './Adoption';
import Header from './header/Header';

export default function Home() {
  const { data: user } = useGetUser({userId: 1});

  console.log("user => ", user);

  console.log("home");


  return (
    <>
      <Header />
      <Adoption />
      <About />
    </>
  );
}
