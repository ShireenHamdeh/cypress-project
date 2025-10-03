import { IEmpStatus } from "./employee-status";
import { IEmployeeTerminationRecord } from "./employee-terminal-record";
import { IJobCategory } from "./job-category";
import { IJobSpecificationAttachment } from "./job-specification-attatchment";
import { ILocation } from "./location";
import { ISubunit } from "./subunit";

export interface IJobDetails{
    empNumber: number;
    joinedDate: string | null; 
    jobTitle: IJobTitle;
    jobSpecificationAttachment: IJobSpecificationAttachment;
    empStatus: IEmpStatus;
    jobCategory: IJobCategory;
    subunit: ISubunit;
    location: ILocation;
    employeeTerminationRecord: IEmployeeTerminationRecord;
}