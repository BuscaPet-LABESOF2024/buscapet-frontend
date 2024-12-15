import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import ErrorsMessage from '../commons/FormErrorsMessage'; // Componente de mensagens de erro
import { adoptionSchema } from './schema'; // Validação com Zod
import type { AdoptionFormSchema } from './type';
import { useDropzone } from 'react-dropzone';
import { useCreateAdoptionAnnouncement } from '../../api/adoption/hooks'; // Hook que usa mutate para criar anúncio
import Header from '../home/header/Header';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Footer from '../home/Footer';

export default function Adoption() {
  const navigate = useNavigate();
  const [imgSize, setImgSize] = useState<number>(0);
  const [showSuccessMessage] = useState<string | null>(null);
  const [showErrorMessage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null); // Novo estado para armazenar o nome do arquivo

  const { mutateAsync: createAdoptionAnnouncement, isPending, isError, isSuccess } = useCreateAdoptionAnnouncement();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch
  } = useForm<AdoptionFormSchema>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      title: '',
      description: '',
      animal: {
        name: '',
        type: '',
        breed: '',
        size: '',
        weight: 0.0,
        age: 0,
      },
      contact_phone: '',
      imageAnnouncement: {
        image: ''
      },
    },
  });

  const sizesOptions = ['Selecione uma opção', 'Pequeno', 'Médio', 'Grande'];

  const onSubmit: SubmitHandler<AdoptionFormSchema> = async (data) => {

    const payload = {
      title: data.title,
      description: data.description,
      animal: {
        name: data.animal.name,
        statusAnimal: 3,
        type: data.animal.type,
        breed: data.animal.breed,
        size: Number(data.animal.size),
        weight: Number(data.animal.weight),
        age: Number(data.animal.age),
      },
      announcementType: {
        id: 3,
        description: 'Available for Adoption',
      },
      contactPhone: data.contact_phone,
      userId: 10,
      imageAnnouncement: data.imageAnnouncement || undefined,
    };

    try {
      // Validação do tamanho da imagem
      if (imgSize > 4 * 1024 * 1024) { // 4MB em bytes
        toast({
          title: 'Erro ao cadastrar animal para adoção',
          description: 'A imagem deve ter no máximo 4MB.',
        });
        return; // Interrompe o fluxo se a imagem for muito grande
      }
    
      // Chamada para criar o anúncio
      await createAdoptionAnnouncement(payload);
    
      toast({
        title: 'Animal cadastrado com sucesso!',
        description: 'Navegue pela plataforma para ver animais cadastrados',
      });
    
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao cadastrar animal para adoção',
        description: 'Tente novamente',
      });
    }
    
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; // Apenas aceita uma imagem  
    if (file) {
  
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const resultado = (reader.result as string).substring(23);
          setValue('imageAnnouncement.image', resultado);
          setSelectedFileName(file.name); // Atualiza o nome do arquivo
          setImgSize(file.size); // Atualiza o estado com o tamanho do arquivo
        }
      };
      reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    }
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
  });

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    let formattedPhone = '';
  
    if (input.length >= 1) {
      formattedPhone = '(' + input.substring(0, 2); // Adiciona o DDD com parênteses
    }
    if (input.length >= 3) {
      formattedPhone += ') ' + input.substring(2, 7); // Adiciona a parte inicial do número
    }
    if (input.length >= 8) {
      formattedPhone += '-' + input.substring(7, 11); // Adiciona o traço e a parte final
    }
  
    setValue('contact_phone', formattedPhone); // Atualiza o valor no formulário
  };

  return (
    <>
      <Header />
      <section id="adoption" className="bg-gray-50 py-12 min-h-screen flex items-center justify-center mt-16">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-center">
              <span className="bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
                Cadastro de Animal para Adoção
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Título do Anúncio</Label>
                      <Input
                        id="title"
                        {...register('title')}
                        placeholder="Ex: Cachorro para adoção"
                      />
                      {errors.title?.message && <ErrorsMessage message={errors.title.message} />}
                    </div>

                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        {...register('description')}
                        placeholder="Descrição geral da origem do animal, bairro encontrado, personalidade, etc..."
                        className="h-32"
                      />
                      {errors.description?.message && <ErrorsMessage message={errors.description.message} />}
                    </div>

                    <div>
                      <Label htmlFor="contact_phone">Telefone de Contato</Label>
                      <Input
                        id="contact_phone"
                        {...register('contact_phone')}
                        placeholder="(00) 00000-0000"
                        value={watch('contact_phone') || ''}
                        onChange={handlePhoneChange}
                        maxLength={15}
                      />
                      {errors.contact_phone?.message && <ErrorsMessage message={errors.contact_phone.message} />}
                    </div>

                    <div 
                      {...getRootProps()} 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <p>Arraste ou clique para fazer upload de fotos do animal</p>
                    </div>
                    {selectedFileName && <p className="mt-2 text-sm text-gray-500 text-center">{selectedFileName}</p>}
                    {errors.imageAnnouncement?.message && <ErrorsMessage message={errors.imageAnnouncement?.message} />}
                  </div>

                  <Button 
                    type="button" 
                    onClick={() => setCurrentStep(2)} 
                    className="w-full"
                  >
                    Próxima Etapa
                  </Button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="animal.name">Nome do Animal</Label>
                      <Input
                        id="animal.name"
                        {...register('animal.name')}
                        placeholder="Nome do animal"
                      />
                      {errors.animal?.name?.message && <ErrorsMessage message={errors.animal.name.message} />}
                    </div>

                    <div>
                      <Label htmlFor="animal.type">Tipo de Animal</Label>
                      <Input
                        id="animal.type"
                        {...register('animal.type')}
                        placeholder="Ex: Cachorro, Gato..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="animal.breed">Raça</Label>
                      <Input
                        id="animal.breed"
                        {...register('animal.breed')}
                        placeholder="Ex. Sem raça definida..."
                      />
                      {errors.animal?.breed?.message && <ErrorsMessage message={errors.animal.breed.message} />}
                    </div>

                    <div>
                      <label htmlFor="animal.size" className="block text-sm font-medium text-gray-700">
                        Tamanho do Animal
                      </label>
                      <select {...register('animal.size')} className="border p-2 rounded w-full">
                        {sizesOptions.map((size, i) => (
                          <option key={i} value={i}>
                            {size}
                          </option>
                        ))}
                      </select>
                      {errors.animal?.size?.message && <ErrorsMessage message={errors.animal.size.message} />}
                    </div>

                    <div>
                      <Label htmlFor="animal.age">Idade aproximada do animal (em anos)</Label>
                      <Input
                        id="animal.age"
                        type="number"
                        step="1"   // Apenas números inteiros
                        min="0"    // Não aceita valores negativos
                        {...register('animal.age', {
                          valueAsNumber: true, // Converte o valor para número automaticamente
                        })}
                        placeholder="Ex. 1"
                      />
                      {errors.animal?.age?.message && <ErrorsMessage message={errors.animal.age.message} />}
                    </div>

                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="w-full"
                    >
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full"
                    >
                      Criar Anúncio
                    </Button>
                  </div>
                </>
              )}
            </form>

            {showSuccessMessage && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
                {showSuccessMessage}
              </div>
            )}
            {showErrorMessage && (
              <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
                {showErrorMessage}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
      <Footer />
    </>
  );
}
