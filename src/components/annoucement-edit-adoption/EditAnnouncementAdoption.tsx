'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, ChevronRight, ChevronLeft, Upload } from 'lucide-react';
import {
  AnimalSize,
  AnnouncementDetails,
  AnnouncementType,
  updateAnnouncement,
} from '@/api/announcement';
import { useNavigate } from 'react-router-dom';

interface EditAnnouncementAdoptionProps {
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

export default function EditAnnouncementAdoption({
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
}: EditAnnouncementAdoptionProps) {
  const navigate = useNavigate();

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
    animalWeight: animal.weight,
    animalAge: animal.age,
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

  const handleSave = async () => {
    try {
      const announcementData: AnnouncementDetails = {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        images: formData.images,
        announcementType: formData.annoucementType,
        active: formData.active,
        address: {
          street: formData.street,
          cep: formData.cep,
          neighborhood: formData.neighborhood,
          reference: formData.reference,
          complemento: formData.complemento,
        },
        animal: {
          name: formData.animalName,
          type: formData.animalType,
          breed: formData.animalBreed,
          size: formData.animalSize,
          weight: formData.animalWeight, // Para anúncios de adoção
          age: formData.animalAge,
        },
      };

      console.log(announcementData);
      await updateAnnouncement(announcementData);

      navigate('/my-announcements');
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  // const handleSave = () => {
  //   const announcementData: AnnouncementDetails = {
  //     id: formData.id,
  //     title: formData.title,
  //     description: formData.description,
  //     contactPhone: formData.contactPhone,
  //     contactEmail: formData.contactEmail,
  //     images: formData.images,
  //     announcementType: formData.annoucementType,
  //     active: formData.active,
  //     address: {
  //       street: formData.street,
  //       cep: formData.cep,
  //       neighborhood: formData.neighborhood,
  //       reference: formData.reference,
  //       complemento: formData.complemento,
  //     },
  //     animal: {
  //       name: formData.animalName,
  //       type: formData.animalType,
  //       breed: formData.animalBreed,
  //       size: formData.animalSize,
  //       weight: formData.animalWeight, // Para anúncios de adoção
  //       age: formData.animalAge,
  //     },
  //   };

  //   console.log('Dados do anúncio:', JSON.stringify(announcementData, null, 2));
  // };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 mt-20">
      {/* Progress Tracker */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <div
              className={`ml-2 ${step === 1 ? 'text-primary font-medium' : 'text-muted-foreground'}`}
            >
              Informações Gerais
            </div>
          </div>
          <div className="w-16 h-0.5 bg-muted" />
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              2
            </div>
            <div
              className={`ml-2 ${step === 2 ? 'text-primary font-medium' : 'text-muted-foreground'}`}
            >
              Detalhes do Animal
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault(); // Evita o recarregamento da página.
          handleSave(); // Chama sua função de salvar.
        }}
        className="space-y-6"
      >
        {step === 1 ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Anúncio</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Cachorro perdido na região central"
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
                placeholder="Descreva os detalhes do anúncio"
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
                onClick={() => setStep(2)}
                className="w-full sm:w-auto"
              >
                Avançar
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="animalName">Nome do Animal</Label>
              <Input
                id="animalName"
                name="animalName"
                value={formData.animalName}
                onChange={handleInputChange}
                placeholder="Ex: Rex"
                required
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="age">Idade</Label>
              <Input
                id="age"
                name="age"
                value={formData.animalAge}
                onChange={handleInputChange}
                placeholder="Ex: 2 anos"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="peso">Peso</Label>
              <Input
                id="peso"
                name="peso"
                value={formData.animalWeight}
                onChange={handleInputChange}
                placeholder="Ex: 5kg"
                required
              />
            </div>

            <div className="flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Salvar Alterações
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
