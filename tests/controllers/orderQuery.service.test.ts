import { AsyncMemoryRepository } from '../../src/repositories/memory.repository';
import { OrderQueryService } from '../../src/services/orderQuery.service';
import { OrderStatus } from '../../src/models/order.model';

describe('OrderQueryService Tests', () => {
  let repository: AsyncMemoryRepository<any>;
  let service: OrderQueryService;

  beforeEach(async () => {
    repository = new AsyncMemoryRepository();

    await repository.save({
      id: 'o1',
      userId: 'u1',
      amount: 100,
      createdAt: '2025-01-01T10:00:00Z',
      status: OrderStatus.PENDING,
    });
    await repository.save({
      id: 'o2',
      userId: 'u1',
      amount: 150,
      createdAt: '2025-01-02T10:00:00Z',
      status: OrderStatus.CONFIRMED,
    });
    await repository.save({
      id: 'o3',
      userId: 'u2',
      amount: 200,
      createdAt: '2025-01-03T10:00:00Z',
      status: OrderStatus.PENDING,
    });
    await repository.save({
      id: 'o4',
      userId: 'u1',
      amount: 250,
      createdAt: '2025-01-04T10:00:00Z',
      status: OrderStatus.CANCELLED,
    });
    service = new OrderQueryService(repository);
  });

  test('getUserPendingOrdersPaged returns correct filtered, sorted, paged results', async () => {
    await service.loadAll();
    const orders = service
      .fliterByUserId('u1')
      .filterByStatus(OrderStatus.PENDING)
      .sortByCreatedAtDesc()
      .paginate(1, 10)
      .getOrders();

    expect(orders).toHaveLength(1);
    expect(orders[0].id).toBe('o1');
  });

  test('countByStatus returns correct counts', async () => {
    const counts = await service.countByStatus();
    expect(counts[OrderStatus.PENDING]).toBe(2);
    expect(counts[OrderStatus.CONFIRMED]).toBe(1);
    expect(counts[OrderStatus.CANCELLED]).toBe(1);
  });
});
