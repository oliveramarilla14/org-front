import { HttpResponse, delay, http } from 'msw';
import { apiUri } from '@/config/config';
import { PlayerStatsWithData } from '@/types/players';

export const playersHandlers = [
  http.get(`${apiUri}/players/stats`, async () => {
    await delay(500);
    return HttpResponse.json<PlayerStatsWithData[]>(playerStats);
  })
];

export const playerStats = [
  {
    playerId: 1,
    goalscorer: 1,
    played: 5,
    win: 4,
    draw: 5,
    loose: 5,
    goals: 1,
    conceed: 6,
    yellows: 8,
    reds: 4,
    Player: {
      name: 'Test 1',
      Club: null
    }
  },
  {
    playerId: 7,
    goalscorer: 5,
    played: 4,
    win: 3,
    draw: 3,
    loose: 8,
    goals: 5,
    conceed: 4,
    yellows: 7,
    reds: 5,
    Player: {
      name: 'Test 2',
      Club: {
        name: 'test team',
        id: 1
      }
    }
  }
];
