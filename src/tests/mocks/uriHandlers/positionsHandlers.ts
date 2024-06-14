import { HttpResponse, delay, http } from 'msw';
import { apiUri } from '@/config/config';

export const positionsHandlers = [
  http.get(`${apiUri}/clubs/positions`, async () => {
    await delay(1000);
    return HttpResponse.json(teamsStats);
  })
];

export const PositionError = http.get(`${apiUri}/clubs/positions`, () => {
  return HttpResponse.error();
});

const teamsStats = [
  {
    clubId: 1,
    position: 1,
    points: 29,
    played: 38,
    win: 14,
    draw: 10,
    loose: 10,
    goals: 100,
    conceed: 50,
    yellows: 10,
    reds: 1,
    Club: {
      name: 'Interpod',
      badge: 'https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png'
    }
  },
  {
    clubId: 2,
    position: 2,
    points: 20,
    played: 36,
    win: 10,
    draw: 10,
    loose: 10,
    goals: 100,
    conceed: 50,
    yellows: 10,
    reds: 1,
    Club: {
      name: 'Perras',
      badge: null
    }
  }
];
