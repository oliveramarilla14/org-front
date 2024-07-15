import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { TableCell, TableRow } from '@/components/ui/table';
import { CircleMinus, CirclePlus, TextSelect } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { MatchDataContext } from '@/providers/MatchStoreProvider';
import { useContext } from 'react';
import { PlayerS, StatType } from '@/types/matches';

interface Props {
  player: PlayerS;
  team: '1' | '2';
}

export default function TableRowPlayer({ player, team }: Props) {
  const stats: StatType[] = ['goals', 'yellows', 'reds'];
  const { dispatch, state } = useContext(MatchDataContext);

  const handleDeletePlayer = (id: PlayerS['id']) => {
    dispatch({
      type: 'removePlayer',
      payload: {
        playerId: id,
        team
      }
    });
  };
  const handleAddStats = (stat: StatType, id: PlayerS['id']) => {
    dispatch({
      type: 'addStats',
      payload: {
        playerId: id,
        stat,
        team
      }
    });
  };

  const handleRestStats = (stat: StatType, id: PlayerS['id']) => {
    dispatch({
      type: 'restStats',
      payload: {
        playerId: id,
        stat,
        team
      }
    });
  };

  return (
    <TableRow key={player.id}>
      <TableCell>{player.name}</TableCell>
      <TableCell>{player.ci}</TableCell>
      <TableCell>{player.goals}</TableCell>
      <TableCell>{player.yellows}</TableCell>
      <TableCell>{player.reds}</TableCell>
      {!!state.match.result || (
        <TableCell>
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <TextSelect />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <div className='grid gap-4'>
                <div className='space-y-2'>
                  <h4 className='font-medium leading-none'>Registro</h4>
                  <p className='text-sm text-muted-foreground'>Modificar registros sobre stats.</p>
                </div>
                <div className='grid gap-2'>
                  {stats.map((val) => (
                    <div className='grid grid-cols-3 items-center gap-4' key={val}>
                      <Label htmlFor='width'>{val}</Label>
                      <Button className='h-8' onClick={() => handleRestStats(val, player.id)}>
                        <CircleMinus />
                      </Button>
                      <Button className='h-8' onClick={() => handleAddStats(val, player.id)}>
                        <CirclePlus />
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant='destructive'
                    onClick={() => {
                      handleDeletePlayer(player.id);
                    }}
                  >
                    Quitar Jugador
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </TableCell>
      )}
    </TableRow>
  );
}
