export interface AsyncGenericRepository<T, ID = string> {
  save(entity: T): Promise<void>;
  findById(id: ID): Promise<T | undefined>;
  findAll(): Promise<T[]>;
}
