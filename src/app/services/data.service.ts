import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class DataService implements InMemoryDbService {

    constructor() { }

    createDb() {
        const events = [
            { id: 1, name: 'event 1', address: 'New York', date: new Date() },
            { id: 2, name: 'event 2', address: 'LA', date: new Date() },
            { id: 3, name: 'event 3', address: 'CA', date: new Date() },
            { id: 4, name: 'event 4', address: 'Surat', date: new Date() },
        ];

        return { events };
    }
}
