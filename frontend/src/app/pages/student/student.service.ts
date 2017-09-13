import { Injectable } from '@angular/core/';
import { Student } from '../../models/student.model';
import { BASE_URL } from '../../util/const';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class StudentService {

    constructor(private http: Http) {

    }

    getStudents(): Promise<Student[]> {
        return this.http.get(BASE_URL + '/student/gets')
            .toPromise()
            .then(response => response.json() as Student[])
            .catch(this.handleError);
    }

    getStudent(studentId: number): Promise<Student> {
        return this.http.get(BASE_URL + '/student/get', {params: {'studentId': studentId}})
            .toPromise()
            .then(response => response.json() as Student)
            .catch(this.handleError);
    }

    updateStudent(student: Student): Promise<any> {
        return this.http.put(BASE_URL + '/student/update', student)
            .toPromise()
            .then(response => response.json() as Student)
            .catch(this.handleError);
    }

    deleteStudent(studentId: number): Promise<any> {
        return this.http.delete(BASE_URL + '/student/delete', {params: {'studentId' : studentId}})
            .toPromise()
            .catch(this.handleError);
    }

    addStudent(student: Student): Promise<Student> {
        return this.http.post(BASE_URL + '/student/add', student)
            .toPromise()
            .then(response => response.json() as Student)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
