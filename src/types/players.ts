import { z } from 'zod';
import { Payment } from './payments';
import { Club } from './clubs';

export interface Player {
  id: number;
  name: string;
  teamId?: number | null;
  documentNumber: number;
  promYear: number;
  phoneNumber: number | null;
}

export interface PlayerWithoutId extends Omit<Player, 'id'> {}

export interface PlayerStats {
  playerId: number;
  goalscorer?: number;
  played: number;
  win: number;
  draw: number;
  loose: number;
  goals: number;
  conceed: number;
  yellows: number;
  reds: number;
}

export interface PlayerStatsWithData extends PlayerStats {
  Player: {
    name: Player['name'];
    Club: {
      name: Club['name'];
      id: Club['id'];
    } | null;
  };
}

export interface PlayerStatsPayments extends Player {
  payments: Payment[];
  Stats: PlayerStats | null;
}

export const playerFormSchema = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres').max(100, 'Máximo de 100 caracteres'),
  teamId: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Ingrese un equipo valido'
  }),
  documentNumber: z
    .string()
    .min(5, 'Ingrese mínimo 5 números')
    .max(8, 'Máximo de 8 caracteres')
    .refine((val) => !isNaN(Number(val)), {
      message: 'Debe ser un número'
    }),
  promYear: z
    .string()
    .length(4, 'Ingrese un año valido')
    .refine((val) => !isNaN(Number(val)), {
      message: 'Debe ser un número'
    }),
  phoneNumber: z
    .string()
    .length(10, 'El teléfono debe tener 10 números')
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: 'Debe ser un número'
    })
});
