export interface Payment {
  id: number;
  clubId: number;
  playerId?: number;
  type: string;
  price: number;
  deadline: string;
  paid: boolean;
  paydate: string | null;
}
