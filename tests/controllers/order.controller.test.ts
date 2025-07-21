import { Order, OrderStatus, User } from '../../src/models/order.model';
import * as idUtil from '../../src/utils/id.util';
import { OrderRepository } from '../../src/repositories/order.repository';
import {
  createOrder,
  getOrdersByUserId,
  updateOrderStatus,
} from '../../src/controllers/order.controller';

describe('createOrder', () => {
  const mockUser: User = {
    id: 'user123',
    name: 'Alice',
    email: 'email@email',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new order with correct fields and save it', () => {
    jest.spyOn(idUtil, 'generateOrderId').mockReturnValue('mock-order-id');
    const saveSpy = jest.spyOn(OrderRepository, 'save').mockImplementation(() => {});

    const result: Order = createOrder(mockUser, 200);

    expect(result).toEqual({
      id: 'mock-order-id',
      userId: 'user123',
      amount: 200,
      createdAt: expect.any(String),
      status: OrderStatus.PENDING,
    });

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'mock-order-id',
        userId: 'user123',
        amount: 200,
        createdAt: expect.any(String),
        status: OrderStatus.PENDING,
      }),
    );
  });
});

describe('getOrdersByUserId', () => {
  const mockOrders: Order[] = [
    {
      id: 'order1',
      userId: 'user1',
      amount: 100,
      createdAt: new Date().toISOString(),
      status: OrderStatus.PENDING,
    },
    {
      id: 'order2',
      userId: 'user2',
      amount: 200,
      createdAt: new Date().toISOString(),
      status: OrderStatus.CONFIRMED,
    },
    {
      id: 'order3',
      userId: 'user2',
      amount: 300,
      createdAt: new Date().toISOString(),
      status: OrderStatus.CANCELLED,
    },
  ];
  it('should return only order matching the given userId', () => {
    jest.spyOn(OrderRepository, 'findAll').mockReturnValue(mockOrders);
    const result = getOrdersByUserId('user2');

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      expect.objectContaining({ id: 'order2', userId: 'user2' }),
      expect.objectContaining({ id: 'order3', userId: 'user2' }),
    ]);
  });
  it('should throw error if userId is blank', () => {
    expect(() => getOrdersByUserId('  ')).toThrow('Invalid userId provided');
  });

  it('should throw error if no orders found for user', () => {
    jest.spyOn(OrderRepository, 'findAll').mockReturnValue(mockOrders);

    expect(() => {
      getOrdersByUserId('user4');
    }).toThrow('No orders found for user: user4');
  });

  it('should throw error id orderRepo throw error', function () {
    jest.spyOn(OrderRepository, 'findAll').mockImplementation(() => {
      throw new Error('Database failure');
    });
    expect(() => getOrdersByUserId('user2')).toThrow('Database failure');
  });
});

describe('updateOrder', () => {
  const mockOrders: Order[] = [
    {
      id: 'order1',
      status: OrderStatus.PENDING,
      userId: 'userI',
      createdAt: new Date().toISOString(),
      amount: 100,
    },
    {
      id: 'order2',
      status: OrderStatus.CONFIRMED,
      userId: 'user2',
      createdAt: new Date().toISOString(),
      amount: 100,
    },
  ];

  it('should update order status', () => {
    jest.spyOn(OrderRepository, 'findAll').mockReturnValue(mockOrders);
    const saveSpy = jest.spyOn(OrderRepository, 'save').mockImplementation(() => {});

    const result = updateOrderStatus('order1', OrderStatus.CONFIRMED);

    expect(result.status).toEqual(OrderStatus.CONFIRMED);
    expect(saveSpy).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'order1', status: OrderStatus.CONFIRMED }),
    );
  });

  it('should throw error if orderId is blank', () => {
    expect(() => updateOrderStatus('   ', OrderStatus.CONFIRMED)).toThrow(
      'Invalid orderId provided',
    );
  });

  it('should throw error id new status is not valid', () => {
    const invalidStatus = 'SHIPPED' as OrderStatus;
    expect(() => {
      updateOrderStatus('order1', invalidStatus);
    }).toThrow(`Invalid order status: SHIPPED`);
  });

  it('should throw id not found matching order by orderId', () => {
    jest.spyOn(OrderRepository, 'findAll').mockReturnValue([]);
    expect(() => {
      updateOrderStatus('order1', OrderStatus.PENDING);
    }).toThrow('Order not found for id: order1');
  });
});
