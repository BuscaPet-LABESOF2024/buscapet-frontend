import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ErrorsMessage from '../commons/FormErrorsMessage';
import { missingAnimalSchema, type MissingAnimalFormSchema } from './schema'; // Verifique se está correto

export default function MissingAnimal() {
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  const [showErrorMessage, setShowErrorMessage] = useState<string | null>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<MissingAnimalFormSchema>({
    resolver: zodResolver(missingAnimalSchema),
    defaultValues: {
      title: '',
      description: '',
      animal: '',
      contact_phone: '',
      contact_email: '',
      images: [],
      missing_date: '',
    },
  });

  const onSubmit: SubmitHandler<MissingAnimalFormSchema> = async (data) => {
    try {
      console.log(data);
      setShowSuccessMessage('Anúncio de animal desaparecido criado com sucesso!');
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

  return (
    <section id="missing-animal">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-xl bg-gray-100 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Animal Desaparecido</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título do Anúncio
              </label>
              <input
                id="title"
                {...register('title')}
                placeholder="Ex: Cachorro desaparecido no bairro central"
                className="border p-2 rounded w-full"
              />
              {errors.title?.message && <ErrorsMessage message={errors.title.message} />}
            </div>

            <div>
              <label htmlFor="missing_date" className="block text-sm font-medium text-gray-700">
                Data do Desaparecimento
              </label>
              <input
                id="missing_date"
                type="date"
                {...register('missing_date')}
                className="border p-2 rounded w-full"
              />
              {errors.missing_date?.message && <ErrorsMessage message={errors.missing_date.message} />}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="description"
                {...register('description')}
                placeholder="Descreva o animal, sua aparência, local e outras informações relevantes"
                className="border p-2 rounded w-full"
              />
              {errors.description?.message && <ErrorsMessage message={errors.description.message} />}
            </div>

            <div {...getRootProps()} className="border p-4 rounded w-full cursor-pointer text-center">
              <input {...getInputProps()} />
              <p>Arraste e solte imagens aqui, ou clique para selecionar arquivos</p>
            </div>
            {errors.images?.message && <ErrorsMessage message={errors.images.message} />}

            <div className="text-center">
              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md">
                Cadastrar
              </button>
            </div>
          </form>

          {showSuccessMessage && (
            <p className="text-green-600 text-center mt-4">{showSuccessMessage}</p>
          )}
          {showErrorMessage && (
            <p className="text-red-600 text-center mt-4">{showErrorMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
}
