import { Card } from '@/components/ui/card';
import { AnimalSize, ImagesResponse } from '@/api/announcement';

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
}: AnnoucementDetailsMissingProps) => {
  const sizeLabel =
    {
      [AnimalSize.Small]: 'Pequeno',
      [AnimalSize.Medium]: 'Médio',
      [AnimalSize.Large]: 'Grande',
    }[animal.size] || 'Desconhecido';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
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
      </div>

      <h3 className="text-3xl font-bold mb-6">{title}</h3>

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
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ativo</span>
              <span>{active ? 'Sim' : 'Não'}</span>
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
              Se encontrou esse animal, entre em contato com o anunciante!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnnoucementDetailsMissing;
