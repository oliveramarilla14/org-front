import { CustomAxiosError } from '@/types/error';
import axios from 'axios';

export function handleFetchError(error: unknown): never {
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
