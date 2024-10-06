export interface IRedisService {
  set(key: string, value: any, ttl?: number): Promise<void>;
  get<T>(key: string): Promise<T>;
  del(key: string): Promise<void>;
  getPaginatedList<T = any>(
    key: string,
    page: number,
    pageSize: number,
  ): Promise<T[]>;
  setPaginatedList(key: string, values: any[]): Promise<void>;
}
