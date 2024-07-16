import { z } from 'zod';

export const defaultValues = {
  matchStartTime: '',
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

export const configFormSchema = z.object({
  matchStartTime: z.string().min(1, 'Escoja una hora de inicio'),
  matchDuration: z
    .string()
    .refine((value) => !isNaN(Number(value)), { message: 'Debe ser un número válido' })
    .transform((value) => Number(value))
    .refine((value) => value >= 5 && value <= 100, {
      message: 'Debe estar entre 5 y 100'
    }),
  matchInterval: z
    .string()
    .min(1, 'Campo requerido')
    .transform((val) => parseInt(val)),
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
