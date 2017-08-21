
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';


export interface State {
    loading: boolean;
}

export function reducers() {
    return {
        loading: null
    };
};
