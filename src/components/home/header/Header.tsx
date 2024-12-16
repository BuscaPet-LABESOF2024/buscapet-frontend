import { useAuth } from '@/providers/auth-provider/hook';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { token, username, setToken, setUsername } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setToken('');
    setUsername('');
    navigate('/login');
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="bg-primary fixed w-full top-0 left-0 z-10 text-slate-50">
      <div className="flex flex-row justify-between items-center py-2 px-4 max-w-7xl mx-auto font-semibold">
        <div className="flex gap-4">
          <img
            src="/img/logo-atual.png"
            alt="logo buscapet"
            className="w-[5rem] h-[5rem]"
          />
          <nav className="flex items-center">
            <ul className="flex gap-6">
              <li className="hover:text-slate-200">
                <Link to="/">Início</Link>
              </li>
              <li className="hover:text-slate-200">
                <Link to="/all-announcements">Anúncios</Link>
              </li>
              <li className="hover:text-slate-200">
                <Link to="/announcement-registration">Cadastrar Anúncio</Link>
              </li>
            </ul>
          </nav>
        </div>
        {!token ? (
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/register')}
              className="bg-slate-50 text-primary hover:bg-slate-200"
            >
              Cadastro
            </Button>
            <Button
              onClick={() => navigate('/login')}
              className="bg-slate-50 text-primary hover:bg-slate-200"
            >
              Login
            </Button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 rounded-md bg-slate-50 px-4 py-2 text-primary transition-colors hover:bg-slate-200"
            >
              {username}
              <ChevronDown className="h-4 w-4 text-primary" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-slate-50 py-1 shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-primary transition-colors hover:bg-slate-200"
                >
                  Ver Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-primary transition-colors hover:bg-slate-200"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
