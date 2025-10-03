import { IHiringManager } from "./hiring-manager";

export interface IVacancy {
  id: number;
  name: string;
  status: boolean;
  hiringManager: IHiringManager;
}