import { Order } from '../models/order.model';

const orderMap: Map<string, Order> = new Map();
export const OrderRepository = {
  save: (order: Order): void => {
    orderMap.set(order.id, order);
  },
  findById: (id: string): Order | undefined => {
    return orderMap.get(id);
  },
  findAll: (): Order[] => {
    return Array.from(orderMap.values());
  },
};
