import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class MongoService {

    constructor(private http: HttpClient) { }

    get(url: string, headers: HttpHeaders) {
        return this.http.get(url, { headers: headers });
    }

    getById(url: string, id: number, headers: HttpHeaders) {
        return this.http.get(`${url}/${id}`, { headers: headers });
    }

    create(url: string, params: any, headers: HttpHeaders) {
        return this.http.post(url, params, { headers: headers });
    }

    update(url: string, id: number, params: any, headers: HttpHeaders) {
        if (params.id) { delete params['id']; }
        return this.http.patch(`${url}/${id}`, params, { headers: headers });
    }

    delete(url: string, headers: HttpHeaders) {
        return this.http.delete(url, { headers: headers });
    }

    deleteById(url: string, id: number, headers: HttpHeaders) {
        return this.http.delete(`${url}/${id}`, { headers: headers });
    }

}
