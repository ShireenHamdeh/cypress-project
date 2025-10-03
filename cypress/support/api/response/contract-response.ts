import { IContractAttachment } from "./contract-attatchement";

export interface IEmploymentContractResponse {
  data: {
    startDate: string | null;
    endDate: string | null;
    contractAttachment: IContractAttachment;
  };
  meta: {
    empNumber: number;
  };
  rels: any[];
}
