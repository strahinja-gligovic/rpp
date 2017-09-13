import { Department } from "./department.model";
import { Status } from "./status.model";

export class Student {
    id: number;
    name: string;
    lastName: string;
    indexNumber: string;
    status: Status;
    department: Department

    constructor(){
    }
}