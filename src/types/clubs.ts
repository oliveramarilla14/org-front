export interface Club {
  name: string;
  badge: null | string;
  id: number;
  inscriptionPayment: boolean;
}

export interface ClubStats {
  clubId: number;
  position: number | null;
  points: number;
  played: number;
  win: number;
  draw: number;
  loose: number;
  goals: number;
  conceed: number;
  yellows: number;
  reds: number;
}
