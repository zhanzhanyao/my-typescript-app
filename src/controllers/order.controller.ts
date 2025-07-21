import { Order, OrderStatus, User } from '../models/order.model';
import { generateOrderId } from '../utils/id.util';
import { OrderRepository } from '../repositories/order.repository';

export function createOrder(user: User, amount: number): Order {
  const id: string = generateOrderId();
  const createdAt = new Date().toISOString();

  const newOrder: Order = {
    id,
    userId: user.id,
    amount,
    createdAt,
    status: OrderStatus.PENDING,
  };
  OrderRepository.save(newOrder);
  return newOrder;
}

export function getOrdersByUserId(userId: String): Order[] {
  if (userId.trim() === '') {
    throw new Error('Invalid userId provided');
  }

  try {
    const allOrders = OrderRepository.findAll();
    const userOrders = allOrders.filter((order) => order.userId === userId);

    if (userOrders.length === 0) {
      throw new Error(`No orders found for user: ${userId}`);
    }
    return userOrders;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param orderId - order to update
 * @param newStatus - new status
 * @return updated order object
 */
export function updateOrderStatus(orderId: string, newStatus: OrderStatus): Order {
  if (!orderId || orderId.trim() === '') {
    throw new Error('Invalid orderId provided');
  }

  if (!Object.values(OrderStatus).includes(newStatus)) {
    throw new Error(`Invalid order status: ${newStatus}`);
  }

  const allOrders = OrderRepository.findAll();

  const targetOrder = allOrders.find((order) => order.id === orderId);

  if (!targetOrder) {
    throw new Error(`Order not found for id: ${orderId}`);
  }

  const upatedOrder: Order = {
    ...targetOrder,
    status: newStatus,
  };
  OrderRepository.save(upatedOrder);
  return upatedOrder;
}
