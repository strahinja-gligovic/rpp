import { Injectable } from '@angular/core/';
import { Department } from '../../models/department.model';
import { API_BASE_URL } from '../../util/const';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class DepartmentService {

    constructor(private http: HttpClient) {

    }

    getDepartments(): Promise<Department[]> {
        return this.http.get(API_BASE_URL + '/department/gets')
            .toPromise()
            .then(response => response as Department[])
            .catch(this.handleError);
    }

    getDepartment(departmentId: number): Promise<Department> {
        const params = new HttpParams().set('departmentId', departmentId.toString());
        return this.http.get(API_BASE_URL + '/department/get', { params })
            .toPromise()
            .then(response => response as Department)
            .catch(this.handleError);
    }

    updateDepartment(department: Department): Promise<any> {
        return this.http.put(API_BASE_URL + '/department/update', department)
            .toPromise()
            .then(response => response as Department)
            .catch(this.handleError);
    }

    deleteDepartment(departmentId: number): Promise<any> {
        const params = new HttpParams().set('departmentId', departmentId.toString());
        return this.http.delete(API_BASE_URL + '/department/delete', { params })
            .toPromise()
            .catch(this.handleError);
    }

    addDepartment(department: Department): Promise<number> {
        return this.http.post(API_BASE_URL + '/department/add', department)
            .toPromise()
            .then(response => response as number)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
