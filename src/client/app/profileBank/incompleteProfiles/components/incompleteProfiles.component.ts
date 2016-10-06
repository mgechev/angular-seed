import {Component} from '@angular/core';
import { Routes} from '@angular/router';
import { IncompleteProfilesListComponent } from './incompleteProfilesList.component';
import { AllProfilesService } from '../../allprofiles/services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DataSharedService } from '../../shared/services/dataShared.service';
import { ProfileBankService } from '../../shared/services/profileBank.service';
import { DetailProfileComponent } from '../../shared/component/detailProfile.component';
import {MyProfilesAddComponent} from '../../myProfiles/components/myProfilesAdd.component';
import { MyProfilesService } from '../../myProfiles/services/myProfiles.service';

@Component({
    selector: 'rrf-all-profiles',
    template: '<router-outlet></router-outlet>',
    providers: [DetailProfileComponent, AllProfilesService, MastersService,
        ToastsManager, DataSharedService, ProfileBankService, MyProfilesService]
})

/**
 * angular 2.0 changes
 *  
@Routes([
    { path: '/', component: IncompleteProfilesListComponent },
    { path: '/Edit/:id', component: MyProfilesAddComponent }
])
 */
export class IncompleteProfilesComponent {
}
