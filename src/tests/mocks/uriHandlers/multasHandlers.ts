import { apiUri } from '@/config/config';
import { Multa } from '@/types/payments';
import { HttpResponse, delay, http } from 'msw';

export const multasHandlers = [
  http.get(`${apiUri}/payments/multas`, async () => {
    await delay(500);
    return HttpResponse.json<Multa[]>(multas);
  })
];

export const multasEmpty = http.get(`${apiUri}/payments/multas`, () => {
  return HttpResponse.json([]);
});
export const multasError = http.get(`${apiUri}/payments/multas`, () => {
  return HttpResponse.error();
});

export const multas: Multa[] = [
  {
    id: 49,
    clubId: null,
    playerId: 9,
    type: 'derechoPartido',
    price: 20000,
    deadline: '2024-07-31T09:40:44.000Z',
    paid: false,
    paydate: null,
    Club: {
      name: 'test team',
      badge: null,
      id: 1,
      inscriptionPayment: false
    },
    Player: {
      id: 9,
      name: 'Juanito',
      teamId: 1,
      documentNumber: 7530435,
      promYear: 2020,
      phoneNumber: 987654321
    }
  },
  {
    id: 50,
    clubId: null,
    playerId: 7,
    type: 'multa',
    price: 20000,
    deadline: '2024-07-31T09:40:44.000Z',
    paid: false,
    paydate: null,
    Club: null,
    Player: null
  }
];
