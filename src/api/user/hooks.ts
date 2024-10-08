import { useMutation, useQuery } from '@tanstack/react-query';
import { UserApi } from '.';

export interface IGetUser {
  userId: number;
}

export function useGetUser(payload: IGetUser) {
  return useQuery({
    queryKey: ['user', payload.userId],
    queryFn: () => UserApi.getUser(payload),
  });
}

export interface ICreateNewUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export function useCreateUser(payload: ICreateNewUser) {
  return useMutation({
    mutationFn: () => UserApi.createNewUser(payload)
  });
}
