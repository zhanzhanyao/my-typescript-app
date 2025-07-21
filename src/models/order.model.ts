export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Order {
  id: string;
  userId: string;
  amount: number;
  createdAt: string;
  status: OrderStatus;
}
