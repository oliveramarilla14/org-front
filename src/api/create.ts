import { handleFetchError } from '@/helpers/errorHandler';
import { Amonestation, AmonestationForm } from '@/types/amonestations';
import { Club } from '@/types/clubs';
import { MatchData, PlayersOnMatch } from '@/types/matches';
import { Multa, MultaForm } from '@/types/payments';
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

export async function createMultasFetcher(url: string, { arg }: { arg: MultaForm }) {
  try {
    const response: AxiosResponse<Multa> = await axios.post<Multa>(url, arg);
    return response.data;
  } catch (error) {
    handleFetchError(error);
  }
}

export async function createAmonestationFetcher(url: string, { arg }: { arg: Omit<AmonestationForm, 'sanction'> }) {
  try {
    const response: AxiosResponse<Amonestation> = await axios.post<Amonestation>(url, arg);
    return response.data;
  } catch (error) {
    handleFetchError(error);
  }
}
export async function createPlayerMatchFetcher(url: string, { arg }: { arg: MatchData }) {
  try {
    const response: AxiosResponse<PlayersOnMatch> = await axios.post<PlayersOnMatch>(url, arg);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    handleFetchError(error);
  }
}
