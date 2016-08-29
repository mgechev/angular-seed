import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DataSharedService } from '../../shared/services/dataShared.service';
// import { AllProfilesService } from '../../allprofiles/services/allProfiles.service';
// import { MastersService } from '../../../shared/services/masters.service';
// import { ProfileBankService } from '../../shared/services/profileBank.service';

@Component({
    selector: 'profile-esplhistory',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ ToastsManager, DataSharedService]
})

@Routes([
    // { path: '/', component: IncompleteProfilesListComponent }
])
export class ProfileEsplHistoryComponent {
}
