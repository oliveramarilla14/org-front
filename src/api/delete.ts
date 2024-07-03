import { handleFetchError } from '@/helpers/errorHandler';
import { Club } from '@/types/clubs';
import { Payment } from '@/types/payments';
import { Player } from '@/types/players';
import axios from 'axios';

export async function deleteClubFetcher(url: string) {
  try {
    const { data } = await axios.delete<Club>(url);

    return data;
  } catch (error) {
    handleFetchError(error);
  }
}

export async function deletePlayerFetcher(url: string, { arg }: { arg: number }) {
  try {
    const { data } = await axios.delete<Player>(`${url}/${arg}`);

    return data;
  } catch (error) {
    handleFetchError(error);
  }
}

export async function deleteCuotaFetcher(url: string, { arg }: { arg: number }) {
  try {
    const { data } = await axios.delete<Payment>(`${url}/${arg}`);

    return data;
  } catch (error) {
    handleFetchError(error);
  }
}
