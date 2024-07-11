import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Player } from '@/types/players';
import { useState } from 'react';
import TableRowPlayer from './TableRowPlayer';

interface Props {
  players: Player[];
}
interface PlayerS {
  id: string;
  name: string;
  goals: number;
  yellows: number;
  reds: number;
  ci: number;
}

export default function MatchPlayersTable({ players }: Props) {
  const [matchPlayers, setMatchPlayers] = useState<PlayerS[]>([]);
  const [selectPlayer, setSelectPlayer] = useState('');

  const handleAddPlayer = () => {
    if (!selectPlayer) return;
    setSelectPlayer('');
    const player: PlayerS = {
      id: selectPlayer,
      name: players.filter((player) => player.id.toString() === selectPlayer)[0].name,
      ci: players.filter((player) => player.id.toString() === selectPlayer)[0].documentNumber,
      goals: 0,
      yellows: 0,
      reds: 0
    };
    setMatchPlayers((prev) => [...prev, player]);
  };

  return (
    <>
      <Table className='border'>
        <TableCaption>Debe finalizar el partido para guardar los datos!</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>CI</TableHead>
            <TableHead>Goles</TableHead>
            <TableHead>Tar. A</TableHead>
            <TableHead>Tar. R</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchPlayers.map((player) => (
            <TableRowPlayer player={player} setMatchPlayers={setMatchPlayers} key={player.id} />
          ))}

          <TableRow>
            <TableCell colSpan={5}>
              <Select onValueChange={(value) => setSelectPlayer(value)} value={selectPlayer}>
                <SelectTrigger>
                  <SelectValue placeholder='Agregar Jugador' />
                </SelectTrigger>
                <SelectContent>
                  {players
                    .filter((player) => !matchPlayers.some((play) => play.id === player.id.toString()))
                    .map((player) => (
                      <SelectItem key={player.id} value={player.id.toString()}>
                        {player.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Button onClick={handleAddPlayer}> Agregar</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
