import { Link, useLocation } from 'react-router-dom';

export default function SidebarMenu() {
  const location = useLocation();

  // Função para verificar se o link está ativo
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 border-r bg-white" style={{ paddingTop: '6.5rem' }}>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Configurações de Conta
        </h1>
        <nav className="mt-6 space-y-1">
          <Link
            to="/profile"
            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
              isActive('/profile')
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-blue-50'
            }`}
          >
            Meu Perfil
          </Link>
          <Link
            to="/my-announcements"
            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
              isActive('/my-announcements')
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-blue-50'
            }`}
          >
            Meus Anúncios
          </Link>
        </nav>
      </div>
    </aside>
  );
}
