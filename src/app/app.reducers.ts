
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';
import { Setting } from './models/setting';
import * as fromSettings from './settings/settings.reducer';

export interface State {
    settings: fromSettings.State;
}

export function reducers() {
    return {
        settings: fromSettings.settings
    };
}

