import { StatusService } from '../../src/services/status.service';
import { Status } from '../../src/models/status.model';

let service: StatusService;

beforeEach(() => {
  service = new StatusService();
});

describe('StatusService', () => {
  it('should create and retrive a status', () => {
    const status: Status = {
      id: '123',
      currentStatus: 'draft',
    };

    service.createStatus(status);
    const result = service.getStatus(status.id);

    expect(result).not.toBeNull();
    expect(result?.id).toBe('123');
    expect(result?.currentStatus).toBe('draft');
  });

  it('should active a status', () => {
    const status: Status = {
      id: '456',
      currentStatus: 'draft',
    };

    service.createStatus(status);
    const activateStatus = service.activateStatus(status.id);

    expect(activateStatus.currentStatus).toBe('activated');

    const stored = service.getStatus(status.id);
    expect(stored?.currentStatus).toBe('activated');
  });

  it('should throw error if status not found', () => {
    expect(() => {
      service.activateStatus('not-exist-id');
    }).toThrow('Status not found');
  });

  it('should throw error if already activated', () => {
    const status: Status = {
      id: '789',
      currentStatus: 'activated',
    };

    service.createStatus(status);

    expect(() => {
      service.activateStatus(status.id);
    }).toThrow('Already activated');
  });
});
