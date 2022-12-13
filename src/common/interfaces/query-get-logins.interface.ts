export interface IQueryGetLogins {
  page: number;
  limit: number;
  name?: string;
  email?: string;
  ip?: string;
}
