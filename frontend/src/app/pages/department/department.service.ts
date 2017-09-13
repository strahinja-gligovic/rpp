import { Injectable } from '@angular/core/';
import { Department } from '../../models/department.model';
import { BASE_URL } from '../../util/const';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DepartmentService {

    constructor(private http: Http) {

    }

    getDepartments(): Promise<Department[]> {
        return this.http.get(BASE_URL + '/department/gets')
            .toPromise()
            .then(response => response.json() as Department[])
            .catch(this.handleError);
    }

    getDepartment(departmentId: number): Promise<Department> {
        return this.http.get(BASE_URL + '/department/get', {params: {'departmentId': departmentId}})
            .toPromise()
            .then(response => response.json() as Department)
            .catch(this.handleError);
    }

    updateDepartment(department: Department): Promise<any> {
        return this.http.put(BASE_URL + '/department/update', department)
            .toPromise()
            .then(response => response.json() as Department)
            .catch(this.handleError);
    }

    deleteDepartment(departmentId: number): Promise<any> {
        return this.http.delete(BASE_URL + '/department/delete', {params: {'departmentId' : departmentId}})
            .toPromise()
            .catch(this.handleError);
    }

    addDepartment(department: Department): Promise<number> {
        return this.http.post(BASE_URL + '/department/add', department)
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
