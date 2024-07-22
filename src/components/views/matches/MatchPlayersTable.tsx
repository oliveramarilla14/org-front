import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlayersFixtureData } from '@/types/players';
import { useContext, useState } from 'react';
import TableRowPlayer from './TableRowPlayer';
import { MatchDataContext } from '@/providers/MatchStoreProvider';
import { PlayerS } from '@/types/matches';
import ActionModal from '@/components/modals/ActionModal';

interface Props {
  players: PlayersFixtureData[];
  team: '1' | '2';
}

export default function MatchPlayersTable({ players, team }: Props) {
  const { dispatch, state } = useContext(MatchDataContext);
  const [selectPlayer, setSelectPlayer] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleAddPlayer = () => {
    if (!selectPlayer) return;
    const playerToAdd = players.filter((player) => player.id.toString() === selectPlayer)[0];
    if (playerToAdd.amonestations.length > 0 || playerToAdd.payments.length > 0) {
      setOpenConfirm(true);
      return;
    }

    AddPlayer(playerToAdd);
  };

  const AddPlayer = (playerToAdd: PlayersFixtureData | string) => {
    if (typeof playerToAdd === 'string') {
      playerToAdd = players.filter((player) => player.id.toString() === selectPlayer)[0];
    }
    const player: PlayerS = {
      id: selectPlayer,
      name: playerToAdd.name,
      ci: playerToAdd.documentNumber,
      goals: 0,
      yellows: 0,
      reds: 0
    };
    dispatch({
      type: 'addPlayer',
      payload: {
        stats: player,
        team
      }
    });
    setSelectPlayer('');
  };

  const handleUnavailable = (playerS: PlayerS) => {
    const playerCheck = players.filter((player) => player.id.toString() === playerS.id)[0];
    if (!playerCheck) return false;
    if (playerCheck.amonestations.length > 0 || playerCheck.payments.length > 0) {
      return true;
    }
    return false;
  };

  return (
    <Table className='border'>
      {!!state.match.result || <TableCaption>Debe finalizar el partido para guardar los datos!</TableCaption>}
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
        {state.playersOnMatch[`team${team}`].map((player) => (
          <TableRowPlayer player={player} team={team} key={player.id} unavailable={handleUnavailable(player)} />
        ))}

        {!!state.match.result || (
          <TableRow>
            <TableCell colSpan={5}>
              <Select onValueChange={(value) => setSelectPlayer(value)} value={selectPlayer}>
                <SelectTrigger>
                  <SelectValue placeholder='Agregar Jugador' />
                </SelectTrigger>
                <SelectContent>
                  {players
                    .filter(
                      (player) => !state.playersOnMatch[`team${team}`].some((play) => play.id === player.id.toString())
                    )
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
        )}
      </TableBody>

      {players && selectPlayer && (
        <ActionModal
          open={openConfirm}
          onOpenChange={setOpenConfirm}
          title='Seguro que quiere agregar al jugador?'
          description={`El jugador: ${
            players.filter((player) => player.id.toString() === selectPlayer)[0].name
          } no esta habilitado para jugar`}
          onConfirm={() => {
            AddPlayer(selectPlayer);
            setOpenConfirm(false);
          }}
        />
      )}
    </Table>
  );
}
