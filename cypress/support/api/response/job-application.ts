import { IApplicationStatus } from "./application-status";
import { IVacancy } from "./vanacy";

export interface IJobApplication {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfApplication: string; 
  vacancy: IVacancy;
  status: IApplicationStatus;
  hasAttachment: boolean;
  deletable: boolean;
}