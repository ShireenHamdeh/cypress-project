export interface IResponse<T = unknown> {
  data: T;
  meta: unknown[];
  rels: unknown[];
}
