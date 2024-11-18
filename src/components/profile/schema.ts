import { z } from 'zod';

export const cepSchema = z
  .string()
  .length(8, { message: 'O CEP deve ter exatamente 8 dígitos.' })
  .regex(/^[0-9]+$/, { message: 'O CEP deve conter apenas números.' });

export const phoneSchema = z
  .string()
  .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
    message: 'O telefone deve estar no formato (XX) XXXXX-XXXX.',
  })
  .min(10, { message: 'O telefone deve ter no mínimo 11 dígitos.' });

export const houseNumberSchema = z
  .string()
  .regex(/^\d+$/, { message: 'O número da casa deve conter apenas números.' })
  .min(1, { message: 'O número da casa é obrigatório!' });

export const nameUserSchema = z
  .string({
    required_error: 'O campo nome é obrigatório!',
  })
  .min(3, { message: 'O nome deve ter no mínimo 3 caracteres!' });

export const formatPhoneNumber = (value: string) => {
  // Remove todos os caracteres que não sejam números
  const cleaned = value.replace(/\D/g, '');

  // Aplica a formatação: (XX) XXXXX-XXXX
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return cleaned; // Retorna o valor original se não corresponder ao padrão de 11 dígitos
};

export const formatCep = (value: string) => {
  // Remove todos os caracteres que não são números
  const cleaned = value.replace(/\D/g, '');

  // Aplica a formatação: 99999-999
  const match = cleaned.match(/^(\d{5})(\d{3})$/);

  if (match) {
    return `${match[1]}-${match[2]}`;
  }

  return cleaned; // Retorna o valor original se não corresponder ao padrão de 8 dígitos
};
