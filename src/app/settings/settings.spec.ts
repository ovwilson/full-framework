import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { hot, cold } from 'jasmine-marbles';
import { SettingsEffects } from './settings.effects';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Setting } from './../models/setting';
import * as fromActions from './settings.actions';
import { MongoService } from './../services/mongo';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import * as faker from 'faker';

describe('Settings Effects', () => {
    let effects: SettingsEffects;
    let actions: ReplaySubject<any>;
    let id: number;
    const mockSetting = { title: faker.company.companyName(), description: faker.lorem.paragraph() };
    const mockUpdateSetting = { title: faker.company.companyName(), description: faker.lorem.paragraph() };
    const expectedKeys = ['__v', 'id', '_id', 'title', 'description', 'createdAt', 'updatedAt'].sort();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                SettingsEffects,
                MongoService,
                provideMockActions(() => actions)
            ]
        });
        effects = TestBed.get(SettingsEffects);
    });

    it('should CREATE Setting', async(() => {
        actions = new ReplaySubject(1);
        actions.next(new fromActions.SettingCreate(mockSetting));

        effects.createSetting$
            .do(action => console.log('Settings Effects: should CREATE Setting', action))
            .do((action: any) => id = action.payload['id'])
            .subscribe((action: fromActions.SettingReceive) => {
                expect(action.type).toEqual('[Setting] Receive');
                expect(Object.keys(action.payload).sort()).toEqual(expectedKeys);
            });
    }));

    it('should GET Settings', async(() => {
        actions = new ReplaySubject(1);
        actions.next(new fromActions.SettingsGet());
        effects.getSettings$
            .do(action => console.log('Settings Effects: should GET Settings', action))
            .subscribe((action: fromActions.SettingsReceive) => {
                const dataKeys = Object.keys(action.payload[0]).sort();
                expect(action.type).toEqual('[Settings] Receive');
                expect(dataKeys).toEqual(expectedKeys);
            });
    }));


    it('should UPDATE Setting', async(() => {
        actions = new ReplaySubject(1);
        actions.next(new fromActions.SettingUpdate({ id: id, body: mockUpdateSetting }));

        const update$ = effects.updateSetting$
            .do(action => console.log('Settings Effects: should UPDATE Setting', action))
            .do(action => actions.next(new fromActions.SettingGet({ id: id })));

        const getById$ = effects.getSettingById$
            .do(action => console.log('Settings Effects: should UPDATE Setting - GETBYID', action))
            .map((action: any) => action.payload)
            .do((payload: Setting[]) => {
                const setting: Setting = payload[0];
                const keys = Object.keys(setting).sort();
                expect(keys.length).toBeGreaterThan(0);
                expect(keys).toEqual(expectedKeys);
                expect(setting.title).toEqual(mockUpdateSetting.title);
                expect(setting.description).toEqual(mockUpdateSetting.description);
            });

        const concat$ = Observable.concat(update$.take(1), getById$.take(1)).subscribe();

    }));

    it('should DELETE Setting', async(() => {
        actions = new ReplaySubject(1);
        actions.next(new fromActions.SettingDelete({ id: id }));

        const delete$ = effects.deleteSetting$
            .do(action => console.log('Settings Effects: should DELETE Setting', action))
            .do((action: fromActions.SettingReceive) => {
                const setting = action.payload;
                const dataKeys = Object.keys(setting).sort();
                expect(action.type).toEqual('[Setting] Receive');
                expect(dataKeys).toEqual(expectedKeys);
                expect(setting.title).toEqual(mockUpdateSetting.title);
                expect(setting.description).toEqual(mockUpdateSetting.description);
            })
            .do(() => actions.next(new fromActions.SettingGet({ id: id })));

        const getById$ = effects.getSettingById$
            .do(action => console.log('Settings Effects: should UPDATE Setting - GETBYID', action))
            .map((action: any) => action.payload)
            .do((payload: Setting[]) => expect(payload.length).toEqual(0));

        const concat$ = Observable.concat(delete$.take(1), getById$.take(1)).subscribe();

    }));


});
