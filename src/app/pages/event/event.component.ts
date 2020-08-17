import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { createEvent } from '../../redux/actions/event.actions';
import { AppState } from '../../redux/reducers';
import { Router } from '@angular/router';
import { Event } from 'src/app/redux/models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  public createEventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createEventForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  get form() {
    return this.createEventForm.controls;
  }

  formatDate(date: string) {
    return moment(date).format('D MMM');
  }

  onSubmit() {
    const event: Event = {
      ...this.createEventForm.value,
    };
    this.store.dispatch(createEvent({ event }));
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

}
