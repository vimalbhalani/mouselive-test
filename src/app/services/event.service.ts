import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../redux/models/event.model';
import { environment } from '../../environments/environment';

@Injectable()
export class EventService {
  serverUrl = '';
  moduleName = 'events';

  constructor(private httpClient: HttpClient) {
    this.serverUrl = environment.SERVER_URL;
  }

  public getEvents() {
    return this.httpClient.get(this.serverUrl + this.moduleName);
  }

  public getEvent(id: string) {
    return this.httpClient.get(`${this.serverUrl + this.moduleName}/${id}`);
  }

  public createEvent(event: Event) {
    return this.httpClient.post(`${this.serverUrl + this.moduleName}`, event);
  }

  public updateEvent(event: Event) {
    return this.httpClient.put(`${this.serverUrl + this.moduleName}/${event.id}`, event);
  }

  public deleteEvent(id: string) {
    return this.httpClient.delete(`${this.serverUrl + this.moduleName}/${id}`);
  }

}
