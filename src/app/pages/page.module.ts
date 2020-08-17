import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEvent from '../redux/reducers/event.reducer';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { EventsLoadedGuard } from '../guards/events-loaded.guard';
import { EventEffects } from '../redux/effects/event.effects';
import { DataService } from '../services/data.service';
import { EventService } from '../services/event.service';

@NgModule({
    declarations: [
        HomeComponent,
        EventComponent
    ],
    imports: [
        CommonModule,
        PageRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forFeature(DataService),
        StoreModule.forFeature(fromEvent.eventsFeatureKey, fromEvent.reducer),
        EffectsModule.forFeature([
            EventEffects
        ])
    ],
    providers: [
        EventService,
        DataService,
        EventsLoadedGuard
    ]
})
export class PageModule { }
