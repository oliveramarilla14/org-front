import { apiUri } from '@/config/config';
import { Cuota } from '@/types/payments';
import { HttpResponse, delay, http } from 'msw';

export const cuotasHandlers = [
  http.get(`${apiUri}/payments/cuotas`, async () => {
    await delay(500);
    return HttpResponse.json<Cuota[]>(cuotas);
  }),
  http.get(`${apiUri}/clubs/2`, async () => {
    return HttpResponse.json<Cuota>(cuotas[0]);
  }),
  http.post(`${apiUri}/clubs`, async () => {
    return HttpResponse.json<Cuota>(cuotas[0]);
  })
];

export const cuotasEmpty = http.get(`${apiUri}/payments/cuotas`, () => {
  return HttpResponse.json([]);
});
export const cuotasError = http.get(`${apiUri}/payments/cuotas`, () => {
  return HttpResponse.error();
});
export const cuotas: Cuota[] = [
  {
    id: 23,
    clubId: null,
    playerId: null,
    type: 'cuota',
    price: 20000,
    deadline: '2024-07-31T09:40:44.000Z',
    paid: true,
    paydate: '2024-07-04T19:54:14.074Z',
    Club: null,
    Player: null
  },
  {
    id: 34,
    clubId: 1,
    playerId: 9,
    type: 'cuota',
    price: 20000,
    deadline: '2024-07-31T09:40:44.000Z',
    paid: true,
    paydate: '2024-07-04T18:10:27.930Z',
    Club: {
      id: 1,
      badge: 'badge-1719489255194-797682721.jpg',
      name: 'test club',
      inscriptionPayment: false
    },
    Player: {
      id: 1,
      name: 'test player',
      teamId: null,
      documentNumber: 7530435,
      promYear: 2020,
      phoneNumber: 987654321
    }
  },
  {
    id: 35,
    clubId: 1,
    playerId: 9,
    type: 'cuota',
    price: 20000,
    deadline: '2024-07-31T09:40:44.000Z',
    paid: true,
    paydate: '2024-07-04T12:17:45.634Z',
    Club: {
      id: 1,
      badge: 'badge-1719489255194-797682721.jpg',
      name: 'test club beta',
      inscriptionPayment: false
    },
    Player: {
      id: 9,
      name: 'test player beta',
      teamId: null,
      documentNumber: 7530435,
      promYear: 2020,
      phoneNumber: 987654321
    }
  }
];
