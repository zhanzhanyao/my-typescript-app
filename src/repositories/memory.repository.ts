import { AsyncGenericRepository } from './generic.repository';

export class AsyncMemoryRepository<T extends { id: string }> implements AsyncGenericRepository<T> {
  private map = new Map<string, T>();
  async save(entity: T): Promise<void> {
    this.map.set(entity.id, entity);
  }

  async findById(id: string): Promise<T | undefined> {
    return this.map.get(id);
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.map.values());
  }
}
