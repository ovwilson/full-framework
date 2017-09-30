import { HttpClient, HttpHeaders } from '@angular/common/http';

export class MongoService {

    constructor(private http: HttpClient) { }

    get(url: string, headers: HttpHeaders) {
        return this.http.get(url, { headers: headers });
    }

    create(url: string, params: any, headers: HttpHeaders) {
        return this.http.post(url, params, { headers: headers });
    }

    update(url: string, id: number, params: any, headers: HttpHeaders) {
        if (params.id) { delete params['id']; }
        return this.http.patch(`${url}/${id}`, params, { headers: headers });
    }

    delete(url: string, id: number, headers: HttpHeaders) {
        return this.http.delete(`${url}/${id}`, { headers: headers });
    }

}
