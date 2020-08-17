import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Event } from '../models/event.model';
import * as EventActions from '../actions/event.actions';


export const eventsFeatureKey = 'events';

export interface State extends EntityState<Event> {
    // additional entities state properties
    loaded: boolean;
    loading: boolean;
    selectedEvent: Event;
}


export const adapter: EntityAdapter<Event> = createEntityAdapter<Event>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    loaded: false,
    loading: false,
    selectedEvent: null
});

const eventReducer = createReducer(
    initialState,
    /** Create Event Actions */
    on(EventActions.createEvent,
        (state, action) => ({ ...state, loading: true, error: null, selectedEvent: null })
    ),
    on(EventActions.createEventSuccess,
        (state, action) => adapter.addOne(action.event, {
            ...state,
            loading: false
        })
    ),
    on(EventActions.createEventFailure,
        (state, action) => ({ ...state, loading: false })
    ),

    /** Load Event List Actions */
    on(EventActions.loadEvents,
        (state, action) => ({ ...state, loading: true, error: null })
    ),
    on(EventActions.loadEventsSuccess,
        (state, action) => adapter.addAll(action.events, {
            ...state,
            loading: false,
            loaded: true,
            selectedEvent: null
        })
    ),
    on(EventActions.loadEventsFailure,
        (state, action) => ({ ...state, loading: false, loaded: true })
    ),
);

export function reducer(state: State | undefined, action: Action) {
    return eventReducer(state, action);
}

// selectors
export const getEventsState = createFeatureSelector<State>(eventsFeatureKey);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const selectEventLoading = createSelector(getEventsState, state => state.loading);
export const selectEventLoaded = createSelector(getEventsState, state => state.loaded);
export const getSelectedEvent = createSelector(getEventsState, state => state.selectedEvent);
export const selectEvents = createSelector(getEventsState, selectAll);
