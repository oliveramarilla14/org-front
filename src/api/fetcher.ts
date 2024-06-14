import { CustomAxiosError } from '@/types/error';
import axios from 'axios';

export const fetcher2 = async <T>(url: string): Promise<T> => {
  const { data } = await axios.get<T>(url);
  return data;
};

export const fetcher = async (url: string) => {
  try {
    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const customError: CustomAxiosError = {
        statusCode: error.response?.status || 500,
        message: error.response?.data.message || 'Error Indefinido',
        _axiosData: {
          code: error.code,
          message: error.message,
          name: error.name
        }
      };
      throw customError;
    }
    if (error instanceof Error) {
      throw new Error(`Error de ejecución: ${error.message}`);
    } else {
      throw new Error('Error Inesperado');
    }
  }
};
