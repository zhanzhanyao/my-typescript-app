import { AsyncGenericRepository } from '../repositories/generic.repository';
import { Order, OrderStatus } from '../models/order.model';

export class OrderQueryService {
  private repository: AsyncGenericRepository<Order>;
  private orderCache: Order[] = [];

  constructor(repository: AsyncGenericRepository<Order>) {
    this.repository = repository;
  }

  async loadAll(): Promise<this> {
    this.orderCache = await this.repository.findAll();
    return this;
  }

  fliterByUserId(userId: string): this {
    this.orderCache = this.orderCache.filter((order) => order.userId === userId);
    return this;
  }

  filterByStatus(status: OrderStatus): this {
    this.orderCache = this.orderCache.filter((o) => o.status === status);
    return this;
  }

  sortByCreatedAtDesc(): this {
    this.orderCache.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return this;
  }

  paginate(pageIndex: number, pageSize: number): this {
    const start = (pageIndex - 1) * pageSize;
    this.orderCache = this.orderCache.slice(start, start + pageSize);
    return this;
  }

  getOrders(): Order[] {
    return this.orderCache;
  }

  async countByStatus(): Promise<Record<OrderStatus, number>> {
    const all = await this.repository.findAll();
    return all.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {} as Record<OrderStatus, number>,
    );
  }
}
