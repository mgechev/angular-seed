import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {RecentProfilesListComponent} from './recentProfilesList.component';
import {RecentProfilesAddComponent} from './recentProfilesAdd.component';
import {RecentProfilesService } from '../services/recentProfiles.service';
import {RecentProfilesViewComponent} from './recentProfilesView.component';
import { MastersService } from '../../../shared/services/masters.service';

@Component({
    selector: 'rrf-recent-profiles',
    template: ' <router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers:[RecentProfilesService,MastersService]
})

@Routes([
    { path: '/', component: RecentProfilesListComponent },
    { path: '/Edit/:id', component: RecentProfilesAddComponent },
    { path: '/View/:id', component: RecentProfilesViewComponent }
])
export class RecentProfilesComponent {
}
