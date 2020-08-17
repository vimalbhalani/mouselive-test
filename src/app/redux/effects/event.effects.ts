
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EventActions from '../actions/event.actions';
import { Event } from '../models/event.model';
import { of } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';


@Injectable()
export class EventEffects {

    loadEvents$ = createEffect(() => this.actions$.pipe(
        ofType(EventActions.loadEvents),
        exhaustMap(() => this.eventService.getEvents().pipe(
            map((events: Event[]) => {
                return EventActions.loadEventsSuccess({ events });
            }),
            catchError(error => {
                return of(EventActions.loadEventsFailure());
            })
        ))
    ));


    createEvent$ = createEffect(() => this.actions$.pipe(
        ofType(EventActions.createEvent),
        exhaustMap((action) => {
            return this.eventService.createEvent(action.event).pipe(
                map((event: Event) => {
                    this.router.navigate(['/']);
                    return EventActions.createEventSuccess({ event });
                }),
                catchError(error => {
                    return of(EventActions.createEventFailure());
                })
            );
        })
    ));

    constructor(
        private actions$: Actions,
        private eventService: EventService,
        private router: Router
    ) { }

}
