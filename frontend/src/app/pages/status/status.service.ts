import { Injectable } from '@angular/core/';
import { Status } from '../../models/status.model';
import { BASE_URL } from '../../util/const';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class StatusService {

    constructor(private http: Http) {

    }

    getStatuses(): Promise<Status[]> {
        return this.http.get(BASE_URL + '/status/gets')
            .toPromise()
            .then(response => response.json() as Status[])
            .catch(this.handleError);
    }

    getStatus(statusId: number): Promise<Status> {
        return this.http.get(BASE_URL + '/status/get', {params: {'statusId': statusId}})
            .toPromise()
            .then(response => response.json() as Status)
            .catch(this.handleError);
    }

    updateStatus(status: Status): Promise<any> {
        return this.http.put(BASE_URL + '/status/update', status)
            .toPromise()
            .then(response => response.json() as Status)
            .catch(this.handleError);
    }

    deleteStatus(statusId: number): Promise<any> {
        return this.http.delete(BASE_URL + '/status/delete', {params: {'statusId' : statusId}})
            .toPromise()
            .catch(this.handleError);
    }

    addStatus(status: Status): Promise<number> {
        return this.http.post(BASE_URL + '/status/add', status)
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
