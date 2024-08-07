import { Club } from './clubs';
import { Player, PlayersFixtureData } from './players';

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
  players: PlayersFixtureData[];
}

export interface finishTeamPlayer {
  clubId: number;
  goals: number;
  id: number;
  matchId: number;
  playerId: number;
  red: number;
  yellow: number;
  Player: Player;
}

export interface FixtureMatch extends Match {
  FirstTeam: ClubPlayers;
  SecondTeam: ClubPlayers;
  team1?: finishTeamPlayer[];
  team2?: finishTeamPlayer[];
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
      type: 'setTeam';
      payload: {
        teamStats: finishTeamPlayer[];
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
