import { Injectable } from '@angular/core/';
import { Faculty } from '../../models/faculty.model';
import { BASE_URL } from '../../util/const';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable()
export class FacultyService {

    constructor(private http: HttpClient) {

    }

    getFaculties(): Promise<Faculty[]> {
        return this.http.get(BASE_URL + '/faculty/gets')
            .toPromise()
            .then(response => response as Faculty[])
            .catch(this.handleError);
    }

    getFaculty(facultyId: number): Promise<Faculty> {
        const params = new HttpParams().set('facultyId', facultyId.toString());
        return this.http.get(BASE_URL + '/faculty/get', {params})
            .toPromise()
            .then(response => response as Faculty)
            .catch(this.handleError);
    }

    updateFaculty(faculty: Faculty): Promise<any> {
        return this.http.put(BASE_URL + '/faculty/update', faculty)
            .toPromise()
            .then(response => response as Faculty)
            .catch(this.handleError);
    }

    deleteFaculty(facultyId: number): Promise<any> {
        const params = new HttpParams().set('facultyId', facultyId.toString());
        return this.http.delete(BASE_URL + '/faculty/delete', {params})
            .toPromise()
            .catch(this.handleError);
    }

    addFaculty(faculty: Faculty): Promise<number> {
        return this.http.post(BASE_URL + '/faculty/add', faculty)
            .toPromise()
            .then(response => response as number)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
