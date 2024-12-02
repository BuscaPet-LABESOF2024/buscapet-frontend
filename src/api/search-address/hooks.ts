import { useState } from 'react';
import axios from 'axios';

export const useSearchCep = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCep = async (cep: string) => {
    if (!cep) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data && response.data.erro) {
        setError('CEP não encontrado');
      } else {
        return response.data;
      }
    } catch (err) {
      setError('Erro ao buscar o CEP');
    } finally {
      setLoading(false);
    }
  };

  return { searchCep, loading, error };
};
