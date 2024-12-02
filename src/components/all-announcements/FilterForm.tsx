import {
  useGetAnnouncementTypes,
  useGetNeighborhoods,
  useGetBreeds,
} from '../../api/Filters/hooks';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { filterFormSchema } from './filterFormSchema';
import type { FilterFormSchemaType } from './types';

interface FilterFormProps {
  onSubmit: (data: FilterFormSchemaType) => void;
}

export default function FilterForm({ onSubmit }: FilterFormProps) {
  const { data: announcementTypes, isLoading: isLoadingAnnouncementTypes } = useGetAnnouncementTypes();
  const { data: neighborhoods, isLoading: isLoadingNeighborhoods } = useGetNeighborhoods();
  const { data: breeds, isLoading: isLoadingBreeds } = useGetBreeds();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FilterFormSchemaType>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      announcementType: '',
      neighborhood: '',
      animalBreed: '',
    },
  });

  if (isLoadingAnnouncementTypes || isLoadingNeighborhoods || isLoadingBreeds) {
    return <div>Carregando...</div>;
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Filtrar anúncios</h2>
        <div className="flex items-center gap-4">
          {/* Select Tipo do Anúncio */}
          <div>
            <Select
              onValueChange={(value) => setValue('announcementType', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo do anúncio" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {announcementTypes?.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.description}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.announcementType && (
              <span className="text-red-500 text-sm">
                {errors.announcementType.message}
              </span>
            )}
          </div>

          {/* Select Bairro */}
          <div>
            <Select
              onValueChange={(value) => setValue('neighborhood', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Bairro" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {neighborhoods?.map((neighborhood, index) => (
                    <SelectItem key={index} value={neighborhood}>
                      {neighborhood}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.neighborhood && (
              <span className="text-red-500 text-sm">
                {errors.neighborhood.message}
              </span>
            )}
          </div>

          {/* Select Raça */}
          <div>
            <Select
              onValueChange={(value) => setValue('animalBreed', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Raça" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {breeds?.map((breed, index) => (
                    <SelectItem key={index} value={breed}>
                      {breed}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.animalBreed && (
              <span className="text-red-500 text-sm">
                {errors.animalBreed.message}
              </span>
            )}
          </div>

          {/* Botão de Filtrar */}
          <Button type="submit">Filtrar</Button>
        </div>
      </form>
    </section>
  );
}
