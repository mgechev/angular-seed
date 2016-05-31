import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {MyProfilesListComponent} from './myProfilesList.component';
import {MyProfilesAddComponent} from './myProfilesAdd.component';
import { MyProfilesService } from '../services/myProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import {MyProfilesViewComponent} from './myProfilesView.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'rrf-myprofiles',
    template: ' <router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [MyProfilesService, MastersService,ToastsManager]
})

@Routes([
    { path: '/', component: MyProfilesListComponent },
    { path: '/Edit/:id', component: MyProfilesAddComponent },
    { path: '/View/:id', component: MyProfilesViewComponent }
])
export class MyProfilesComponent {
}
