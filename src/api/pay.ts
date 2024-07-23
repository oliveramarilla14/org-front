import { handleFetchError } from '@/helpers/errorHandler';
import { Amonestation } from '@/types/amonestations';
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

export const handleCancelPayAmonestation = async (url: string, { arg }: { arg: Amonestation['id'] }) => {
  try {
    const amonestation = await axios.delete(`${url}/pay/${arg}`);
    return amonestation;
  } catch (error) {
    handleFetchError(error);
  }
};

export const handlePayAmonestation = async (url: string, { arg }: { arg: Amonestation['id'] }) => {
  try {
    const amonestation = await axios.post(`${url}/pay/${arg}`);
    return amonestation;
  } catch (error) {
    handleFetchError(error);
  }
};
