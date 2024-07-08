import { handleFetchError } from '@/helpers/errorHandler';
import { Club } from '@/types/clubs';
import { Multa, MultaForm } from '@/types/payments';
import axios, { AxiosResponse } from 'axios';

export async function editClubFetcher(url: string, { arg }: { arg: FormData }) {
  try {
    const { data } = await axios.put<Club>(url, arg, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  } catch (error) {
    handleFetchError(error);
  }
}

export async function editMultasFetcher(url: string, { arg }: { arg: MultaForm }) {
  try {
    const response: AxiosResponse<Multa> = await axios.put<Multa>(url, arg);
    return response.data;
  } catch (error) {
    handleFetchError(error);
  }
}
