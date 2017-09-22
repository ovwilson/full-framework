import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { hot, cold } from 'jasmine-marbles';
import { SettingsEffects } from './settings.effects';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHandler } from '@angular/common/http';

import * as fromActions from './settings.actions';

describe('My Effects', () => {
    let effects: SettingsEffects;
    let actions: ReplaySubject<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HttpClient,
                HttpHandler,
                SettingsEffects,
                provideMockActions(() => actions),
                // other providers
            ],
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

    it('should work also', () => {
        actions = new ReplaySubject(1);

        actions.next(new fromActions.SettingsGet());

        effects.getSettings$.subscribe(result => {
            expect(result).toEqual(new fromActions.SettingsReceive([]));
        });
    });
});