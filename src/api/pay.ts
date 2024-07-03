import { handleFetchError } from '@/helpers/errorHandler';
import { Cuota } from '@/types/payments';
import axios from 'axios';

export async function payCuotaFetcher(url: string, { arg }: { arg: number }) {
  try {
    console.log(`${url}/${arg}/pay`);
    const { data } = await axios.post<Cuota>(`${url}/${arg}/pay`);

    return data;
  } catch (error) {
    handleFetchError(error);
  }
}
