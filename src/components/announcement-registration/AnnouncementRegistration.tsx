import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../home/header/Header';
import { Dog, Search, Heart } from 'lucide-react';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  recommendations: string[];
  onClick: () => void;
}

const Section: React.FC<SectionProps> = ({
  title,
  icon,
  recommendations,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-75" />
      <div className="relative p-8 h-full flex flex-col justify-between z-10">
        <div className="text-white mb-4">
          {icon}
          <h2 className="text-2xl font-bold mt-4">{title}</h2>
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
    adocao: [
      'Fotos nítidas do animal.',
      'Informe a idade aproximada.',
      'Vacinações atualizadas.',
      'Comportamento e personalidade do animal.',
      'História ou informações sobre onde foi resgatado.',
      'Requisitos para adoção (se houver).',
    ],
    desaparecido: [
      'Última localização conhecida.',
      'Nome pelo qual é chamado.',
      'Foto nítida do animal.',
      'Características distintivas (cicatrizes, marcas).',
      'Data e hora do desaparecimento.',
      'Contato disponível e ativo.',
    ],
    encontrado: [
      'Localização onde foi encontrado.',
      'Descreva suas características (tamanho, cor, porte).',
      'Foto do animal encontrado.',
      'Informe se estava com coleira ou plaquinha.',
      'Comportamento observado (assustado, amigável, ferido).',
      'Contato claro para o possível dono.',
    ],
  };

  const handleClick = (section: string) => {
    if (section === 'desaparecido') {
      navigate('/missing-animal');
    } else if (section === 'adoção') {
      navigate('/adoption');
    }
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 w-full min-h-screen">
        <div
          className="relative group bg-cover bg-center bg-[url('/img/animal-adocao.jpg')] flex items-center justify-center text-white text-xl font-bold cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoverSection('adoção')}
          onMouseLeave={() => setHoverSection(null)}
          onClick={() => handleClick('adoção')}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70 hover:bg-opacity-0 hover:text-transparent flex items-center justify-center transition-all duration-300">
            <span className="text-2xl">Cadastrar Animal para Adoção</span>
          </div>
          {hoverSection === 'adoção' && (
            <div className="absolute bottom-0 left-0 right-0 bg-white p-4 text-sm text-gray-700 shadow-lg transition-all duration-300 opacity-100">
              <h3 className="font-semibold">Recomendações para Adoção:</h3>
              <ul>
                {recommendations.adoção.map((rec, idx) => (
                  <li key={idx}>- {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div
          className="relative group bg-cover bg-center bg-[url('/img/animal-perdido.avif')] flex items-center justify-center text-white text-xl font-bold cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoverSection('desaparecido')}
          onMouseLeave={() => setHoverSection(null)}
          onClick={() => handleClick('desaparecido')}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70 hover:bg-opacity-0 hover:text-transparent flex items-center justify-center transition-all duration-300">
            <span className="text-2xl">Cadastrar Animal Desaparecido</span>
          </div>
          {hoverSection === 'desaparecido' && (
            <div className="absolute bottom-0 left-0 right-0 bg-white p-4 text-sm text-gray-700 shadow-lg transition-all duration-300 opacity-100">
              <h3 className="font-semibold">
                Recomendações para Animal Desaparecido:
              </h3>
              <ul>
                {recommendations.desaparecido.map((rec, idx) => (
                  <li key={idx}>- {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div
          className="relative group bg-cover bg-center bg-[url('/img/animal-encontrado.jpg')] flex items-center justify-center text-white text-xl font-bold cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoverSection('encontrado')}
          onMouseLeave={() => setHoverSection(null)}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70 hover:bg-opacity-0 hover:text-transparent flex items-center justify-center transition-all duration-300">
            <span className="text-2xl">Cadastrar Animal Encontrado</span>
          </div>
          {hoverSection === 'encontrado' && (
            <div className="absolute bottom-0 left-0 right-0 bg-white p-4 text-sm text-gray-700 shadow-lg transition-all duration-300 opacity-100">
              <h3 className="font-semibold">
                Recomendações para Animal Encontrado:
              </h3>
              <ul>
                {recommendations.encontrado.map((rec, idx) => (
                  <li key={idx}>- {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
