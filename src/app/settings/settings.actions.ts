import { Action } from '@ngrx/store';
import { Setting } from './../models/setting';

export const SETTINGS_GET = '[Settings] Get';
export const SETTINGS_RECEIVE = '[Settings] Receive';

export const SETTING_GET = '[Setting] Get';
export const SETTING_CREATE = '[Setting] Create';
export const SETTING_UPDATE = '[Setting] Update';
export const SETTING_DELETE = '[Setting] Delete';
export const SETTING_RECEIVE = '[Setting] Receive';

export class SettingsGet implements Action {
    readonly type = SETTINGS_GET;
}

export class SettingsReceive implements Action {
    readonly type = SETTINGS_RECEIVE;
    constructor(public payload: Setting[]) { }
}

export class SettingCreate implements Action {
    readonly type = SETTING_CREATE;
    constructor(public payload: Setting) { }
}

export class SettingUpdate implements Action {
    readonly type = SETTING_UPDATE;
    constructor(public payload: { id: number, body: Setting}) { }
}

export class SettingDelete implements Action {
    readonly type = SETTING_DELETE;
    constructor(public payload: { id: number }) { }
}

export class SettingReceive implements Action {
    readonly type = SETTING_RECEIVE;
    constructor(public payload: Setting) { }
}

export type All = SettingsGet
    | SettingsReceive
    | SettingCreate
    | SettingUpdate
    | SettingDelete
    | SettingReceive;
