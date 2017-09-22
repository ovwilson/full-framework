import { Action } from '@ngrx/store';
import { Setting } from './../models/setting';

export const SETTINGS_GET = '[Settings] Get';
export const SETTINGS_CREATE = '[Settings] Create';
export const SETTINGS_UPDATE = '[Settings] Update';
export const SETTINGS_DELETE = '[Settings] Delete';
export const SETTINGS_RECEIVE = '[Settings] Receive';

export class SettingsGet implements Action {
    readonly type = SETTINGS_GET;
}

export class SettingsCreate implements Action {
    readonly type = SETTINGS_CREATE;
}

export class SettingsUpdate implements Action {
    readonly type = SETTINGS_UPDATE;
}

export class SettingsDelete implements Action {
    readonly type = SETTINGS_DELETE;
}

export class SettingsReceive implements Action {
    readonly type = SETTINGS_RECEIVE;
    constructor(public payload: Setting[]) { }
}

export type All = SettingsGet | SettingsCreate | SettingsUpdate | SettingsDelete | SettingsReceive;
