import { Status } from '../models/status.model';
export class StatusService {
  private statusStore: Map<string, Status> = new Map();

  createStatus(status: Status): void {
    this.statusStore.set(status.id, status);
  }

  getStatus(id: string): Status | null {
    return this.statusStore.get(id) || null;
  }

  activateStatus(id: string): Status {
    const status = this.statusStore.get(id);

    if (!status) {
      throw new Error('Status not found');
    }

    if (status.currentStatus === 'activated') {
      throw new Error('Already activated');
    }

    const updated: Status = {
      ...status,
      currentStatus: 'activated',
    };

    this.statusStore.set(id, updated);
    return updated;
  }
}
