import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ErrorsMessage from '../commons/FormErrorsMessage';
import { LostSchema } from './schema';
import type { LostAnimalFormSchema } from './type';
import { toast } from '@/hooks/use-toast';
import Header from '../home/header/Header';
import { useNavigate } from 'react-router-dom';
import { useCreateLostAnnouncement } from '../../api/lost-animal/hooks'; 
import { useSearchCep } from '../../api/search-address/hooks'; // Importe o hook
import { Button } from '../ui/button';
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Footer from '../home/Footer';

export default function LostAnimal() {
  const navigate = useNavigate();
  const [imgSize, setImgSize] = useState<number>(0);
  const [showSuccessMessage] = useState<string | null>(null);
  const [showErrorMessage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null); // Novo estado para armazenar o nome do arquivo
  const { searchCep } = useSearchCep();
  const { mutateAsync: createLostAnnouncement, isPending } = useCreateLostAnnouncement();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    watch
  } = useForm<LostAnimalFormSchema>({
    resolver: zodResolver(LostSchema),
    defaultValues: {
      title: '',
      description: '',
      data: undefined,
      animal: {
        name: '',
        type: '',
        breed: '',
        size: '',
        weight: '',
        age: '',
      },
      contact_phone: '',
      imageAnnouncement: {
        image: ''
      },
      address: {
        street: '',
        number: '',
        neighborhod: '',
        cep: ''
      }
    },
  });
  
  const sizesOptions = ['Selecione uma opção', 'Pequeno', 'Médio', 'Grande'];

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const cep = event.target.value;
    setValue('address.cep', cep);
    const cepNumerico = cep.replace(/\D/g, '');
  
    if (cepNumerico.length !== 8) {
      setError('address.cep', {
        type: 'manual',
        message: 'CEP inválido! O CEP deve ter 8 dígitos.',
      });
      return;
    }
  
    try {
      const data = await searchCep(cepNumerico);
  
      if (!data) {
        setError('address.cep', {
          type: 'manual',
          message: 'CEP inexistente!',
        });
        return;
      }
  
      setValue('address.street', data.logradouro);
      setValue('address.neighborhod', data.bairro);

      clearErrors('address.cep');
    } catch (err) {
      setError('address.cep', {
        type: 'manual',
        message: 'Erro ao consultar o CEP!',
      });
    }
  };
  

  const onSubmit: SubmitHandler<LostAnimalFormSchema> = async (data) => {

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
        id: 1,
        description: 'Lost',
      },
      contactPhone: data.contact_phone,
      userId: 10,
      imageAnnouncement: data.imageAnnouncement || undefined,
      address: {
        street: data.address.street,
        number: Number(data.address.number),
        neighborhod: data.address.neighborhod,
        cep: data.address.cep,
      },
      data: new Date(data.data),
    };

    try {
      if (imgSize > 4 * 1024 * 1024) { // 4MB em bytes
        toast({
          title: 'Erro ao cadastrar animal para adoção',
          description: 'A imagem deve ter no máximo 4MB.',
        });
        return; // Interrompe o fluxo se a imagem for muito grande
      }

      await createLostAnnouncement(payload);
    
      toast({
        title: 'Animal cadastrado com sucesso!',
        description: 'Navegue pela plataforma para ver animais cadastrados',
      });
    
      navigate('/');
    } catch (error) {
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
                Cadastro de Animal Desaparecido
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
                        placeholder="Ex: Cachorro desaparecido na região central"
                      />
                      {errors.title?.message && <ErrorsMessage message={errors.title.message} />}
                    </div>

                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        {...register('description')}
                        placeholder="Descrição geral da origem do animal, bairro onde desapareceu, personalidade, etc..."
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
                        placeholder="Ex: Sem raça definida..."
                      />
                      {errors.animal?.breed?.message && <ErrorsMessage message={errors.animal.breed.message} />}
                    </div>

                    <div>
                      <Label htmlFor="animal.size">Tamanho do Animal</Label>
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
                      <Label htmlFor="animal.weight">Peso do animal</Label>
                      <Input
                        id="animal.weight"
                        {...register('animal.weight')}
                        placeholder="Ex. 3,1"
                      />
                      {errors.animal?.weight?.message && <ErrorsMessage message={errors.animal.weight.message} />}
                    </div>

                    <div>
                      <Label htmlFor="animal.age">Idade aproximada do animal</Label>
                      <Input
                        id="animal.age"
                        {...register('animal.age')}
                        placeholder="Ex. 1"
                      />
                      {errors.animal?.age?.message && <ErrorsMessage message={errors.animal.age.message} />}
                    </div>

                    <div>
                      <Label htmlFor="data">Data que o animal desapareceu</Label>
                      <Input
                        type="datetime-local"
                        id="data"
                        {...register('data')}
                      />
                      {errors.data?.message && <ErrorsMessage message={errors.data.message} />}
                    </div>

                    <div>
                      <Label htmlFor="address.cep">CEP aproximado do local</Label>
                      <Input
                        id="address.cep"
                        {...register('address.cep')}
                        placeholder="Ex: 12345678"
                        onBlur={handleCepChange}
                      />
                      {errors.address?.cep?.message && <ErrorsMessage message={errors.address.cep.message} />}
                    </div>

                    <div>
                      <Label htmlFor="address.neighborhod">Bairro</Label>
                      <Input
                        id="address.neighborhod"
                        {...register('address.neighborhod')}
                        placeholder="Ex: Centro"
                        disabled
                      />
                      {errors.address?.neighborhod?.message && <ErrorsMessage message={errors.address.neighborhod.message} />}
                    </div>

                    <div>
                      <Label htmlFor="address.street">Rua</Label>
                      <Input
                        id="address.street"
                        {...register('address.street')}
                        placeholder="Ex: Rua das Flores"
                        disabled
                      />
                      {errors.address?.street?.message && <ErrorsMessage message={errors.address.street.message} />}
                    </div>

                    <div>
                      <Label htmlFor="address.number">Número</Label>
                      <Input
                        id="address.number"
                        {...register('address.number')}
                        placeholder="Ex: 123"
                      />
                      {errors.address?.number?.message && <ErrorsMessage message={errors.address.number.message} />}
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
          </CardContent>
        </Card>
      </section>
    <Footer />
    </>
  );
}
