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
  password: string;
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (payload: ICreateNewUser) => UserApi.createNewUser(payload),
  });
}

export interface IUserDataProfile {
  name: string;
  email: string;
  phone?: string;
  address: {
    street?: string;
    number?: string;
    neighborhood?: string;
    cep?: string;
    referencia?: string;
    complemento?: string;
  };
}

export function useGetUserData(token: string) {
  return useQuery({
    queryKey: ['userData', token],
    queryFn: () => UserApi.getUserData(token),
    enabled: !!token, // Só executa a query se o token estiver presente
    retry: false, // Desabilita tentativas automáticas para erros de autenticação
  });
}

export interface IUserDataProfileUpdate {
  name?: string;
  phone?: string;
}

export function useUpdateUserData(
  token: string,
  payload: IUserDataProfileUpdate
) {
  return useMutation({
    mutationFn: () => UserApi.updateUserData(token, payload),
  });
}

export interface IUserDataAddressUpdate {
  street?: string;
  number?: string;
  neighborhood?: string;
  cep?: string;
  referencia?: string;
  complemento?: string;
}

export function useUpdateAddressData(
  token: string,
  payload: IUserDataAddressUpdate
) {
  return useMutation({
    mutationFn: () => UserApi.updateAddressData(token, payload),
  });
}
