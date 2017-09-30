import { Action } from '@ngrx/store';
import { Setting } from './../models/setting';
import { type } from './../services/type';

export const actionTypes = {
    'SETTINGS_GET': type('[Settings] Get'),
    'SETTINGS_RECEIVE': type('[Settings] Receive'),
    'SETTING_GET': type('[Setting] Get'),
    'SETTING_CREATE': type('[Setting] Create'),
    'SETTING_UPDATE': type('[Setting] Update'),
    'SETTING_DELETE': type('[Setting] Delete'),
    'SETTING_RECEIVE': type('[Setting] Receive')
};


export class SettingsGet implements Action {
    readonly type = actionTypes.SETTINGS_GET;
}

export class SettingsReceive implements Action {
    readonly type = actionTypes.SETTINGS_RECEIVE;
    constructor(public payload: Setting[]) { }
}

export class SettingCreate implements Action {
    readonly type = actionTypes.SETTING_CREATE;
    constructor(public payload: Setting) { }
}

export class SettingUpdate implements Action {
    readonly type = actionTypes.SETTING_UPDATE;
    constructor(public payload: { id: number, body: Setting }) { }
}

export class SettingDelete implements Action {
    readonly type = actionTypes.SETTING_DELETE;
    constructor(public payload: { id: number }) { }
}

export class SettingReceive implements Action {
    readonly type = actionTypes.SETTING_RECEIVE;
    constructor(public payload: Setting) { }
}

export type All = SettingsGet
    | SettingsReceive
    | SettingCreate
    | SettingUpdate
    | SettingDelete
    | SettingReceive;
