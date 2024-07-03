import { apiUri } from '@/config/config';
import { handleFetchError } from '@/helpers/errorHandler';
import { Cuota } from '@/types/payments';
import axios from 'axios';

export const handlePayCuota = async (id: Cuota['id']) => {
  try {
    const cuota = await axios.post(`${apiUri}/payments/cuotas/${id}/pay`);
    return cuota;
  } catch (error) {
    handleFetchError(error);
  }
};

export const handleCancelPayCuota = async (id: Cuota['id']) => {
  try {
    const cuota = await axios.delete(`${apiUri}/payments/cuotas/${id}/pay`);
    return cuota;
  } catch (error) {
    handleFetchError(error);
  }
};
