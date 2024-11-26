import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ErrorsMessage from '../commons/FormErrorsMessage';
import { LostAnimalSchema, type LostAnimalFormSchema } from './schema'; // Verifique se está correto
import Header from '../home/header/Header';
import { useCreateLostAnnouncementPayload } from '@/api/announcement/hooks';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  const [showErrorMessage, setShowErrorMessage] = useState<string | null>(null);

  const { mutateAsync: createLostAnnouncement } = useCreateLostAnnouncementPayload();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<LostAnimalFormSchema>({
    resolver: zodResolver(LostAnimalSchema),
    defaultValues: {
      title: '',
      description: '',
      data: '',
      endereco: {
        number: '',
        neighborhood: '',
        cep: '',
        street: '',
        referencia: '',
        complemento: '',
      },
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

  const onSubmit: SubmitHandler<LostAnimalFormSchema> = async (data) => {
    const payload = {
      title: data.title,
      description: data.description,
      date: data.data,
      endereco: {
        number: data.endereco.number,
        neighborhood: data.endereco.neighborhood,
        cep: data.endereco.cep,
        street: data.endereco.street,
        referencia: data.endereco.referencia,
        complemento: data.endereco.complemento,
      },
      animal: {
        name: data.animal.name,
        type: data.animal.type,
        breed: data.animal.breed,
        size: Number(data.animal.size),
        weight: Number(data.animal.weight),
        age: Number(data.animal.age),
      },
      contactPhone: data.contact_phone,
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
     // await createLostAnnouncement(payload);
    
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
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setValue('imageAnnouncement.image', (reader.result as string).substring(23));
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
    const formattedPhone = formatPhoneNumber(event.target.value);
    setValue('contact_phone', formattedPhone);
  };

  return (
    <>
      <Header />
      <section id="missing-animal">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-xl bg-gray-100 p-8 rounded-lg shadow-lg mt-7">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Cadastro de Animal Perdido
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
                      placeholder="Ex: Cachorro perdido"
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
                      placeholder="Ex: Última vez visto na Rua XYZ, bairro ABC"
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
                      onChange={handlePhoneChange}
                    />
                    {errors.contact_phone?.message && <ErrorsMessage message={errors.contact_phone.message} />}
                  </div>

                  <div {...getRootProps()} className="border-dashed border-2 p-4 text-center">
                    <input {...getInputProps()} />
                    <p>Arraste ou clique para fazer upload de fotos do animal</p>
                  </div>
                  {selectedFileName && <p className="mt-2 text-gray-400 text-center">{selectedFileName}</p>}
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
                  {/* Reutilização dos campos de animal do formulário anterior */}
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

                  {/* Outras informações de animal e endereço */}
                  <div>
                    <label htmlFor="endereco.street" className="block text-sm font-medium text-gray-700">
                      Rua
                    </label>
                    <input
                      id="endereco.street"
                      {...register('endereco.street')}
                      placeholder="Nome da rua"
                      className="border p-2 rounded w-full"
                    />
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
