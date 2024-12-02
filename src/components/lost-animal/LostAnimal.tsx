import { useForm, SubmitHandler, UseFormClearErrors } from 'react-hook-form';
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

const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return value;
};

export default function LostAnimal() {
  const navigate = useNavigate();
  const [imgSize, setImgSize] = useState<number>(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  const [showErrorMessage, setShowErrorMessage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null); // Novo estado para armazenar o nome do arquivo
  const { searchCep } = useSearchCep();
  const { mutateAsync: createLostAnnouncement } = useCreateLostAnnouncement();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors
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
    const formattedPhone = formatPhoneNumber(event.target.value);
    setValue('contact_phone', formattedPhone);
  };

  return (
    <>
      <Header />
      <section id="adoption">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-xl bg-gray-100 p-8 rounded-lg shadow-lg mt-7">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Cadastro de Animal Desaparecido
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {currentStep === 1 && (
                <>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Título do Anúncio
                    </label>
                    <input
                      id="title"
                      {...register('title')}
                      placeholder="Ex: Cachorro para adoção"
                      className="border p-2 rounded w-full"
                    />
                    {errors.title?.message && <ErrorsMessage message={errors.title.message} />}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Descrição
                    </label>
                    <textarea
                      id="description"
                      {...register('description')}
                      placeholder="Descrição geral da origem do animal, bairro encontrado, personalidade, etc..."
                      className="border p-2 rounded w-full"
                    />
                    {errors.description?.message && <ErrorsMessage message={errors.description.message} />}
                  </div>

                  <div>
                    <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
                      Telefone de Contato
                    </label>
                    <input
                      id="contact_phone"
                      {...register('contact_phone')}
                      placeholder="(xx) xxxx-xxxxx"
                      className="border p-2 rounded w-full"
                      onChange={handlePhoneChange} // Aplica a formatação quando o valor mudar
                    />
                    {errors.contact_phone?.message && <ErrorsMessage message={errors.contact_phone.message} />}
                  </div>

                  <div {...getRootProps()} className="border-dashed border-2 p-4 text-center">
                    <input {...getInputProps()} />
                    <p>Arraste ou clique para fazer upload de fotos do animal</p>
                  </div>
                  {selectedFileName && <p className="mt-2 text-gray-400 text-center"> {selectedFileName}</p>} {/* Exibe o nome do arquivo */}
                  {errors.imageAnnouncement?.message && <ErrorsMessage message={errors.imageAnnouncement?.message} />}

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="bg-purple-500 text-white p-2 rounded w-full"
                    >
                      Próxima Etapa
                    </button>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div>
                    <label htmlFor="animal.name" className="block text-sm font-medium text-gray-700">
                      Nome do Animal
                    </label>
                    <input
                      id="animal.name"
                      {...register('animal.name')}
                      placeholder="Nome do animal"
                      className="border p-2 rounded w-full"
                    />
                    {errors.animal?.name?.message && <ErrorsMessage message={errors.animal.name.message} />}
                  </div>

                  <div>
                    <label htmlFor="animal.type" className="block text-sm font-medium text-gray-700">
                      Tipo de Animal
                    </label>
                    <input
                      id="animal.type"
                      {...register('animal.type')}
                      placeholder="Ex: Cachorro, Gato..."
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="animal.breed" className="block text-sm font-medium text-gray-700">
                      Raça
                    </label>
                    <input
                      id="animal.breed"
                      {...register('animal.breed')}
                      placeholder="Ex. Sem raça definida..."
                      className="border p-2 rounded w-full"
                    />
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
                    <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                      Data de desaparecimento
                    </label>
                    <input type="datetime-local"
                      id="data"
                      {...register('data')}
                      placeholder="Ex: 01/01/2024"
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="address.cep" className="block text-sm font-medium text-gray-700">
                      CEP aproximado do local de desaparecimento
                    </label>
                    <input
                      id="address.cep"
                      {...register('address.cep')}
                      placeholder="Ex: 12345678"
                      className="border p-2 rounded w-full"
                      onBlur={handleCepChange} // Consulta o CEP quando o campo perde o foco
                    />
                    {errors.address?.cep?.message && <ErrorsMessage message={errors.address.cep.message} />}
                  </div>

                  <div>
                    <label htmlFor="address.neighborhod" className="block text-sm font-medium text-gray-700">
                      Bairro
                    </label>
                    <input
                      id="address.neighborhod"
                      {...register('address.neighborhod')}
                      placeholder="Ex: Centro"
                      className="border p-2 rounded w-full"
                      disabled
                    />
                    {errors.address?.neighborhod?.message && <ErrorsMessage message={errors.address.neighborhod.message} />}
                  </div>

                  <div>
                    <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
                      Rua
                    </label>
                    <input
                      id="address.street"
                      {...register('address.street')}
                      placeholder="Ex: Rua das Flores"
                      className="border p-2 rounded w-full"
                      disabled
                    />
                    {errors.address?.street?.message && <ErrorsMessage message={errors.address.street.message} />}
                  </div>

                  <div>
                    <label htmlFor="address.number" className="block text-sm font-medium text-gray-700">
                      Número
                    </label>
                    <input
                      id="address.number"
                      {...register('address.number')}
                      placeholder="Ex: 123"
                      className="border p-2 rounded w-full"
                    />
                    {errors.address?.number?.message && <ErrorsMessage message={errors.address.number.message} />}
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="bg-gray-300 text-gray-700 p-2 rounded w-full"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="bg-purple-500 text-white p-2 rounded w-full"
                    >
                      Criar Anúncio
                    </button>
                  </div>
                </>
              )}

            </form>

            {showSuccessMessage && (
              <div className="bg-green-100 text-green-800 p-3 rounded mt-4">
                {showSuccessMessage}
              </div>
            )}
            {showErrorMessage && (
              <div className="bg-red-100 text-red-800 p-3 rounded mt-4">
                {showErrorMessage}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
