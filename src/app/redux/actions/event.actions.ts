import { createAction, props } from '@ngrx/store';
import { Event } from '../models/event.model';

export const loadEvents = createAction(
    '[Event/API] Load Events'
);

export const loadEventsSuccess = createAction(
    '[Event/API] Load Events Success',
    props<{ events: Event[] }>()
);

export const loadEventsFailure = createAction(
    '[Event/API] Load Events Failure'
);

export const createEvent = createAction(
    '[Event/API] Create Event',
    props<{ event: Event }>()
);

export const createEventSuccess = createAction(
    '[Event/API] Create Event Success',
    props<{ event: Event }>()
);

export const createEventFailure = createAction(
    '[Event/API] Create Event Failure'
);
