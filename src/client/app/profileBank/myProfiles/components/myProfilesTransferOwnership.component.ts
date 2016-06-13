import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
import { TransferOwnershipMeta } from '../model/myProfilesInfo';
import { MyProfilesDataSharedService } from '../services/myProfilesDataShared.service';
// import { MastersService } from '../../../shared/services/masters.service';
//import * as  _ from 'lodash';
import { TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';
// import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// import { APIResult } from  '../../../shared/constantValue/index';

@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-trnsfer',
    templateUrl: 'myProfilesTransferOwnership.component.html',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES],
    styleUrls: ['myProfiles.component.css'],
})
export class TransferOwnershipComponent implements OnActivate {
    CheckedCandidateIds: Array<string>;
    errorMessage: string;
    candidateProfiles: Array<TransferOwnershipMeta>;
    constructor(private _myProfilesDataSharedService: MyProfilesDataSharedService) {
    }
    routerOnActivate() {
        this.getCandidateIds();
    }
    getCandidateIds() {
        this.CheckedCandidateIds = this._myProfilesDataSharedService.getCheckedItems();
    }
}
