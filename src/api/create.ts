import { handleFetchError } from '@/helpers/errorHandler';
import { Club } from '@/types/clubs';
import axios from 'axios';

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
