import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/reducers';
import { selectEventLoaded } from '../redux/reducers/event.reducer';
import { switchMap, take } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { loadEvents } from '../redux/actions/event.actions';

@Injectable()
export class EventsLoadedGuard implements CanActivate {
    constructor(
        private store: Store<AppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select(selectEventLoaded).pipe(
            take(1),
            switchMap(loaded => {
                if (!loaded) {
                    this.store.dispatch(loadEvents());
                }
                return of(true);
            })
        );
    }
}
