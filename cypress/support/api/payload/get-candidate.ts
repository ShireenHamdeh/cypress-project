import { GET_INFO } from "../../enums/users-enum";

export interface IGetCandidateRequest {
  limit: number;
  offset: number;
  candidateId: number;
  model: string;
  sortField: string;
  sortOrder: GET_INFO.ASC | GET_INFO.DESC;
}
