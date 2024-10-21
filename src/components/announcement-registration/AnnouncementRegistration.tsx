import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../home/header/Header';

export default function AnnouncementRegistration() {
  const [hoverSection, setHoverSection] = useState<string | null>(null);
  const navigate = useNavigate();

  const recommendations = {
    adoção: [
      'Fotos nítidas do animal',
      'Informe a idade aproximada',
      'Vacinações atualizadas',
    ],
    desaparecido: [
      'Última localização',
      'Nome pelo qual é chamado',
      'Foto nítida do animal',
    ],
    encontrado: [
      'Informe a localização onde foi encontrado',
      'Descreva suas características',
      'Foto do animal encontrado',
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
      <div className="relative z-10">
        <Header />
      </div>

      {/* Adicionando espaçamento no topo dos cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full min-h-screen pt-28">
        {/* Seção Adoção */}
        <div
          className="relative group bg-cover bg-center flex items-center justify-center text-white text-xl font-bold cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoverSection('adoção')}
          onMouseLeave={() => setHoverSection(null)}
          onClick={() => handleClick('adoção')}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-2">
            <span>Cadastrar Animal para Adoção</span>
          </div>
          {hoverSection === 'adoção' && (
            <div className="absolute bottom-12 left-0 right-0 bg-white p-4 text-sm text-gray-700 shadow-lg transition-all duration-300 opacity-100 transform group-hover:translate-y-4">
              <h3 className="font-semibold">Recomendações para Adoção:</h3>
              <ul>
                {recommendations.adoção.map((rec, idx) => (
                  <li key={idx}>- {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Seção Desaparecido */}
        <div
          className="relative group bg-cover bg-center flex items-center justify-center text-white text-xl font-bold cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoverSection('desaparecido')}
          onMouseLeave={() => setHoverSection(null)}
          onClick={() => handleClick('desaparecido')}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-2">
            <span>Cadastrar Animal Desaparecido</span>
          </div>
          {hoverSection === 'desaparecido' && (
            <div className="absolute bottom-12 left-0 right-0 bg-white p-4 text-sm text-gray-700 shadow-lg transition-all duration-300 opacity-100 transform group-hover:translate-y-4">
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

        {/* Seção Encontrado */}
        <div
          className="relative group bg-cover bg-center flex items-center justify-center text-white text-xl font-bold cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoverSection('encontrado')}
          onMouseLeave={() => setHoverSection(null)}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-2">
            <span>Cadastrar Animal Encontrado</span>
          </div>
          {hoverSection === 'encontrado' && (
            <div className="absolute bottom-12 left-0 right-0 bg-white p-4 text-sm text-gray-700 shadow-lg transition-all duration-300 opacity-100 transform group-hover:translate-y-4">
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
