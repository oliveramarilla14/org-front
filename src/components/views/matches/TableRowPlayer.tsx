import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { TableCell, TableRow } from '@/components/ui/table';
import { CircleMinus, CirclePlus, TextSelect } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface Props {
  player: PlayerS;
  setMatchPlayers: React.Dispatch<React.SetStateAction<PlayerS[]>>;
}
type StatType = 'goals' | 'yellows' | 'reds';
interface PlayerS {
  id: string;
  name: string;
  goals: number;
  yellows: number;
  reds: number;
  ci: number;
}

export default function TableRowPlayer({ player, setMatchPlayers }: Props) {
  const stats: StatType[] = ['goals', 'yellows', 'reds'];

  const handleDeletePlayer = (id: PlayerS['id']) => {
    setMatchPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
  };
  const handleAddStats = (stat: StatType, id: PlayerS['id']) => {
    setMatchPlayers((prevPlayers) =>
      prevPlayers.map((player) => (player.id === id ? { ...player, [stat]: player[stat] + 1 } : player))
    );
  };

  const handleRestStats = (stat: StatType, id: PlayerS['id']) => {
    setMatchPlayers((prevPlayers) =>
      prevPlayers.map((player) => (player.id === id ? { ...player, [stat]: player[stat] - 1 } : player))
    );
  };

  return (
    <TableRow key={player.id}>
      <TableCell>{player.name}</TableCell>
      <TableCell>{player.ci}</TableCell>
      <TableCell>{player.goals}</TableCell>
      <TableCell>{player.yellows}</TableCell>
      <TableCell>{player.reds}</TableCell>
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
    </TableRow>
  );
}
