import { Action } from '@ngrx/store';
import { Setting } from './../models/setting';
import * as fromActions from './settings.actions';

export interface State {
    model: Setting;
    models: Setting[];
}

const initialState: State = {
    model: {},
    models: []
};


export function settings(state = initialState, action: fromActions.All): State {
    switch (action.type) {
        case fromActions.actionTypes.SETTINGS_RECEIVE:
            return {
                model: state.model,
                models: action.payload
            };
            case fromActions.actionTypes.SETTING_RECEIVE:
            return {
                model: action.payload,
                models: state.models
            };
        default:
            return state;
    }
}
