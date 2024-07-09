import { Club } from './clubs';
import { Player } from './players';

export interface Amonestation {
  id: number;
  playerId?: number | null;
  clubId: number;
  matchId: number | null;
  paymentId: number | null;
  type: string;
  observation: string | null;
  pointsDeducted: number | null;
  matchesToPay: number | null;
  matchesPaid: number | null;
  createdAt: Date;
  Club: Club;
  Player: Player | null;
}
