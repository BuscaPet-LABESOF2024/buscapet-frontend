import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import ErrorsMessage from '../commons/FormErrorsMessage'; // Componente de mensagens de erro
import { adoptionSchema } from './schema'; // Validação com Zod
import type { AdoptionFormSchema } from './type';
import { useDropzone } from 'react-dropzone';

// Função para formatar o telefone conforme "(xx) xxxx-xxxx"
const formatPhoneNumber = (value: string) => {
  // Remove tudo que não for número
  const cleaned = value.replace(/\D/g, '');
  // Aplica o formato (xx) xxxx-xxxx
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return value;
};

export default function Adoption() {
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  const [showErrorMessage, setShowErrorMessage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1); // Estado para controlar a parte do formulário

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
      animal: '',
      contact_phone: '',
      contact_email: '',
      images: [],
      status_animal: 'adoção',
      announcement_type: 'adoção',
      type: '',
      breed: '',
      size_animal: '',
      weight: '',
      age: '',
    },
  });

  const onSubmit: SubmitHandler<AdoptionFormSchema> = async (data) => {
    try {
      console.log(data);
      setShowSuccessMessage('Anúncio criado com sucesso!');
      setShowErrorMessage(null);
    } catch (error) {
      setShowErrorMessage('Ocorreu um erro ao criar o anúncio.' + error);
      setShowSuccessMessage(null);
    }
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
    setValue('contact_phone', formattedPhone); // Atualiza o valor no estado do formulário
  };

  return (
    <section id="adoption">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-xl bg-gray-100 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Animal para Adoção</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {currentStep === 1 && (
              <>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título do Anúncio</label>
                  <input
                    id="title"
                    {...register('title')}
                    placeholder="Ex: Cachorro para adoção"
                    className="border p-2 rounded w-full"
                  />
                  {errors.title?.message && <ErrorsMessage message={errors.title.message} />}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    id="description"
                    {...register('description')}
                    placeholder="Descrição geral da origem do animal, bairro encontrado, personalidade, etc... Detalhes específicos serão preenchidos na próxima etapa."
                    className="border p-2 rounded w-full"
                  />
                  {errors.description?.message && <ErrorsMessage message={errors.description.message} />}
                </div>

                <div>
                  <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">Telefone de Contato</label>
                  <input
                    id="contact_phone"
                    {...register('contact_phone')}
                    placeholder="(xx) xxxx-xxxx"
                    className="border p-2 rounded w-full"
                    onChange={handlePhoneChange} // Formata o telefone conforme a digitação
                  />
                  {errors.contact_phone?.message && <ErrorsMessage message={errors.contact_phone.message} />}
                </div>

                <div {...getRootProps()} className="border-dashed border-2 p-4 text-center">
                  <input {...getInputProps()} />
                  <p>Arraste ou clique para fazer upload de fotos do animal</p>
                </div>
                {errors.images?.message && <ErrorsMessage message={errors.images.message} />}

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
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Animal</label>
                  <input
                    id="type"
                    {...register('type')}
                    placeholder="Ex: Cachorro, Gato..."
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Raça</label>
                  <input
                    id="breed"
                    {...register('breed')}
                    placeholder="Ex. Sem raça definida..."
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label htmlFor="size_animal" className="block text-sm font-medium text-gray-700">Tamanho do Animal</label>
                  <input
                    id="size_animal"
                    {...register('size_animal')}
                    placeholder="Pequeno, Médio, Grande..."
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                  <input
                    id="weight"
                    {...register('weight')}
                    placeholder="Peso do animal aprox."
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">Idade</label>
                  <input
                    id="age"
                    {...register('age')}
                    placeholder="Idade do animal aprox."
                    className="border p-2 rounded w-full"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="bg-purple-500 text-white p-2 rounded w-full mr-2"
                  >
                    Voltar
                  </button>

                  <button
                    type="submit"
                    className="bg-purple-500 text-white p-2 rounded w-full ml-2"
                  >
                    Cadastrar
                  </button>
                </div>
              </>
            )}

            {showSuccessMessage && <p className="text-green-500 mt-4 text-center">{showSuccessMessage}</p>}
            {showErrorMessage && <p className="text-red-500 mt-4 text-center">{showErrorMessage}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
