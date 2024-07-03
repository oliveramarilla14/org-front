import { handleFetchError } from '@/helpers/errorHandler';
import { Cuota } from '@/types/payments';
import axios from 'axios';

export const handlePayCuota = async (url: string, { arg }: { arg: Cuota['id'] }) => {
  try {
    const cuota = await axios.post(`${url}/${arg}/pay`);
    return cuota;
  } catch (error) {
    handleFetchError(error);
  }
};

export const handleCancelPayCuota = async (url: string, { arg }: { arg: Cuota['id'] }) => {
  try {
    const cuota = await axios.delete(`${url}/${arg}/pay`);
    return cuota;
  } catch (error) {
    handleFetchError(error);
  }
};
