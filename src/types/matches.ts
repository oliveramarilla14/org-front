import { Club } from './clubs';

export interface Match {
  id: number;
  firstTeamId: number;
  secondTeamId: number;
  hora: string;
  fecha: number;
  result: number | null;
}

export interface FixtureMatch extends Match {
  FirstTeam: Club;
  SecondTeam: Club;
}
