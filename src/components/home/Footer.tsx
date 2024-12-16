export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6 mt-auto">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo e Nome do Site */}
        <div className="flex items-center space-x-3">
          <img
            src="/img/logo-atual.png"
            alt="Logo BuscaPet"
            className="w-20 h-20"
          />
          <span className="text-4xl font-bold">BuscaPet</span>
        </div>

        {/* Mensagem de Copyright */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BuscaPet. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
