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

export interface PlayerS {
  id: string;
  name: string;
  goals: number;
  yellows: number;
  reds: number;
  ci: number;
}

export interface MatchData {
  match: {
    id: number;
    firstTeamId: number;
    firstTeamGoals: number;
    secondTeamId: number;
    secondTeamGoals: number;
    result: number;
  };
  playersOnMatch: {
    team1: PlayerS[];
    team2: PlayerS[];
  };
}
export type StatType = 'goals' | 'yellows' | 'reds';

export type MatchReducerType =
  | {
      type: 'addPlayer';
      payload: {
        stats: PlayerS;
        team: '1' | '2';
      };
    }
  | {
      type: 'removePlayer';
      payload: {
        playerId: string;
        team: '1' | '2';
      };
    }
  | {
      type: 'addStats';
      payload: {
        playerId: string;
        team: '1' | '2';
        stat: StatType;
      };
    }
  | {
      type: 'restStats';
      payload: {
        playerId: string;
        team: '1' | '2';
        stat: StatType;
      };
    }
  | {
      type: 'setMatch';
      payload: {
        match: Match;
      };
    };
