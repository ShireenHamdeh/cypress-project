export interface IGetResponse<T = unknown> {
  data: T [];
  meta: unknown[];
  rels: unknown[];
}
