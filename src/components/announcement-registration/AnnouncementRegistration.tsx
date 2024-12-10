import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../home/header/Header';
import { Heart, Search, PawPrint } from 'lucide-react';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  backgroundImage: string;
  recommendations: string[];
  onClick: () => void;
}

const Section: React.FC<SectionProps> = ({
  title,
  icon,
  backgroundImage,
  recommendations,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 hover:bg-opacity-30" />
      <div className="relative h-full flex flex-col justify-between p-6 z-10">
        <div className="text-white">
          {icon}
          <h2 className="text-3xl font-bold mt-4">{title}</h2>
        </div>
        <div
          className={`bg-white rounded-lg p-4 transition-all duration-300 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-full'
          }`}
        >
          <h3 className="font-semibold text-gray-800 mb-2">Recomendações:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-center">
                <span className="mr-2 text-green-500">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function AnnouncementRegistration() {
  const navigate = useNavigate();

  const recommendations = {
    adoção: [
      'Fotos nítidas do animal.',
      'Informe a idade aproximada.',
      'Vacinações atualizadas.',
    ],
    desaparecido: [
      'Última localização.',
      'Nome pelo qual é chamado.',
      'Foto nítida do animal.',
    ],
    encontrado: [
      'Informe a localização onde foi encontrado.',
      'Descreva suas características.',
      'Foto do animal encontrado.',
    ],
  };

  const handleClick = (section: string) => {
    if (section === 'desaparecido') {
      navigate('/lost-animal');
    } else if (section === 'adoção') {
      navigate('/adoption');
    } else if (section === 'encontrado') {
      navigate('/found-animal');
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Cadastro de Anúncios
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Section
            title="Cadastrar Animal para Adoção"
            icon={<Heart className="w-12 h-12" />}
            backgroundImage="/img/animal-adocao.jpg"
            recommendations={recommendations.adoção}
            onClick={() => handleClick('adoção')}
          />
          <Section
            title="Cadastrar Animal Desaparecido"
            icon={<Search className="w-12 h-12" />}
            backgroundImage="/img/animal-perdido.jpg"
            recommendations={recommendations.desaparecido}
            onClick={() => handleClick('desaparecido')}
          />
          <Section
            title="Cadastrar Animal Encontrado"
            icon={<PawPrint className="w-12 h-12" />}
            backgroundImage="/img/animal-encontrado.jpg"
            recommendations={recommendations.encontrado}
            onClick={() => handleClick('encontrado')}
          />
        </div>
      </main>
    </div>
  );
}
