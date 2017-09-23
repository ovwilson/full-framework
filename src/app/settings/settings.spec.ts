import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { hot, cold } from 'jasmine-marbles';
import { SettingsEffects } from './settings.effects';
import { Observable } from 'rxjs/Observable';

import * as faker from 'faker';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concat';

import { HttpClientModule } from '@angular/common/http';
import { Setting } from './../models/setting';
import * as fromActions from './settings.actions';

describe('Settings Effects', () => {
    let effects: SettingsEffects;
    let actions: ReplaySubject<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                SettingsEffects,
                provideMockActions(() => actions)
            ]
        });

        effects = TestBed.get(SettingsEffects);
    });
    /*
        it('should work', () => {
            actions = hot('--a-', { a: SomeAction });
    
            const expected = cold('--b', { b: AnotherAction });
    
            expect(effects.someSource$).toBeObservable(expected);
        });
        */

    it('should GET Settings', async(() => {
        actions = new ReplaySubject(1);
        actions.next(new fromActions.SettingsGet());
        effects.getSettings$
            .do(action => console.log('should GET Settings', action))
            .subscribe((action: fromActions.SettingsReceive) => {
                expect(action.type).toEqual('[Settings] Receive');
                expect(Object.keys(action.payload[0])).toEqual(['id', 'title', 'description']);
            });
    }));


    it('should CREATE Setting', async(() => {
        const mockSetting: Setting = {
            title: faker.company.companyName(), description: faker.lorem.paragraph()
        };
        actions = new ReplaySubject(1);
        actions.next(new fromActions.SettingCreate(mockSetting));

        effects.createSettings$
            .do(action => console.log('should CREATE Setting', action))
            .subscribe((action: fromActions.SettingReceive) => {
                expect(action.type).toEqual('[Setting] Receive');
                expect(Object.keys(action.payload)).toEqual(['title', 'description', 'id']);
            });
    }));

    it('should UPDATE Setting', async(() => {
        const mockSetting: Setting = {
            title: faker.company.companyName(), description: faker.lorem.paragraph()
        };

   //     actions = new ReplaySubject(1);
   //  actions.next(new fromActions.SettingUpdate({ id: Number(id), body: mockSetting }));
//        effects.updateSettings$
 //           .do(action => console.log('should UPDATE Setting', action))
  //          .subscribe((action: any) => {
  //              expect(action.type).toEqual('[Setting] Receive');
  //              expect(Object.keys(action.payload)).toEqual(['id', 'title', 'description']);
  //          });
    }));

    it('should DELETE Setting', async(() => {

    })); 

});
