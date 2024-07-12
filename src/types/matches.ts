import { Club } from './clubs';
import { Player } from './players';

export interface Match {
  id: number;
  firstTeamId: number;
  secondTeamId: number;
  firstTeamGoals: number;
  secondTeamGoals: number;
  hora: string;
  fecha: number;
  result: number | null;
}

interface ClubPlayers extends Club {
  players: Player[];
}
export interface FixtureMatch extends Match {
  FirstTeam: ClubPlayers;
  SecondTeam: ClubPlayers;
}

export interface PlayersOnMatch {
  playerId: number;
  matchId: number;
  goals: number;
  yellows: number;
  reds: number;
}
