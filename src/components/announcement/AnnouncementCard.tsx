import React from 'react';

interface AnnouncementCardProps {
    title: string;
    description: string;
    contactPhone: string;
    contactEmail: string;
    animal?: { 
      name: string;
      type: string;
      breed: string;
      size: number;
      weight: number;
      age: number;
    };
    images: Array<{ id: number; image: string | null }>;
}
  
const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  description,
  contactPhone,
  contactEmail,
  animal,
  images,
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        {/* Imagem com tamanho padrão */}
        {images.length > 0 && images[0]?.image ? ( // Usando optional chaining
          <img 
            className="rounded-t-lg h-48 w-full object-cover" // Definindo altura fixa
            src={`data:image/jpeg;base64,${images[0].image}`} // Exibe a primeira imagem
            alt={`Imagem do anúncio: ${title}`} 
          />
        ) : (
          <img 
            className="rounded-t-lg h-48 w-full object-cover" 
            src="/img/avatarpet.png" // Substitua pelo caminho da imagem padrão
            alt="Imagem padrão"
          />
        )}
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <p className="text-xs text-gray-500">Contato: {contactPhone}</p>
        <p className="text-xs text-gray-500">Email: {contactEmail}</p>
        <div className="flex justify-center mt-4"> {/* Centralizando o botão */}
          <a 
            href="#" 
            className="inline-flex items-center px-3 py-1 text-xs font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Ver Mais
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
