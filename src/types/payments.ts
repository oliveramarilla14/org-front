export interface Payment {
  id: number;
  clubId: number;
  playerId?: number;
  type: string;
  price: number;
  deadline: Date;
  paid: boolean;
  paydate?: Date;
}
