import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/ditto', () => {
    return HttpResponse.json({ name: 'oliver' });
  })
];
