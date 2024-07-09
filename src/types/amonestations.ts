import { z } from 'zod';
import { Club } from './clubs';
import { Player } from './players';

export interface Amonestation {
  id: number;
  playerId?: number | null;
  clubId: number;
  matchId: number | null;
  paymentId: number | null;
  type: string;
  observation: string | null;
  pointsDeducted: number | null;
  matchesToPay: number | null;
  matchesPaid: number | null;
  createdAt: Date;
  Club: Club;
  Player: Player | null;
}

export type AmonestationForm = {
  clubId: string;
  playerId: string;
  matchId?: string;
  paymentId?: string;
  type: string;
  observation?: string;
  pointsDeducted?: string;
  matchesToPay?: string;
  sanction: string;
};

export const amonestationFormSchema = z.object({
  clubId: z
    .string()
    .min(1, 'Escoja un equipo')
    .transform((val) => parseInt(val)),
  playerId: z
    .string()
    .min(1, 'Elija una opción')
    .transform((val) => parseInt(val)),
  type: z.string({ message: 'Seleccione el motivo' }).min(1, 'Seleccione el motivo'),
  sanction: z.string({ message: 'Seleccione un tipo de sanción' }).min(1, 'Seleccione un tipo de sanción'),
  pointsDeducted: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim() === '' || (!isNaN(parseInt(val)) && parseInt(val) > 0), {
      message: 'Debe ser un número natural mayor a 0'
    })
    .transform((val) => (val !== undefined && val.trim() !== '' ? parseInt(val) : undefined)),
  matchesToPay: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim() === '' || (!isNaN(parseInt(val)) && parseInt(val) > 0), {
      message: 'Debe ser un número natural mayor a 0'
    })
    .transform((val) => (val !== undefined && val.trim() !== '' ? parseInt(val) : undefined)),

  observation: z.string().optional()
});
