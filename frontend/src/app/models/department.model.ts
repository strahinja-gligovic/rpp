import { Faculty } from "./faculty.model";

export interface Department {
    id: number;
    name: string;
    label: string;
    faculty: Faculty;
}