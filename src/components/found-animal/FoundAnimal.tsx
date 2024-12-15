import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ErrorsMessage from '../commons/FormErrorsMessage';
import { FoundSchema } from './schema';
import type { FoundAnimalFormSchema } from './type';
import { toast } from '@/hooks/use-toast';
import Header from '../home/header/Header';
import { useNavigate } from 'react-router-dom';
import { useCreateFoundAnnouncement } from '../../api/found-animal/hooks'; 
import { useSearchCep } from '../../api/search-address/hooks';
import { Button } from '../ui/button';
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Footer from '../home/Footer';
import { Check, ChevronRight, ChevronLeft, Upload } from 'lucide-react';

export default function FoundAnimal() {
  const navigate = useNavigate();
  const [imgSize, setImgSize] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const { searchCep } = useSearchCep();
  const { mutateAsync: createFoundAnnouncement, isPending } = useCreateFoundAnnouncement();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    watch
  } = useForm<FoundAnimalFormSchema>({
    resolver: zodResolver(FoundSchema),
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

  const onSubmit: SubmitHandler<FoundAnimalFormSchema> = async (data) => {
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
        id: 2,
        description: 'Found',
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
      if (imgSize > 4 * 1024 * 1024) {
        toast({
          title: 'Erro ao cadastrar animal encontrado',
          description: 'A imagem deve ter no máximo 4MB.',
        });
        return;
      }

      await createFoundAnnouncement(payload);
    
      toast({
        title: 'Animal cadastrado com sucesso!',
        description: 'Navegue pela plataforma para ver animais cadastrados',
      });
    
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar animal encontrado',
        description: 'Tente novamente',
      });
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const resultado = (reader.result as string).substring(23);
          setValue('imageAnnouncement.image', resultado);
          setSelectedFileName(file.name);
          setImgSize(file.size);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
  });

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, '');
    let formattedPhone = '';
  
    if (input.length >= 1) {
      formattedPhone = '(' + input.substring(0, 2);
    }
    if (input.length >= 3) {
      formattedPhone += ') ' + input.substring(2, 7);
    }
    if (input.length >= 8) {
      formattedPhone += '-' + input.substring(7, 11);
    }
  
    setValue('contact_phone', formattedPhone);
  };

  const ProgressIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => {
    const steps = [
      'Informações do Anúncio',
      'Informações do Animal',
      'Resumo'
    ];

    return (
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index + 1 <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1 < currentStep ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`h-1 w-16 mx-2 ${
                    index + 1 < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
            <span className={`mt-2 text-sm ${index + 1 <= currentStep ? 'text-primary font-medium' : 'text-gray-500'}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <section id="found-animal" className="bg-gray-50 py-12 min-h-screen flex items-center justify-center mt-14">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-semi-bold text-center">
              <span className="bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
                Cadastro de Animal Encontrado
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressIndicator currentStep={currentStep} totalSteps={3} />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Título do Anúncio</Label>
                      <Input
                        id="title"
                        {...register('title')}
                        placeholder="Ex: Cachorro encontrado na região central"
                      />
                      {errors.title?.message && <ErrorsMessage message={errors.title.message} />}
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
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      placeholder="Descrição geral da origem do animal, bairro encontrado, personalidade, etc..."
                      className="h-12"
                    />
                    {errors.description?.message && <ErrorsMessage message={errors.description.message} />}
                  </div>

                  <div 
                    {...getRootProps()} 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center hover:border-primary transition-colors cursor-pointer"
                  >
                    <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <input {...getInputProps()} />
                    <p>Arraste ou clique para fazer upload de fotos do animal</p>
                    <p className="text-xs italic text-red-700">A imagem (jpeg, jpg, webp) deve ter no máximo 4 MB</p>
                  </div>
                  {selectedFileName && <p className="text-sm text-gray-500 text-center">{selectedFileName}</p>}
                  {errors.imageAnnouncement?.message && <ErrorsMessage message={errors.imageAnnouncement?.message} />}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="animal.size">Tamanho do Animal</Label>
                      <select {...register('animal.size')} className="w-full p-2 border border-gray-300 rounded-md">
                        {sizesOptions.map((size, i) => (
                          <option key={i} value={i}>
                            {size}
                          </option>
                        ))}
                      </select>
                      {errors.animal?.size?.message && <ErrorsMessage message={errors.animal.size.message} />}
                    </div>
                    <div>
                      <Label htmlFor="animal.weight">Peso do animal (kg)</Label>
                      <Input
                        id="animal.weight"
                        type="number"
                        step="0.1"
                        {...register('animal.weight')}
                        placeholder="Ex. 3.1"
                      />
                      {errors.animal?.weight?.message && <ErrorsMessage message={errors.animal.weight.message} />}
                    </div>
                    <div>
                      <Label htmlFor="animal.age">Idade aproximada (anos)</Label>
                      <Input
                        id="animal.age"
                        type="number"
                        step="1"
                        {...register('animal.age')}
                        placeholder="Ex. 1"
                      />
                      {errors.animal?.age?.message && <ErrorsMessage message={errors.animal.age.message} />}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="data">Data que o animal foi encontrado</Label>
                    <Input
                      type="datetime-local"
                      id="data"
                      {...register('data')}
                    />
                    {errors.data?.message && <ErrorsMessage message={errors.data.message} />}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address.cep">CEP aproximado do local de encontro</Label>
                      <Input
                        id="address.cep"
                        {...register('address.cep')}
                        placeholder="Ex: 12345678"
                        onBlur={handleCepChange}
                      />
                      {errors.address?.cep?.message && <ErrorsMessage message={errors.address.cep.message} />}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Label htmlFor="address.neighborhod">Bairro</Label>
                      <Input
                        id="address.neighborhod"
                        {...register('address.neighborhod')}
                        placeholder="Ex: Centro"
                        disabled
                      />
                      {errors.address?.neighborhod?.message && <ErrorsMessage message={errors.address.neighborhod.message} />}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Informações do Anúncio */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-center">Informações do Anúncio</h3>
                      <div className={`bg-gray-50 p-4 rounded-lg ${errors.title || errors.description || errors.contact_phone || errors.imageAnnouncement ? 'border-2 border-red-500' : ''}`}>
                        <p>Título: <i className='text-gray-700 text-sm'>{watch('title')}</i></p>
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                        
                        <p>Descrição: <i className='text-gray-700 text-sm'>{watch('description')}</i></p>
                        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                        
                        <p>Telefone de Contato: <i className='text-gray-700 text-sm'>{watch('contact_phone')}</i></p>
                        {errors.contact_phone && <p className="text-red-500 text-xs">{errors.contact_phone.message}</p>}
                        
                        <p>Imagem: <i className='text-gray-700 text-sm'>{watch('imageAnnouncement.image') ? 'Carregada' : 'Não carregada'}</i></p>
                        {errors.imageAnnouncement && <p className="text-red-500 text-xs">{errors.imageAnnouncement.message}</p>}
                      </div>
                    </div>

                    {/* Informações do Animal */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-center">Informações do Animal</h3>
                      <div className={`bg-gray-50 p-4 rounded-lg ${errors.animal?.name || errors.animal?.type || errors.animal?.breed || errors.animal?.size || errors.animal?.weight || errors.animal?.age ? 'border-2 border-red-500' : ''}`}>
                        <p>Nome: <i className='text-gray-700 text-sm'>{watch('animal.name')}</i></p>
                        {errors.animal?.name && <p className="text-red-500 text-xs">{errors.animal.name.message}</p>}

                        <p>Tipo: <i className='text-gray-700 text-sm'>{watch('animal.type')}</i></p>
                        {/* {errors.animal?.type && <p className="text-red-500 text-xs">{errors.animal.type.message}</p>} */}

                        <p>Raça: <i className='text-gray-700 text-sm'>{watch('animal.breed')}</i></p>
                        {errors.animal?.breed && <p className="text-red-500 text-xs">{errors.animal.breed.message}</p>}

                        <p>Tamanho: <i className='text-gray-700 text-sm'>{sizesOptions[Number(watch('animal.size'))]}</i></p>
                        {errors.animal?.size && <p className="text-red-500 text-xs">{errors.animal.size.message}</p>}

                        <p>Peso: <i className='text-gray-700 text-sm'>{watch('animal.weight')} kg</i></p>
                        {errors.animal?.weight && <p className="text-red-500 text-xs">{errors.animal.weight.message}</p>}

                        <p>Idade: <i className='text-gray-700 text-sm'>{watch('animal.age')} anos</i></p>
                        {errors.animal?.age && <p className="text-red-500 text-xs">{errors.animal.age.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Informações do Local */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-center">Informações do Local</h3>
                    <div className={`bg-gray-50 p-4 rounded-lg ${errors.address?.cep || errors.address?.street || errors.address?.number || errors.address?.neighborhod ? 'border-2 border-red-500' : ''}`}>
                      <p>CEP: <i className='text-gray-700 text-sm'>{watch('address.cep')}</i></p>
                      {errors.address?.cep && <p className="text-red-500 text-xs">{errors.address.cep.message}</p>}

                      <p>Rua: <i className='text-gray-700 text-sm'>{watch('address.street')}</i></p>
                      {errors.address?.street && <p className="text-red-500 text-xs">{errors.address.street.message}</p>}

                      <p>Número: <i className='text-gray-700 text-sm'>{watch('address.number')}</i></p>
                      {errors.address?.number && <p className="text-red-500 text-xs">{errors.address.number.message}</p>}

                      <p>Bairro: <i className='text-gray-700 text-sm'>{watch('address.neighborhod')}</i></p>
                      {errors.address?.neighborhod && <p className="text-red-500 text-xs">{errors.address.neighborhod.message}</p>}
                    </div>
                  </div>
                </div>
              )}


              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <Button type="button" onClick={() => setCurrentStep(prev => prev - 1)} variant="outline">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                  </Button>
                )}
                {currentStep < 3 && (
                  <Button type="button" onClick={() => setCurrentStep(prev => prev + 1)} className="ml-auto">
                    Próxima Etapa <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {currentStep === 3 && (
                  <Button type="submit" disabled={isPending} className="ml-auto">
                    Criar Anúncio <Check className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </>
  );
}

