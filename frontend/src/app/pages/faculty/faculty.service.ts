import { Injectable } from '@angular/core/';
import { Faculty } from '../../models/faculty.model';
import { BASE_URL } from '../../util/const';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class FacultyService {

    constructor(private http: Http) {

    }

    getFaculties(): Promise<Faculty[]> {
        return this.http.get(BASE_URL + '/faculty/gets')
            .toPromise()
            .then(response => response.json() as Faculty[])
            .catch(this.handleError);
    }

    getFaculty(facultyId: number): Promise<Faculty> {
        return this.http.get(BASE_URL + '/faculty/get', {params: {'facultyId': facultyId}})
            .toPromise()
            .then(response => response.json() as Faculty)
            .catch(this.handleError);
    }

    updateFaculty(faculty: Faculty): Promise<any> {
        return this.http.put(BASE_URL + '/faculty/update', faculty)
            .toPromise()
            .then(response => response.json() as Faculty)
            .catch(this.handleError);
    }

    deleteFaculty(facultyId: number): Promise<any> {
        return this.http.delete(BASE_URL + '/faculty/delete', {params: {'facultyId' : facultyId}})
            .toPromise()
            .catch(this.handleError);
    }

    addFaculty(faculty: Faculty): Promise<number> {
        return this.http.post(BASE_URL + '/faculty/add', faculty)
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
