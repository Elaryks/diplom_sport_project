export interface IApiControllerCrud<T> {
  create: (m: T) => Promise<T | null>;
  edit: (id: number, m: T, params?: any) => Promise<T | null>;
  editPartially: (id: number, currentState: T, newState: T, params?: any) => Promise<T | null>;
  del: (id: number) => Promise<boolean | null>;
}
