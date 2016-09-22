import {Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {AdvanceSearchListComponent} from './advanceSearchList.component';
import { AdvanceSearchService } from '../services/advanceSearch.service';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProfileBankService} from  '../../shared/services/profileBank.service';
import {ProfileBankAssignRRFComponent} from '../../shared/component/assignRRF.component';
import { ProfileEsplHistoryListComponent } from '../../profilesEsplHistory/components/profileEsplHistoryList.component';

@Component({
    selector: 'rrf-myprofiles',
    template: ' <router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [AdvanceSearchService, MastersService,ToastsManager,ProfileBankService]
})

@Routes([
    { path: '/:searchString', component: AdvanceSearchListComponent },
])
export class AdvanceSearchComponent {
}
