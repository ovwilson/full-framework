import { Action } from '@ngrx/store';

export const LOADING_SHOW = '[Loading] Show';
export const LOADING_HIDE = '[Loading] Hide';

export class LoadingShow implements Action {
    readonly type = LOADING_SHOW;
}

export class LoadingHide implements Action {
    readonly type = LOADING_HIDE;
}

export type All
    = LoadingShow
    | LoadingHide;
