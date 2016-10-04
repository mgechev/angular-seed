import {Component} from '@angular/core';
import {MyProfilesListComponent} from './myProfilesList.component';
import {MyProfilesAddComponent} from './myProfilesAdd.component';
import { MyProfilesService } from '../services/myProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import {MyProfilesViewComponent} from './myProfilesView.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProfileBankService} from  '../../shared/services/profileBank.service';
import {ProfileBankAssignRRFComponent} from '../../shared/component/assignRRF.component';
import { ProfileEsplHistoryListComponent } from '../../profilesEsplHistory/components/profileEsplHistoryList.component';

@Component({
    selector: 'rrf-myprofiles',
    template: ' <router-outlet></router-outlet>',
    //directives: [ROUTER_DIRECTIVES],
    providers: [MyProfilesService, MastersService,ToastsManager,ProfileBankService]
})

// @Routes([
//     { path: '/', component: MyProfilesListComponent },
//     { path: '/Edit/:id', component: MyProfilesAddComponent },
//     { path: '/View/:id', component: MyProfilesViewComponent },
//     { path: '/Assign', component: ProfileBankAssignRRFComponent },
//     { path: '/History', component: ProfileEsplHistoryListComponent }
// ])
export class MyProfilesComponent {
}
