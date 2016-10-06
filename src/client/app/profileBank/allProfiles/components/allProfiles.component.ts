import {Component} from '@angular/core';
import { Routes } from '@angular/router';
import { AllProfilesListComponent } from './allProfilesList.component';
import { MyProfilesAddComponent} from '../../myProfiles/components/myProfilesAdd.component';
//import { AllProfilesAddComponent } from './allProfilesAdd.component';
import { MyProfilesService } from '../../myProfiles/services/myProfiles.service';
import { AllProfilesService } from '../services/allProfiles.service';
import { AllProfilesViewComponent} from './allProfilesView.component';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DataSharedService } from '../../shared/services/dataShared.service';
import { TransferOwnershipComponent} from './allProfilesTransferOwnership.component';
import { ProfileBankService } from '../../shared/services/profileBank.service';
import { ProfileEsplHistoryListComponent } from '../../profilesEsplHistory/components/profileEsplHistoryList.component';

@Component({
    selector: 'rrf-all-profiles',
    template: '<router-outlet></router-outlet>',
    providers: [AllProfilesService, MyProfilesService, MastersService, ToastsManager, DataSharedService, ProfileBankService]
})

/**
 * Ng 2.0 Changes
@Routes([
    { path: '/', component: AllProfilesListComponent },
    { path: '/Edit/:id', component: MyProfilesAddComponent },
    { path: '/View/:id', component: AllProfilesViewComponent },
    { path: '/Transfer', component: TransferOwnershipComponent },
    { path: '/History', component: ProfileEsplHistoryListComponent }
])*/
export class AllProfilesComponent {
}
