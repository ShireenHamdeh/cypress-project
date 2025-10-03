import { IHiringManager } from "./hiring-manager";

export interface IJobVacancy {
  id: number;
  name: string;
  description: string;
  numOfPositions: number | null;
  status: boolean;
  isPublished: boolean;
  jobTitle: IJobTitle;
  hiringManager: IHiringManager;
}