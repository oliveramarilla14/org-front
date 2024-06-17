import { Payment } from './payments';

export interface Player {
  id: number;
  name: string;
  teamId: number;
  documentNumber: number;
  promYear: number;
  phoneNumber?: number;
}

export interface PlayerStats {
  playerId: number;
  goalscorer?: number;
  played: number;
  win: number;
  draw: number;
  loose: number;
  goals: number;
  conceed: number;
  yellows: number;
  reds: number;
}

export interface PlayerStatsPayments extends Player {
  payments: Payment[];
  Stats: PlayerStats;
}
