import { useQuery } from '@tanstack/react-query';
import { UserApi } from '.';

export function useGetUser(payload: IGetUser) {
  return useQuery({
    queryKey: ['user', payload.userId],
    queryFn: () => UserApi.getUser(payload),
  });
}

export interface IGetUser {
  userId: number;
}
