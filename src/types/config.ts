import { z } from 'zod';

export const defaultValues = {
  matchStartTime: '16:00',
  matchDuration: '',
  matchInterval: '',
  matchPrice: '',
  yellowCardPrice: '',
  yellowCardMatches: '',
  yellowAmountToMatch: '',
  redCardMatches: '',
  woAmonestation: false,
  woPrice: '0',
  inscriptionPrice: '',
  monthSocialPrice: '',
  monthSocialPayDay: '',
  redCardPrice: ''
};

export interface configType {
  matchStartTime: string; // Horario de inicio del partido, es un string
  matchDuration: number; // Duración del partido, se espera un número
  matchInterval: string; // Intervalo del partido, se espera un número
  matchPrice: number; // Precio del partido, se espera un número
  yellowCardPrice: number; // Precio de la tarjeta amarilla, se espera un número
  yellowCardMatches: number; // Partidos con tarjeta amarilla, se espera un número
  yellowAmountToMatch: number; // Cantidad amarilla por partido, se espera un número
  redCardMatches: number; // Partidos con tarjeta roja, se espera un número
  woAmonestation: boolean; // Si hay advertencia sin amonestación, es un booleano
  woPrice: number; // Precio sin amonestación, se espera un número
  inscriptionPrice: number; // Precio de inscripción, se espera un número
  monthSocialPrice: number; // Precio mensual social, se espera un número
  monthSocialPayDay: number; // Día de pago mensual social, se espera un número
  redCardPrice: number; // Precio de
}

export const configFormSchema = z.object({
  matchStartTime: z.string().min(1, 'Escoja una hora de inicio'),
  matchDuration: z
    .string()
    .refine((value) => !isNaN(Number(value)), { message: 'Debe ser un número válido' })
    .transform((value) => Number(value))
    .refine((value) => value >= 5 && value <= 100, {
      message: 'Debe estar entre 5 y 100'
    }),
  matchInterval: z.string().min(1, 'Campo requerido'),
  matchPrice: z
    .string()
    .min(1, 'Campo requerido')
    .refine((value) => !isNaN(parseInt(value)), { message: 'Debe ser un número válido' })
    .transform((value) => parseInt(value))
    .refine((value) => value > 0 && Number.isInteger(value), {
      message: 'Debe ser un número natural mayor a 0'
    }),
  yellowCardPrice: z
    .string()
    .min(1, 'Campo requerido')
    .refine((value) => !isNaN(parseInt(value)), { message: 'Debe ser un número válido' })
    .transform((value) => parseInt(value))
    .refine((value) => value > 0 && Number.isInteger(value), {
      message: 'Debe ser un número natural mayor a 0'
    }),
  yellowCardMatches: z
    .string()
    .min(1, 'Campo requerido')
    .refine((value) => !isNaN(parseInt(value)), { message: 'Debe ser un número válido' })
    .transform((value) => parseInt(value))
    .refine((value) => value > 0 && Number.isInteger(value), {
      message: 'Debe ser un número natural mayor a 0'
    }),
  yellowAmountToMatch: z
    .string()
    .min(1, 'Campo requerido')
    .refine((value) => !isNaN(parseInt(value)), { message: 'Debe ser un número válido' })
    .transform((value) => parseInt(value))
    .refine((value) => value > 0 && Number.isInteger(value), {
      message: 'Debe ser un número natural mayor a 0'
    }),
  redCardMatches: z
    .string()
    .min(1, 'Campo requerido')
    .refine((value) => !isNaN(parseInt(value)), { message: 'Debe ser un número válido' })
    .transform((value) => parseInt(value))
    .refine((value) => value > 0 && Number.isInteger(value), {
      message: 'Debe ser un número natural mayor a 0'
    }),
  redCardPrice: z
    .string()
    .min(1, 'Campo requerido')
    .refine((value) => !isNaN(parseInt(value)), { message: 'Debe ser un número válido' })
    .transform((value) => parseInt(value))
    .refine((value) => value > 0 && Number.isInteger(value), {
      message: 'Debe ser un número natural mayor a 0'
    }),
  woAmonestation: z.boolean(),
  woPrice: z
    .string()
    .min(1, 'Campo requerido')
    .refine((value) => !isNaN(parseInt(value)), { message: 'Debe ser un número válido' })
    .transform((value) => parseInt(value))
    .refine((value) => value >= 0 && Number.isInteger(value), {
      message: 'Debe ser un número natural'
    }),
  inscriptionPrice: z
    .string()
    .min(1, 'Campo requerido')
    .refine((value) => !isNaN(parseInt(value)), { message: 'Debe ser un número válido' })
    .transform((value) => parseInt(value))
    .refine((value) => value > 0 && Number.isInteger(value), {
      message: 'Debe ser un número natural mayor a 0'
    }),
  monthSocialPrice: z
    .string()
    .min(1, 'Campo requerido')
    .refine((value) => !isNaN(parseInt(value)), { message: 'Debe ser un número válido' })
    .transform((value) => parseInt(value))
    .refine((value) => value > 0 && Number.isInteger(value), {
      message: 'Debe ser un número natural mayor a 0'
    }),
  monthSocialPayDay: z
    .string()
    .refine((value) => !isNaN(Number(value)), { message: 'Debe ser un número válido' })
    .transform((value) => Number(value))
    .refine((value) => value >= 1 && value <= 30, {
      message: 'Debe estar entre 1 y 30'
    })
});
