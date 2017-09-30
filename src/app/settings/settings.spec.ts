import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { hot, cold } from 'jasmine-marbles';
import { SettingsEffects } from './settings.effects';
import { Observable } from 'rxjs/Observable';

import * as faker from 'faker';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Setting } from './../models/setting';
import * as fromActions from './settings.actions';
import { MongoService } from './../services/mongo';

describe('Settings Effects', () => {
    let effects: SettingsEffects;
    let actions: ReplaySubject<any>;
    let expectedKeys: Array<string>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [],
            providers: [
                SettingsEffects,
                MongoService,
                provideMockActions(() => actions)
            ]
        });
        expectedKeys = ['__v', 'id', '_id', 'title',
            'description', 'createdAt', 'updatedAt'].sort();
        effects = TestBed.get(SettingsEffects);
    });
    /*
        it('should work', () => {
            actions = hot('--a-', { a: SomeAction });
    
            const expected = cold('--b', { b: AnotherAction });
    
            expect(effects.someSource$).toBeObservable(expected);
        });
        

    it('should CREATE Setting', async(() => {
        const mockSetting: Setting = {
            title: faker.company.companyName(), description: faker.lorem.paragraph()
        };
        actions = new ReplaySubject(1);
        actions.next(new fromActions.SettingCreate(mockSetting));

        effects.createSetting$
            .do(action => console.log('should CREATE Setting', action))
            .subscribe((action: fromActions.SettingReceive) => {
                expect(action.type).toEqual('[Setting] Receive');
                expect(Object.keys(action.payload).sort()).toEqual(expectedKeys);
            });
    }));

    it('should GET Settings', async(() => {
        actions = new ReplaySubject(1);
        actions.next(new fromActions.SettingsGet());
        effects.getSettings$
            .do(action => console.log('should GET Settings', action))
            .subscribe((action: fromActions.SettingsReceive) => {
                const data = Object.keys(action.payload[0]).sort();
                expect(action.type).toEqual('[Settings] Receive');
                expect(data).toEqual(expectedKeys);
            });
    }));


    it('should UPDATE Setting', async(() => {
        const mockSetting: Setting = {
            title: faker.company.companyName(), description: faker.lorem.paragraph()
        };

        actions = new ReplaySubject(1);
        actions.next(new fromActions.SettingsGet());
        const get$ = effects.getSettings$
            .map((action: fromActions.SettingReceive) => action.payload[0].id)
            .do(id => actions.next(new fromActions.SettingUpdate({ id: id, body: mockSetting })));

        const update$ = effects.updateSetting$
            .do(action => console.log('should UPDATE Setting', action))
            .do((action: fromActions.SettingReceive) => {
                const data = Object.keys(action.payload).sort();
                expect(action.type).toEqual('[Setting] Receive');
                expect(data).toEqual(expectedKeys);
                expect(action.payload.title).toEqual(mockSetting.title);
            });

        const concat$ = Observable.concat(get$.take(1), update$.take(1)).subscribe();

    }));

    it('should DELETE Setting', async(() => {
        actions = new ReplaySubject(1);
        actions.next(new fromActions.SettingsGet());

        const get$ = effects.getSettings$
            .map((action: fromActions.SettingReceive) => action.payload[0].id)
            .do(id => actions.next(new fromActions.SettingDelete({ id: id })));

        const delete$ = effects.deleteSetting$
            .do(action => console.log('should DELETE Setting', action))
            .do((action: fromActions.SettingReceive) => {
                const data = Object.keys(action.payload).sort();
                expect(action.type).toEqual('[Setting] Receive');
                expect(data).toEqual(expectedKeys);
            });

        const concat$ = Observable.concat(get$.take(1), delete$.take(1)).subscribe();
    }));

*/
});
