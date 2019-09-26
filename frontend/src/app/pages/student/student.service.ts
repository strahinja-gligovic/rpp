import { Injectable } from '@angular/core/';
import { Student } from '../../models/student.model';
import { BASE_URL } from '../../util/const';
import { HttpParams, HttpClient } from '@angular/common/http';



@Injectable()
export class StudentService {

    constructor(private http: HttpClient) {

    }

    getStudents(): Promise<Student[]> {
        return this.http.get(BASE_URL + '/student/gets')
            .toPromise()
            .then(response => response as Student[])
            .catch(this.handleError);
    }

    getStudent(studentId: number): Promise<Student> {
        const params = new HttpParams().set('studentId', studentId.toString());

        return this.http.get(BASE_URL + '/student/get', {params})
            .toPromise()
            .then(response => response as Student)
            .catch(this.handleError);
    }

    updateStudent(student: Student): Promise<any> {
        return this.http.put(BASE_URL + '/student/update', student)
            .toPromise()
            .then(response => response as Student)
            .catch(this.handleError);
    }

    deleteStudent(studentId: number): Promise<any> {
        const params = new HttpParams().set('studentId', studentId.toString());

        return this.http.delete(BASE_URL + '/student/delete', {params})
            .toPromise()
            .catch(this.handleError);
    }

    addStudent(student: Student): Promise<Student> {
        return this.http.post(BASE_URL + '/student/add', student)
            .toPromise()
            .then(response => response as Student)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
