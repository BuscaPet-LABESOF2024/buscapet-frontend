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
import {
  animalSizes,
  announcementTypes,
  filterFormSchema,
} from './filterFormSchema';
import type { FilterFormSchemaType } from './types';

interface FilterFormProps {
  onSubmit: (data: FilterFormSchemaType) => void;
}

export default function FilterForm({ onSubmit }: FilterFormProps) {
  const {
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FilterFormSchemaType>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      announcementType: '',
      animalSize: '',
    },
  });

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Filtrar anúncios</h2>
        <div className="flex items-center gap-4">
          <div>
            <Select
              onValueChange={(value) => setValue('announcementType', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo do anúncio" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {announcementTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.descricao}
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

          <div>
            <Select onValueChange={(value) => setValue('animalSize', value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tamanho do animal" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {animalSizes.map((animalSize) => (
                    <SelectItem key={animalSize.id} value={animalSize.id.toString()}>
                      {animalSize.descricao}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.animalSize && (
              <span className="text-red-500 text-sm">
                {errors.animalSize.message}
              </span>
            )}
          </div>

          <Button type="submit">Filtrar</Button>
        </div>
      </form>
    </section>
  );
}
