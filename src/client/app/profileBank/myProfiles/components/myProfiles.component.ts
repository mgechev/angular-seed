import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {MyProfilesListComponent} from './myProfilesList.component';
import {MyProfilesAddComponent} from './myProfilesAdd.component';
import { MyProfilesService } from '../services/myProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import {MyProfilesViewComponent} from './myProfilesView.component';
import {TransferOwnershipComponent} from './myProfilesTransferOwnership.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MyProfilesDataSharedService } from '../services/myProfilesDataShared.service';

@Component({
    selector: 'rrf-myprofiles',
    template: ' <router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [MyProfilesService, MastersService,ToastsManager,MyProfilesDataSharedService]
})

@Routes([
    { path: '/', component: MyProfilesListComponent },
    { path: '/Edit/:id', component: MyProfilesAddComponent },
    { path: '/View/:id', component: MyProfilesViewComponent },
    { path: '/Transfer', component: TransferOwnershipComponent }
])
export class MyProfilesComponent {
}
