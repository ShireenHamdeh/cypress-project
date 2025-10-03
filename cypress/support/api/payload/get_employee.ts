import { GET_INFO } from "../../enums/users-enum";

export interface IGetEmployeeRequest {
  limit: number;
  offset: number;
  model: GET_INFO.DETAILED | GET_INFO.SUMMARY;
  employeeId: number;
  includeEmployees: GET_INFO.ONLY_CURRENT | GET_INFO.ALL; 
  sortField: string; 
  sortOrder: GET_INFO.ASC | GET_INFO.DESC;
}
