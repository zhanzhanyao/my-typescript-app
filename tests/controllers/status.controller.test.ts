// tests/controllers/status.controller.test.ts
import { StatusController } from '../../src/controllers/status.controller';
import { StatusService } from '../../src/services/status.service';
import { Request, Response } from 'express';

describe('StatusController', () => {
  let statusService: jest.Mocked<StatusService>;
  let statusController: StatusController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    statusService = {
      createStatus: jest.fn(),
      getStatus: jest.fn(),
      activateStatus: jest.fn(),
    } as unknown as jest.Mocked<StatusService>;

    statusController = new StatusController(statusService);

    req = {
      body: { id: '123', currentStatus: 'draft' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should create status and respond with 201', () => {
    statusController.createStatus(req as Request, res as Response);

    expect(statusService.createStatus).toHaveBeenCalledWith({
      id: '123',
      currentStatus: 'draft',
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Status created successfully',
    });
  });
});
