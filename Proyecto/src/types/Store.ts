import { Song } from "./Song";

export type Observer = { render: () => void }& HTMLElement;

export type AppState = {
    songs: Song[];
};

export enum songAction {
    'GETSONGS'='GETSONGS',
};

export interface getSongsAction {
    action: songAction.GETSONGS;
    payload: Song[];
};

export type Actions = getSongsAction;