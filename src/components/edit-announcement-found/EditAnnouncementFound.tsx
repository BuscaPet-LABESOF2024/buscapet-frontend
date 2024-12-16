import { AnimalSize, AnnouncementType } from '@/api/announcement';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Check, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

interface EditAnnouncementFoundProps {
  id: number;
  animal: {
    name: string;
    type: string;
    breed: string;
    size: AnimalSize;
    weight?: number;
    age?: number;
  };
  title: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  images: Array<{ id: number; image: string | null }>;
  address?: {
    street?: string;
    cep?: string;
    neighborhood?: string;
    reference?: string;
    complemento?: string;
  };
  active: boolean;
  annoucementType: AnnouncementType;
}

const AnimalSizeMap = {
  small: AnimalSize.Small,
  medium: AnimalSize.Medium,
  large: AnimalSize.Large,
};

const AnimalSizeReverseMap = {
  [AnimalSize.Small]: 'small',
  [AnimalSize.Medium]: 'medium',
  [AnimalSize.Large]: 'large',
};

export default function EditAnnouncementFound({
  id,
  animal,
  title,
  description,
  contactPhone,
  contactEmail,
  images,
  address,
  active,
  annoucementType,
}: EditAnnouncementFoundProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id,
    title,
    description,
    contactPhone,
    contactEmail,
    images,
    animalName: animal.name,
    animalType: animal.type,
    animalBreed: animal.breed,
    animalSize: animal.size,
    animalWeight: animal.weight || '',
    animalAge: animal.age || '',
    street: address?.street || '',
    cep: address?.cep || '',
    neighborhood: address?.neighborhood || '',
    reference: address?.reference || '',
    complemento: address?.complemento || '',
    active,
    annoucementType,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChangeAnimalSize = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: AnimalSizeMap[value as keyof typeof AnimalSizeMap], // Converte o texto para o enum.
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Adicione aqui a lógica para salvar as alterações
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 mt-20">
      {/* Progress Tracker */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              <div
                className={`ml-2 ${step === s ? 'text-primary font-medium' : 'text-muted-foreground'}`}
              >
                {s === 1
                  ? 'Informações Gerais'
                  : s === 2
                    ? 'Detalhes do Animal'
                    : 'Localização'}
              </div>
              {s < 3 && <div className="w-16 h-0.5 bg-muted ml-4" />}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Anúncio</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Cachorro desaparecido na região central"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descreva os detalhes do animal desaparecido"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Telefone para Contato</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Imagem do Animal</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Clique para fazer upload ou arraste a imagem
                  </p>
                  {typeof formData.images === 'string' && (
                    <p className="mt-2 text-sm text-primary">
                      {formData.images}
                    </p>
                  )}
                  {formData.images instanceof File && (
                    <p className="mt-2 text-sm text-primary">
                      {formData.images.name}
                    </p>
                  )}
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto"
              >
                Avançar
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="animalType">Tipo de Animal</Label>
              <Input
                id="animalType"
                name="animalType"
                value={formData.animalType}
                onChange={handleInputChange}
                placeholder="Ex: Gato"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="breed">Raça</Label>
              <Input
                id="breed"
                name="breed"
                value={formData.animalBreed}
                onChange={handleInputChange}
                placeholder="Ex: Labrador"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Tamanho</Label>
              <Select
                value={AnimalSizeReverseMap[formData.animalSize]}
                onValueChange={(value) =>
                  handleSelectChangeAnimalSize('animalSize', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeno</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="w-full sm:w-auto"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto"
              >
                Avançar
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                placeholder="00000-000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleInputChange}
                placeholder="Nome do bairro"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Rua</Label>
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="Nome da rua"
                required
              />
            </div>

            <div className="flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="w-full sm:w-auto"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Salvar Anúncio
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
