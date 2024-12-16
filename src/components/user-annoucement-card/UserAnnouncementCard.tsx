import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  Mail,
  ImageIcon,
  Edit,
  Trash2,
  ChevronRight,
} from 'lucide-react';

interface UserAnnouncementCardProps {
  id: number;
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
  onViewDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserAnnouncementCard: React.FC<UserAnnouncementCardProps> = ({
  id,
  title,
  description,
  contactPhone,
  contactEmail,
  images,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative">
          {images.length > 0 && images[0]?.image ? (
            <img
              className="h-56 w-full object-cover"
              src={`data:image/jpeg;base64,${images[0].image}`}
              alt={`Imagem do anúncio: ${title}`}
            />
          ) : (
            <img
              className="h-56 w-full object-cover"
              src="/img/avatarpet.png"
              alt="Imagem padrão"
            />
          )}
          {images.length > 1 && (
            <Badge className="absolute top-2 right-2 bg-black/50 text-white">
              <ImageIcon className="mr-1 h-3 w-3" />
              {images.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="mb-2 text-xl font-bold">{title}</CardTitle>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Phone className="mr-2 h-4 w-4" />
            {contactPhone}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="mr-2 h-4 w-4" />
            {contactEmail}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-gray-50 dark:bg-gray-800">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(id)}>
          Detalhes
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(id)}>
            <Edit className="mr-1 h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserAnnouncementCard;
