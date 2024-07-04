import { Club } from './clubs';
import { Player } from './players';

export interface Payment {
  id: number;
  clubId: number | null;
  playerId: number | null;
  type: string;
  price: number;
  deadline: string;
  paid: boolean;
  paydate: string | null;
}

export interface Cuota extends Payment {
  Club?: Club | null;
  Player?: Player | null;
}
