import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider/hook';
import { Link, useNavigate } from 'react-router-dom';
import { LogOutIcon } from 'lucide-react';

export default function Header() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    navigate('/login');
  };

  return (
    <header className="bg-slate-100 fixed w-full top-0 left-0">
      <div className="flex flex-wrap justify-between items-center py-2 max-w-[56.25rem] mx-auto">
        <Link to="/">
          <img
            src="./img/logo-atual.png"
            alt="logo buscapet"
            className="w-[5rem] h-[5rem]"
          />
        </Link>
        <nav>
          <ul className="flex flex-wrap justify-evenly gap-6">
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <a>Buscar</a>
            </li>
            <li>
              <Link to="/announcement-registration">Cadastrar Anúncio</Link>
            </li>
          </ul>
        </nav>
        {!token ? (
          <>
            <button className="bg-green-400 text-white px-2 py-2 rounded-md">
              <Link to="/register">Cadastro</Link>
            </button>
            <button className="bg-green-400 text-white px-4 py-2 rounded-md">
              <Link to="/login">Entrar</Link>
            </button>
          </>
        ) : (
          <Button className="flex gap-2" onClick={handleLogout}>
            Sair
            <LogOutIcon />
          </Button>
        )}
      </div>
    </header>
  );
}
