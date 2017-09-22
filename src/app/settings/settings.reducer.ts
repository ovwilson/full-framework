import { Action } from '@ngrx/store';
import { Setting } from './../models/setting';
import * as fromActions from './settings.actions';

const initialState: Setting[] = [];

export function settings(state = initialState, action: fromActions.All): Setting[] {
    switch (action.type) {
        case fromActions.SETTINGS_RECEIVE:
            return action.payload;
        default:
            return state;
    }
}
