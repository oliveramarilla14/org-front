import { useEffect, useState } from 'react';

export default function Test() {
  const [poke, setPoke] = useState({ name: 'hola' });

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((res) => res.json())
      .then((res) => setPoke(res));
  }, []);

  return (
    <>
      <div data-testid='main'>
        {poke.name}
        <h1>test</h1>
      </div>
    </>
  );
}
