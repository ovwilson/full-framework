import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import * as faker from 'faker';

import * as fromSettingsActions from './settings.actions';
import { Setting } from './../models/setting';

const url = 'http://localhost:3000/settings';
const headers = new HttpHeaders().set('Content-Type', 'application/json');
const body = { title: faker.company.companyName(), description: faker.lorem.paragraph() };

@Injectable()

export class SettingsEffects {

    @Effect() getSettings$: Observable<Action> = this.actions$.ofType(fromSettingsActions.SETTINGS_GET)
        .mergeMap(action =>
            this.http.get(url, { headers: headers })
                .map((data: Setting[]) => (new fromSettingsActions.SettingsReceive(data)))
                .catch(() => of({ type: 'GET_FAILED' }))
        );

    @Effect() createSettings$: Observable<Action> = this.actions$.ofType(fromSettingsActions.SETTINGS_CREATE)
        .mergeMap(action =>
            this.http.post(url, body, { headers: headers })
                .map((data: Setting[]) => (new fromSettingsActions.SettingsReceive(data)))
                .catch(() => of({ type: 'CREATE_FAILED' }))
        );

        @Effect() updateSettings$: Observable<Action> = this.actions$.ofType(fromSettingsActions.SETTINGS_UPDATE)
        .mergeMap(action =>
            this.http.patch(`${url}/10`, body, { headers: headers })
                .map((data: Setting[]) => (new fromSettingsActions.SettingsReceive(data)))
                .catch(() => of({ type: 'UPDATE_FAILED' }))
        );

        @Effect() deleteSettings$: Observable<Action> = this.actions$.ofType(fromSettingsActions.SETTINGS_DELETE)
        .mergeMap(action =>
            this.http.delete(`${url}/2`, { headers: headers })
                .map((data: Setting[]) => (new fromSettingsActions.SettingsReceive(data)))
                .catch(() => of({ type: 'DELETE_FAILED' }))
        );

    constructor(private http: HttpClient, private actions$: Actions) { }
}
