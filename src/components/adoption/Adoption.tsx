import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import ErrorsMessage from '../commons/FormErrorsMessage'; // Componente de mensagens de erro
import { adoptionSchema } from './schema'; // Validação com Zod
import type { AdoptionFormSchema } from './type';
import { useDropzone } from 'react-dropzone';
import { useCreateAdoptionAnnouncement } from '../../api/adoption/hooks'; // Hook que usa mutate para criar anúncio
import Header from '../home/header/Header';

const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return value;
};

export default function Adoption() {
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(
    null
  );
  const [showErrorMessage, setShowErrorMessage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const { mutateAsync: createAdoptionAnnouncement } =
    useCreateAdoptionAnnouncement(); // Aqui estamos usando mutate

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
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
      images: [],
    },
  });

  const sizesOptions = ['Selecione uma opção', 'Pequeno', 'Médio', 'Grande'];

  console.log('errors -> ', errors);

  const onSubmit: SubmitHandler<AdoptionFormSchema> = (data) => {
    // // Adicionando as imagens
    // data.images?.forEach((image: File) => {
    //   formData.append('images', image);
    // });

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
      },
      contactPhone: data.contact_phone,
      user: {
        id: 1,
      },
    };

    // Usar o mutate com formData
    createAdoptionAnnouncement(payload, {
      onSuccess: () => {
        setShowSuccessMessage('Anúncio criado com sucesso!');
        setShowErrorMessage(null);
      },
      onError: (error) => {
        setShowErrorMessage('Ocorreu um erro ao criar o anúncio: ' + error);
        setShowSuccessMessage(null);
      },
    });
  };

  const onDrop = (acceptedFiles: File[]) => {
    setValue('images', acceptedFiles);
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
              Cadastro de Animal para Adoção
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {currentStep === 1 && (
                <>
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Título do Anúncio
                    </label>
                    <input
                      id="title"
                      {...register('title')}
                      placeholder="Ex: Cachorro para adoção"
                      className="border p-2 rounded w-full"
                    />
                    {errors.title?.message && (
                      <ErrorsMessage message={errors.title.message} />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descrição
                    </label>
                    <textarea
                      id="description"
                      {...register('description')}
                      placeholder="Descrição geral da origem do animal, bairro encontrado, personalidade, etc..."
                      className="border p-2 rounded w-full"
                    />
                    {errors.description?.message && (
                      <ErrorsMessage message={errors.description.message} />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact_phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Telefone de Contato
                    </label>
                    <input
                      id="contact_phone"
                      {...register('contact_phone')}
                      placeholder="(xx) xxxx-xxxxx"
                      className="border p-2 rounded w-full"
                      onChange={handlePhoneChange}
                    />
                    {errors.contact_phone?.message && (
                      <ErrorsMessage message={errors.contact_phone.message} />
                    )}
                  </div>

                  <div
                    {...getRootProps()}
                    className="border-dashed border-2 p-4 text-center"
                  >
                    <input {...getInputProps()} />
                    <p>
                      Arraste ou clique para fazer upload de fotos do animal
                    </p>
                  </div>
                  {errors.images?.message && (
                    <ErrorsMessage message={errors.images.message} />
                  )}

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
                    <label
                      htmlFor="animal.name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nome do Animal
                    </label>
                    <input
                      id="animal.name"
                      {...register('animal.name')}
                      placeholder="Nome do animal"
                      className="border p-2 rounded w-full"
                    />
                    {errors.animal?.name?.message && (
                      <ErrorsMessage message={errors.animal.name.message} />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="animal.type"
                      className="block text-sm font-medium text-gray-700"
                    >
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
                    <label
                      htmlFor="animal.breed"
                      className="block text-sm font-medium text-gray-700"
                    >
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
                    <label
                      htmlFor="animal.size"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tamanho do Animal
                    </label>
                    <select
                      {...register('animal.size')}
                      className="border p-2 rounded w-full"
                    >
                      {sizesOptions.map((size, i) => (
                        <option value={i} defaultValue={0}>
                          {size}
                        </option>
                      ))}
                    </select>
                    {errors.animal?.size?.message && (
                      <ErrorsMessage message={errors.animal.size.message} />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="animal.weight"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Peso (kg)
                    </label>
                    <input
                      id="animal.weight"
                      {...register('animal.weight')}
                      placeholder="Peso do animal aprox."
                      className="border p-2 rounded w-full"
                      type="number"
                    />
                    {errors.animal?.weight?.message && (
                      <ErrorsMessage message={errors.animal.weight.message} />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="animal.age"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Idade
                    </label>
                    <input
                      id="animal.age"
                      {...register('animal.age')}
                      placeholder="Idade do animal aprox."
                      className="border p-2 rounded w-full"
                      type="number"
                    />
                    {errors.animal?.age?.message && (
                      <ErrorsMessage message={errors.animal.age.message} />
                    )}
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="bg-purple-500 text-white p-2 rounded"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      Enviar Anúncio
                    </button>
                  </div>
                </>
              )}

              {showSuccessMessage && (
                <p className="text-green-500 mt-4 text-center">
                  {showSuccessMessage}
                </p>
              )}
              {showErrorMessage && (
                <p className="text-red-500 mt-4 text-center">
                  {showErrorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
