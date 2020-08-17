import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { EventsLoadedGuard } from '../guards/events-loaded.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [EventsLoadedGuard],
        component: HomeComponent,
    }, {
        path: 'event',
        component: EventComponent,
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule {
}
