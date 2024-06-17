import { HttpResponse, delay, http } from 'msw';
import { apiUri } from '@/config/config';
import { Club, TeamShow } from '@/types/clubs';

export const clubsHandlers = [
  http.get(`${apiUri}/clubs`, async () => {
    await delay(1000);
    return HttpResponse.json<Club[]>(clubs);
  }),
  http.get(`${apiUri}/clubs/2`, async () => {
    return HttpResponse.json<TeamShow>(club);
  })
];

export const ClubsError = http.get(`${apiUri}/clubs/2`, () => {
  return HttpResponse.error();
});

const clubs = [
  {
    id: 1,
    badge: null,
    name: 'Interpod',
    inscriptionPayment: false
  },
  {
    id: 2,
    badge: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/20232.png',
    name: 'Inter de Miami',
    inscriptionPayment: false
  }
];

const club: TeamShow = {
  id: 2,
  badge: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/20232.png',
  name: 'testing Club',
  inscriptionPayment: false,
  Stats: {
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
    reds: 1
  },
  players: [
    {
      id: 3,
      name: 'Juan Valdez',
      teamId: 2,
      documentNumber: 101139,
      promYear: 2019,
      phoneNumber: null,
      Stats: null,
      payments: []
    }
  ]
};
