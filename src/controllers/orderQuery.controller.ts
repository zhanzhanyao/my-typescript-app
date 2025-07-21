import { AsyncMemoryRepository } from '../repositories/memory.repository';
import { Order, OrderStatus } from '../models/order.model';
import { OrderQueryService } from '../services/orderQuery.service';

const orderRepository = new AsyncMemoryRepository<Order>();
const orderQueryService = new OrderQueryService(orderRepository);

export async function getUserPendingOrderPaged(
  userId: string,
  pageIndex: number,
  pageSize: number,
): Promise<Order[]> {
  await orderQueryService.loadAll();
  return orderQueryService
    .fliterByUserId(userId)
    .filterByStatus(OrderStatus.PENDING)
    .sortByCreatedAtDesc()
    .paginate(pageIndex, pageSize)
    .getOrders();
}

export async function getOrderStatusCount(): Promise<Record<OrderStatus, number>> {
  return await orderQueryService.countByStatus();
}
