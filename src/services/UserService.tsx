import axios from 'axios';
import { User } from '../models/User';

const API_URL = 'http://localhost:8080/user'; 

export const createUser = async (userData: User) => {
  try {
    const response = await axios.post(`${API_URL}/new-account`, userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const updateUser = async (userData: User) => {
  try {
    const response = await axios.put(`${API_URL}/update`, userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

export const getUserById = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};
