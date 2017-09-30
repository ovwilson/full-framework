import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MongoService } from './mongo';

describe('Mongo Effects', () => {

    let service: MongoService;
    let id: number;
    const url = '/settings';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [MongoService]
        });
        service = TestBed.get(MongoService);
    });

    it('should CREATE record', async(() => {
        service.create(url, { title: 'Ttest' }, headers)
            .do((response: any) => id = response.id)
            .subscribe(response => console.log('Mongo Effects: should CREATE Record', response));
    }));

    it('should GET records', async(() => {
        service.get(url, headers)
            .subscribe(response => console.log('Mongo Effects: should GET records', response));

    }));

    it('should UPDATE record', async(() => {
        service.update(url, id, { title: 'YYPPPP' }, headers)
            .subscribe(response => console.log('Mongo Effects: should GET records', response));

    }));

    it('should DELETE record', async(() => {
        service.delete(url, id, headers)
            .subscribe(response => console.log('Mongo Effects: should DELETE records', response));

    }));


});
