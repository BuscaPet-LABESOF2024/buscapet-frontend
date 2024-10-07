import { Link } from 'react-router-dom';

export default function Header() {
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
              <a>Adoção</a>
            </li>
            <li>
              <a>Animais perdidos</a>
            </li>
            <li>
              <Link to="/missing-animal">Cadastrar Animal</Link>
            </li>
            <li>
              <a href="/#about">Sobre</a>
            </li>
            <li>
              <a>Contato</a>
            </li>
          </ul>
        </nav>
        <button className="bg-green-400 text-white px-2 py-2 rounded-md">
          <Link to="/register">Cadastro</Link>
        </button>
        <button className="bg-green-400 text-white px-4 py-2 rounded-md">
          <Link to="/login">Entrar</Link>
        </button>
      </div>
    </header>
  );
}
