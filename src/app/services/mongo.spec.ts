import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MongoService } from './mongo';
import { Setting } from './../models/setting';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/concat';

describe('Mongo Effects', () => {

    let service: MongoService;
    let id: number;
    const url = '/settings';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const mockData = { title: 'Mongo Effect Test', description: 'Mongo Test Description' };
    const mockUpdate = { title: 'Mongo Updated Test Record', description: 'UPDATED Description' };
    const expectedKeys = ['__v', 'id', '_id', 'title', 'description', 'createdAt', 'updatedAt'].sort();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [MongoService]
        });
        service = TestBed.get(MongoService);
    });

    it('should CREATE record', async(() => {
        service.create(url, mockData, headers)
            .do((response: any) => id = response.id)
            .do(response => console.log('Mongo Effects: should CREATE Record', response))
            .subscribe((response: Setting) => {
                expect(response.title).toEqual(mockData.title);
                expect(response.description).toEqual(mockData.description);
            });
    }));

    it('should GET records', async(() => {
        service.get(url, headers)
            .do(response => console.log('Mongo Effects: should GET Records', response))
            .subscribe((response: Setting[]) => {
                const keys = Object.keys(response[0]).sort();
                expect(response.length).toBeGreaterThan(0);
                expect(keys.length).toBeGreaterThan(0);
                expect(keys).toEqual(expectedKeys);
            });

    }));

    it('should UPDATE record', async(() => {
        const update$ = service.update(url, id, mockUpdate, headers)
            .do(response => console.log('Mongo Effects: should UPDATE Record', response));

        const getById$ = service.getById(url, id, headers)
            .do(response => console.log('Mongo Effects: should UPDATE Record - GETBYID', response))
            .do((response: Setting[]) => {
                const setting: Setting = response[0];
                const keys = Object.keys(setting).sort();
                expect(keys.length).toBeGreaterThan(0);
                expect(keys).toEqual(expectedKeys);
                expect(setting.title).toEqual(mockUpdate.title);
                expect(setting.description).toEqual(mockUpdate.description);
            });

        const concat$ = Observable.concat(update$.take(1), getById$.take(1)).subscribe();

    }));

    it('should DELETE record', async(() => {
        const delete$ = service.deleteById(url, id, headers)
            .do(response => console.log('Mongo Effects: should DELETE Record', response))
            .do((response: Setting) => {
                const keys = Object.keys(response).sort();
                expect(keys.length).toBeGreaterThan(0);
                expect(keys).toEqual(expectedKeys);
                expect(response.title).toEqual(mockUpdate.title);
                expect(response.description).toEqual(mockUpdate.description);
            });

        const getById$ = service.getById(url, id, headers)
            .do(response => console.log('Mongo Effects: should DELETE Record - GETBYID', response))
            .do((response: Setting[]) => {
                expect(response.length).toEqual(0);
            });

        const concat$ = Observable.concat(delete$.take(1), getById$.take(1)).subscribe();

    }));


});
