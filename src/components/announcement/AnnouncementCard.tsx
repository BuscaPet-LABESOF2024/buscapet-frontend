import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

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
  images,
}) => {
  return (
    <Card>
      <CardHeader>
        {images.length > 0 && images[0]?.image ? ( // Usando optional chaining
          <img
            className="rounded-t-lg h-48 w-full object-cover" // Definindo altura fixa
            src={`data:image/jpeg;base64,${images[0].image}`} // Exibe a primeira imagem
            alt={`Imagem do anúncio: ${title}`}
          />
        ) : (
          <img
            className="rounded-t-lg h-48 w-full object-cover rounded-md"
            src="/img/avatarpet.png" // Substitua pelo caminho da imagem padrão
            alt="Imagem padrão"
          />
        )}
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <p className="text-xs text-gray-500">Contato: {contactPhone}</p>
        <p className="text-xs text-gray-500">Email: {contactEmail}</p>
      </CardContent>
      <CardFooter>
        <Button>Ver detalhes</Button>
      </CardFooter>
    </Card>
  );
};

export default AnnouncementCard;
