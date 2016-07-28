import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { IncompleteProfilesListComponent } from './incompleteProfilesList.component';
import { AllProfilesService } from '../../allprofiles/services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DataSharedService } from '../../shared/services/dataShared.service';
import { ProfileBankService } from '../../shared/services/profileBank.service';

@Component({
    selector: 'rrf-all-profiles',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [AllProfilesService, MastersService, ToastsManager, DataSharedService, ProfileBankService]
})

@Routes([
    { path: '/', component: IncompleteProfilesListComponent }
])
export class IncompleteProfilesComponent {
}
