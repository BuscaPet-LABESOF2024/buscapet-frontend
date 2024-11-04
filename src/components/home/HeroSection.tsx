import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative mx-auto mt-20 max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12 pt-20">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Adote seu novo melhor amigo!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Ajudar a dar uma segunda chance para abrigar animais também mudará
            sua vida.
          </p>
          <div className="mt-8">
            <Link
              to="/pets"
              className="inline-flex items-center rounded-md bg-[#0B4F82] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#0B4F82]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F82]"
            >
              Encontre o seu pet
            </Link>
          </div>
        </div>
        <div className="relative max-w-lg lg:ml-auto">
          <img
            src="./img/mulher-com-cachorro.jpeg"
            alt="Pessoa com um cachorro"
            width={500}
            height={500}
            className="relative mx-auto max-w-full rounded-[2rem]"
          />
        </div>
      </div>
    </section>
  );
}