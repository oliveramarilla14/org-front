import { z } from 'zod';
import { PlayerStatsPayments } from './players';

export interface Club {
  name: string;
  badge: null | string;
  id: number;
  inscriptionPayment: boolean;
}

export interface ClubStats {
  clubId: number;
  position: number | null;
  points: number;
  played: number;
  win: number;
  draw: number;
  loose: number;
  goals: number;
  conceed: number;
  yellows: number;
  reds: number;
}

export interface TeamStats extends ClubStats {
  Club: Pick<Club, 'name' | 'badge'>;
}

export interface TeamShow extends Club {
  players: PlayerStatsPayments[];
  Stats: ClubStats | null;
}

export const clubFormSchema = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(100, 'Máximo de 100 caracteres'),
  badge: z.instanceof(FileList).optional(),
  payment: z.boolean()
});
