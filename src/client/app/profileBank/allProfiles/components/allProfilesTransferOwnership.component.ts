import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router} from '@angular/router';
import { TransferOwnershipMeta } from '../../myProfiles/model/myProfilesInfo';
import { DataSharedService } from '../../shared/services/DataShared.service';
import { AllProfilesService } from '../services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';

@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-trnsfer',
    templateUrl: 'allProfilesTransferOwnership.component.html',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})
export class TransferOwnershipComponent implements OnActivate {
    CheckedCandidateIds: Array<string>;
    errorMessage: string;
    candidateProfiles: Array<TransferOwnershipMeta>;
    OwnerTypes: Array<MasterData>;
    Recruiters: Array<MasterData>;
    TransferOwnership: TransferOwnershipMeta = new TransferOwnershipMeta();
    constructor(private _myProfilesDataSharedService: DataSharedService,
        private _allProfilesService: AllProfilesService,
        private toastr: ToastsManager,
        private _router: Router,
        private _mastersService: MastersService) {
    }
    routerOnActivate() {
        this.getCandidateIds();
        this.getOwnerTypes();
        this.getRecruiters();
    }
    getCandidateIds() {
        this.CheckedCandidateIds = this._myProfilesDataSharedService.getCheckedItems();

        this._allProfilesService.getCandidateOwnwershipInfo(this.CheckedCandidateIds)
            .subscribe(
            results => {
                this.candidateProfiles = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
    onDelete(profile: any) {
        // var index = _.findIndex(this.CheckedCandidateIds, profile.CandidateID);
        // this.CheckedCandidateIds.splice(index, 1);
        var chkItemIndex = _.findIndex(this.candidateProfiles, profile);
        this.candidateProfiles.splice(chkItemIndex, 1);
    }

    getOwnerTypes() {
        this._mastersService.GetOwnerType()
            .subscribe(
            (results: any) => {
                this.OwnerTypes = results;
            },
            error => this.errorMessage = <any>error);

    }

    getRecruiters() {
        this._mastersService.GetRecruiter()
            .subscribe(
            (results: any) => {
                this.Recruiters = results;
            },
            error => this.errorMessage = <any>error);
    }

    onTransferOwnership() {
        if (this.candidateProfiles.length > 0) {
            for (var index = 0; index < this.candidateProfiles.length; index++) {
                this.TransferOwnership.CandidateIds.push(this.candidateProfiles[index].CandidateID);
            }
            this._allProfilesService.updateOwnership(this.TransferOwnership)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this._router.navigate(['/App/ProfileBank/AllProfiles/']);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                    }
                },
                error => this.errorMessage = <any>error);
        } else {
            this.toastr.error('No Candidate Selected');
        }
    }
}
