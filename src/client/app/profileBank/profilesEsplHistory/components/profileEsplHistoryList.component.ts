import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {IfAuthorizeDirective} from '../../../shared/directives/ifAuthorize.directive';
import { ProfileBankPipe }from '../../shared/filter/profileBank.pipe';

@Component({
    moduleId: module.id,
    selector: 'profile-esplhistory-list',
    templateUrl: 'profileEsplHistoryList.component.html',
    directives: [ROUTER_DIRECTIVES, IfAuthorizeDirective],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    providers: [],
    pipes: [ProfileBankPipe]
})

export class ProfileEsplHistoryListComponent implements OnActivate {

    constructor(private _router: Router,
        public toastr: ToastsManager) {
        /** */
        this.getProfilesHistory();
    }

    routerOnActivate() {
        /** */
    }
    /**Function to get candidates interviews history with ESPL */
    getProfilesHistory() {
        /** TODO:: write service call for history */
        console.log('Imlemenation is inprogress');
    }

}
