import { z } from 'zod';
import { Club } from './clubs';
import { Player } from './players';

export interface Payment {
  id: number;
  clubId: number | null;
  playerId: number | null;
  type: string;
  price: number;
  deadline: string;
  paid: boolean;
  paydate: string | null;
  observation?: string | null;
}

export interface Cuota extends Payment {
  Club?: Club | null;
  Player?: Player | null;
}

export interface Multa extends Payment {
  Club?: Club | null;
  Player?: Player | null;
}

export const multaFormSchema = z.object({
  clubId: z
    .string()
    .min(1, 'Escoja un equipo')
    .transform((val) => parseInt(val)),
  playerId: z
    .string()
    .min(1, 'Elija una opción')
    .transform((val) => parseInt(val)),
  // .transform((val) => (val !== 'all' ? parseInt(val) : undefined)),
  type: z.string().min(1, 'Seleccione el motivo'),
  price: z
    .string()
    .min(1, 'Debe asignarse un precio')
    .transform((val) => parseInt(val)),
  deadline: z.date(),
  observation: z.string().optional()
});

export type MultaForm = {
  clubId: string;
  playerId: string;
  type: string;
  price: string;
  deadline?: Date;
  observation?: string;
};
