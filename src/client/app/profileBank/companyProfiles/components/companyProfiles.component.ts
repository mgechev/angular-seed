import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { CompanyProfilesListComponent } from './companyProfilesList.component';
import { CompanyProfilesAddComponent } from './companyProfilesAdd.component';
import { CompanyProfilesService } from '../services/companyProfiles.service';
import {CompanyProfilesViewComponent} from './companyProfilesView.component';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProfileBankService } from '../../shared/services/profileBank.service';
import { DataSharedService } from '../../shared/services/dataShared.service';
import {TransferOwnershipComponent} from './companyProfilesTransferOwnership.component';
import {ProfileBankAssignRRFComponent} from '../../shared/component/assignRRF.component';

@Component({
    selector: 'rrf-black-listed-profiles',
    template: ' <router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [DataSharedService, CompanyProfilesService, MastersService,
        ToastsManager, ProfileBankService]
})

@Routes([
    { path: '/', component: CompanyProfilesListComponent },
    { path: '/Edit/:id', component: CompanyProfilesAddComponent },
    { path: '/View/:id', component: CompanyProfilesViewComponent },
    { path: '/Transfer', component: TransferOwnershipComponent },
    { path: '/Assign', component: ProfileBankAssignRRFComponent },

])
export class CompanyProfilesComponent {
}
