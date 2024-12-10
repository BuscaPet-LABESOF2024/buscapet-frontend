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

export default function Adoption() {
  const navigate = useNavigate();
  const [imgSize, setImgSize] = useState<number>(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  const [showErrorMessage, setShowErrorMessage] = useState<string | null>(null);
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
        weight: '',
        age: '',
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
      <section id="adoption">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-xl bg-gray-100 p-8 rounded-lg shadow-lg mt-7">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Cadastro de Animal para Adoção
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
                      placeholder="(00) 00000-0000"
                      className="border p-2 rounded w-full"
                      value={watch('contact_phone') || ''} // Atualiza o valor conforme o estado
                      onChange={handlePhoneChange} // Formata a entrada ao digitar
                      maxLength={15} // Limita o número de caracteres no formato completo
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

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 p-2 rounded"
                    >
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isPending}
                    >
                      Criar Anúncio
                    </Button>
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
