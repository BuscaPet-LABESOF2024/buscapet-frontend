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
      navigate('/lost-animal');
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
            <span className='text-2xl'>Cadastrar Animal para Adoção</span>
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
            <span className='text-2xl'>Cadastrar Animal Desaparecido</span>
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
            <span className='text-2xl'>Cadastrar Animal Encontrado</span>
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
