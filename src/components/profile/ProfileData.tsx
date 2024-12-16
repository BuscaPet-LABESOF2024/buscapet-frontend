'use client';

import {
  IUserDataAddressUpdate,
  IUserDataProfileUpdate,
  useGetUserData,
  useUpdateAddressData,
  useUpdateUserData,
} from '@/api/user/hooks';
import { Pencil, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  cepSchema,
  formatCep,
  formatPhoneNumber,
  houseNumberSchema,
  nameUserSchema,
  phoneSchema,
} from './schema';
import { useSearchCep } from '@/api/search-address/hooks';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function ProfileData() {
  const token = localStorage.getItem('token')!;
  const { data, isLoading, isError, refetch } = useGetUserData(token);

  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [userData, setUserData] = useState<IUserDataProfileUpdate | null>(null);
  const [addressData, setAddressData] = useState<IUserDataAddressUpdate | null>(
    null
  );

  const [nameError, setNameError] = useState<string | null>(null);
  const [cepError, setCepError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [houseNumberError, setHouseNumberError] = useState<string | null>(null);

  const { searchCep } = useSearchCep();

  const validateName = (value: string) => {
    const result = nameUserSchema.safeParse(value);
    if (!result.success) {
      setNameError(result.error.errors[0].message);
    } else {
      setNameError(null);
    }
  };

  const validateCep = (value: string) => {
    const result = cepSchema.safeParse(value);
    if (!result.success) {
      setCepError(result.error.errors[0].message);
    } else {
      setCepError(null);
    }
  };

  const validatePhone = (value: string) => {
    const result = phoneSchema.safeParse(value);
    if (!result.success) {
      setPhoneError('O campo de telefone é obrigatório');
    } else {
      setPhoneError(null);
    }
  };

  const validateHouseNumber = (value: string) => {
    const result = houseNumberSchema.safeParse(value);
    if (!result.success) {
      setHouseNumberError('O campo de telefone é obrigatório');
    } else {
      setHouseNumberError(null);
    }
  };

  useEffect(() => {
    if (data) {
      setUserData({
        name: data.name,
        phone: data?.phone,
      });
      setAddressData({
        street: data.address?.street,
        number: data.address?.number,
        neighborhood: data.address?.neighborhood,
        cep: data.address?.cep,
        referencia: data.address?.referencia,
        complemento: data.address?.complemento,
      });
    }
  }, [data]);

  const updateUserMutation = useUpdateUserData(token, userData!);
  const updateAddressMutation = useUpdateAddressData(token, addressData!);

  const handleUserSubmit = async () => {
    await updateUserMutation.mutateAsync();
    setIsEditingUser(false);
    refetch();
  };

  const handleAddressSubmit = async () => {
    await updateAddressMutation.mutateAsync();
    setIsEditingAddress(false);
    refetch();
  };

  const handleSearchCep = async () => {
    if (!addressData?.cep) {
      setCepError('Digite um CEP.');
      return;
    }

    const formattedCep = addressData.cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (formattedCep.length !== 8) {
      setCepError('Digite um CEP válido com 8 números.');
      return;
    }

    try {
      const result = await searchCep(formattedCep);
      if (result) {
        setAddressData({
          ...addressData,
          street: result.logradouro,
          neighborhood: result.bairro,
        });
        setCepError(null);
      }
    } catch {
      setCepError('Erro ao buscar o CEP.');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao obter dados do usuário</div>;
  }

  const displayValue = (value: string | undefined) => {
    return value || 'Não informado';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex pt-[3.5rem]">
        <main className="flex-1 p-8">
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Informações Pessoais
                </h3>
                <button
                  onClick={() => setIsEditingUser(!isEditingUser)}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  {isEditingUser ? 'Cancelar' : 'Editar'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Nome</p>
                  {isEditingUser ? (
                    <div>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                        value={userData?.name}
                        onChange={(e) => {
                          const newName = e.target.value;
                          setUserData({ ...userData, name: newName });
                          validateName(newName);
                        }}
                      />
                      {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {displayValue(data?.name)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {displayValue(data?.email)}
                  </p>
                  {isEditingUser && (
                    <p className="mt-1 text-xs text-red-600">
                      Este campo não pode ser alterado.
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  {isEditingUser ? (
                    <div>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                        value={userData?.phone}
                        onChange={(e) => {
                          const newPhone = formatPhoneNumber(e.target.value);
                          setUserData({ ...userData, phone: newPhone });
                          validatePhone(newPhone);
                        }}
                      />
                      {phoneError && (
                        <p style={{ color: 'red' }}>{phoneError}</p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {displayValue(data?.phone)}
                    </p>
                  )}
                </div>
              </div>
              {isEditingUser && (
                <button
                  onClick={handleUserSubmit}
                  className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Salvar
                </button>
              )}
            </div>

            {/* Address Information */}
            <div className="rounded-lg border bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Endereço
                </h3>
                <button
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  {isEditingAddress ? 'Cancelar' : 'Editar'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Rua</p>
                  {isEditingAddress ? (
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                      value={addressData?.street}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          street: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {displayValue(data?.address?.street)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Número</p>
                  {isEditingAddress ? (
                    <div>
                      <input
                        type="text"
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                        value={addressData?.number}
                        onChange={(e) => {
                          const newNumber = e.target.value;
                          setAddressData({
                            ...addressData,
                            number: newNumber,
                          });
                          validateHouseNumber(newNumber);
                        }}
                      />
                      {houseNumberError && (
                        <p style={{ color: 'red' }}>{houseNumberError}</p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {displayValue(data?.address?.number)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bairro</p>
                  {isEditingAddress ? (
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                      value={addressData?.neighborhood}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          neighborhood: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {displayValue(data?.address?.neighborhood)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">CEP</p>
                  {isEditingAddress ? (
                    <div className="flex items-center gap-2">
                      <div className="flex-grow">
                        <Input
                          type="text"
                          className="mt-1 w-full"
                          value={addressData?.cep}
                          onChange={(e) => {
                            const newCep = formatCep(e.target.value);
                            setAddressData({ ...addressData, cep: newCep });
                            validateCep(newCep);
                          }}
                          placeholder="12345-678"
                        />
                        {cepError && (
                          <p className="mt-1 text-xs text-red-600">
                            {cepError}
                          </p>
                        )}
                      </div>
                      <Button
                        type="button"
                        onClick={handleSearchCep}
                        className="mt-1"
                        variant="outline"
                      >
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Buscar CEP</span>
                      </Button>
                    </div>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {displayValue(data?.address?.cep)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Referência</p>
                  {isEditingAddress ? (
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                      value={addressData?.referencia}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          referencia: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {displayValue(data?.address?.referencia)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Complemento</p>
                  {isEditingAddress ? (
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                      value={addressData?.complemento}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          complemento: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {displayValue(data?.address?.complemento)}
                    </p>
                  )}
                </div>
              </div>
              {isEditingAddress && (
                <button
                  onClick={handleAddressSubmit}
                  className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Salvar
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
