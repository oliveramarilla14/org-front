import { handleFetchError } from '@/helpers/errorHandler';
import { Club } from '@/types/clubs';
import { configFormSchema } from '@/types/config';
import axios from 'axios';
import { z } from 'zod';

export default async function createFetcher<FormType, Data>(url: string, { arg }: { arg: FormType }) {
  try {
    const { data } = await axios.post<Data>(url, arg);

    return data;
  } catch (error) {
    handleFetchError(error);
  }
}

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

export async function generateFixtureFetcher(url: string) {
  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    handleFetchError(error);
  }
}

export async function generateConfigFetcher(url: string, { arg }: { arg: z.infer<typeof configFormSchema> }) {
  try {
    const response = await axios.post(url, arg);
    return response.data;
  } catch (error) {
    handleFetchError(error);
  }
}
