import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { Event } from '../../redux/models/event.model';
import { Store } from '@ngrx/store';
import { selectEvents } from '../../redux/reducers/event.reducer';
import { AppState } from '../../redux/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events$: Observable<Event[]> = of([]);

  constructor(
    private router: Router,
    // private eventService: EventService,
    private store: Store<AppState>
  ) {
    this.events$ = this.store.select(selectEvents);
  }

  ngOnInit(): void { }


  formatDate(date) {
    return moment(date).format('D MMM')
  }

  redirectToAddEvent() {
    this.router.navigate(['/event']);
  }
}
