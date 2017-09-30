import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import * as fromSettingsActions from './settings.actions';
import { Setting } from './../models/setting';
import { MongoService } from './../services/mongo';

const url = '/settings';
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable()

export class SettingsEffects {

    @Effect() getSettings$: Observable<Action> = this.actions$.ofType(fromSettingsActions.actionTypes.SETTINGS_GET)
        .mergeMap(action => this.service.get(url, headers)
            .map((data: Setting[]) => (new fromSettingsActions.SettingsReceive(data)))
            .catch(() => of({ type: 'GET_SETTINGS_FAILED' }))
        );

    @Effect() createSetting$: Observable<Action> =
    this.actions$.ofType<fromSettingsActions.SettingCreate>(fromSettingsActions.actionTypes.SETTING_CREATE)
        .mergeMap(action => this.service.create(url, action.payload, headers)
            .map((data: Setting) => (new fromSettingsActions.SettingReceive(data)))
            .catch(() => of({ type: 'CREATE_SETTINGS_FAILED' }))
        );

    @Effect() updateSetting$: Observable<Action> =
    this.actions$.ofType<fromSettingsActions.SettingUpdate>(fromSettingsActions.actionTypes.SETTING_UPDATE)
        .mergeMap(action => this.service.update(url, action.payload.id, action.payload.body, headers)
            .map((data: Setting) => (new fromSettingsActions.SettingReceive(data)))
            .catch(() => of({ type: 'UPDATE_SETTINGS_FAILED' }))
        );

    @Effect() deleteSetting$: Observable<Action> =
    this.actions$.ofType<fromSettingsActions.SettingDelete>(fromSettingsActions.actionTypes.SETTING_DELETE)
        .mergeMap(action => this.service.delete(url, action.payload.id, headers)
            .map((data: Setting) => (new fromSettingsActions.SettingReceive(data)))
            .catch(() => of({ type: 'DELETE_SETTINGS_FAILED' }))
        );

    constructor(private service: MongoService, private actions$: Actions) { }
}
