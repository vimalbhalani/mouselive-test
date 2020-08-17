import * as fromEvent from './event.reducer';


export interface AppState {
    [fromEvent.eventsFeatureKey]: fromEvent.State;
}
