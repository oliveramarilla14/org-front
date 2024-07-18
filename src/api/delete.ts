import { handleFetchError } from '@/helpers/errorHandler';
import axios from 'axios';

export default async function deleteFetcher(url: string) {
  try {
    const { data } = await axios.delete(url);

    return data;
  } catch (error) {
    handleFetchError(error);
  }
}

export async function deleteByIdFetcher(url: string, { arg }: { arg: number }) {
  try {
    const { data } = await axios.delete(`${url}/${arg}`);

    return data;
  } catch (error) {
    handleFetchError(error);
  }
}
