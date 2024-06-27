import { handleFetchError } from '@/helpers/errorHandler';
import { Club } from '@/types/clubs';
import { Player, PlayerWithoutId } from '@/types/players';
import axios, { AxiosResponse } from 'axios';

export async function createClubFetcher(url: string, { arg }: { arg: FormData }) {
  try {
    const { data } = await axios.post<Club>(url, arg, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  } catch (error) {
    handleFetchError(error);
  }
}

export async function createPlayersFetcher(url: string, { arg }: { arg: PlayerWithoutId[] }) {
  try {
    const response: AxiosResponse<Player[]> = await axios.post<Player[]>(url, arg);
    return response.data;
  } catch (error) {
    handleFetchError(error);
  }
}
