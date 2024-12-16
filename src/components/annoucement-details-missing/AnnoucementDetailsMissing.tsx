import { Card } from '@/components/ui/card';
import {
  AnimalSize,
  AnnouncementType,
  ImagesResponse,
} from '@/api/announcement';
import { Badge } from '../ui/badge';

interface AnnoucementDetailsMissingProps {
  animal: {
    name: string;
    type: string;
    breed: string;
    size: AnimalSize;
  };
  title: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  images: ImagesResponse[];
  address?: {
    street?: string;
    neighborhood?: string;
    reference?: string;
    complemento?: string;
  };
  active: boolean;
  annoucementType: AnnouncementType;
}

function getAnnouncementTypeColor(type: AnnouncementType): string {
  const colorMap = {
    [AnnouncementType.Adoption]: 'bg-blue-500',
    [AnnouncementType.Lost]: 'bg-yellow-500',
    [AnnouncementType.Found]: 'bg-green-500',
  };

  return colorMap[type] || 'bg-gray-500';
}

const AnnoucementDetailsMissing: React.FC<AnnoucementDetailsMissingProps> = ({
  animal,
  title,
  description,
  contactPhone,
  contactEmail,
  images,
  address,
  active,
  annoucementType,
}: AnnoucementDetailsMissingProps) => {
  const sizeLabel =
    {
      [AnimalSize.Small]: 'Pequeno',
      [AnimalSize.Medium]: 'Médio',
      [AnimalSize.Large]: 'Grande',
    }[animal.size] || 'Desconhecido';

  const announcementTypeLabel = {
    [AnnouncementType.Adoption]: 'Adoção',
    [AnnouncementType.Lost]: 'Perdido',
    [AnnouncementType.Found]: 'Encontrado',
  }[annoucementType];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mt-12 flex justify-center">
        {images.length > 0 && images[0]?.image ? (
          <img
            className="rounded-md h-64 w-auto object-contain md:h-80 mx-auto"
            src={`data:image/jpeg;base64,${images[0].image}`}
            alt={`Imagem do anúncio: ${title}`}
          />
        ) : (
          <img
            className="rounded-t-lg h-64 w-auto object-contain md:h-80 mx-auto"
            src="/img/avatarpet.png"
            alt="Imagem padrão"
          />
        )}
      </div>

      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <div className="flex items-center gap-2 mb-6">
        <Badge
          variant={active ? 'outline' : 'destructive'}
          className={`text-lg ${active ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {active ? 'Ativo' : 'Inativo'}
        </Badge>
        <Badge
          variant="outline"
          className={`${getAnnouncementTypeColor(annoucementType)} text-lg`}
        >
          {announcementTypeLabel}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Características</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nome</span>
              <span>{animal.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Raça</span>
              <span>{animal.breed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo</span>
              <span>{animal.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Porte</span>
              <span>{sizeLabel}</span>
            </div>
          </div>
        </Card>

        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Sobre o Animal</h2>
            <p className="text-muted-foreground">{description}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Informações de Contato
            </h2>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground min-w-24">
                  Endereço:
                </span>
                <span>
                  {address?.street}, {address?.neighborhood || 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground min-w-24">Email:</span>
                <span>{contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground min-w-24">
                  Telefone:
                </span>
                <span>{contactPhone}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-muted">
            <p className="text-center font-medium">
              Caso tenha visto este animal, entre em contato com o anunciante!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnnoucementDetailsMissing;
