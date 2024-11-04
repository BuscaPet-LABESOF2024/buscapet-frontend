import { useAuth } from '@/providers/auth-provider/hook';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    <header className="bg-slate-100 fixed w-full top-0 left-0 z-10">
      <div className="flex flex-row justify-between items-center py-2 max-w-[56.25rem] mx-auto">
        <Link to="/">
          <img
            src="./img/logo-atual.png"
            alt="logo buscapet"
            className="w-[5rem] h-[5rem]"
          />
        </Link>
        <nav className="flex items-center">
          <ul className="flex gap-6">
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>Buscar</li>
            <li>
              <Link to="/announcement-registration">Cadastrar Anúncio</Link>
            </li>
          </ul>
        </nav>
        {!token ? (
          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="bg-green-400 text-white px-2 py-2 rounded-md"
            >
              Cadastro
            </Link>
            <Link
              to="/login"
              className="bg-green-400 text-white px-4 py-2 rounded-md"
            >
              Entrar
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
            >
              {username}
              <ChevronDown className="h-4 w-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 py-1 shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-200 transition-colors hover:bg-gray-700"
                >
                  Ver Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-200 transition-colors hover:bg-gray-700"
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
