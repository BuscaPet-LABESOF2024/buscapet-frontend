import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FilterApi } from './index';

interface AnnouncementType {
    id: number;
    description: string;
  }
  
  export const useGetAnnouncementTypes = (): UseQueryResult<AnnouncementType[], Error> =>
    useQuery({
      queryKey: ['announcementTypes'],
      queryFn: FilterApi.fetchAnnouncementTypes
    });
  
  export const useGetNeighborhoods = (): UseQueryResult<string[], Error> =>
    useQuery({
      queryKey: ['neighborhoods'],
      queryFn: FilterApi.fetchNeighborhoods
    });
  
  export const useGetBreeds = (): UseQueryResult<string[], Error> =>
    useQuery({
      queryKey: ['breeds'],
      queryFn: FilterApi.fetchBreeds
    });