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

export interface FilterFormData {
  announcementType: string;
  neighborhood: string;
  animalBreed: string;
}

interface FilterFormProps {
  onSubmit: (data: FilterFormSchemaType) => void;
}

export default function FilterForm({ onSubmit }: FilterFormProps) {
  const { data: announcementTypes } = useGetAnnouncementTypes();
  const { data: neighborhoods } = useGetNeighborhoods();
  const { data: breeds } = useGetBreeds();

  const {
    formState: { errors },
    handleSubmit,
  } = useForm<FilterFormSchemaType>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      announcementType: undefined,
      neighborhood: '',
      animalBreed: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold">Filtrar anúncios</h2>
      <div className="flex items-center gap-4">
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o tipo do anúncio" />
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
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o bairro" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {neighborhoods?.map((neighborhood) => (
                  <SelectItem key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione a raça" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {breeds?.map((breed) => (
                  <SelectItem key={breed} value={breed}>
                    {breed}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Filtrar</Button>
      </div>
    </form>
  );
}
