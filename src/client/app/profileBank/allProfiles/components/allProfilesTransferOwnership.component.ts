import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router} from '@angular/router';
import { TransferOwnershipMeta } from '../../shared/model/myProfilesInfo';
import { DataSharedService } from '../../shared/services/dataShared.service';
import { AllProfilesService } from '../services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService } from '../../shared/services/profileBank.service';


@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-trnsfer',
    templateUrl: 'allProfilesTransferOwnership.component.html',
    directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})
export class TransferOwnershipComponent implements OnActivate {
    CheckedCandidateIds: Array<MasterData> = new Array<MasterData>();
    errorMessage: string;
    candidateProfiles: Array<TransferOwnershipMeta>;
    OwnerTypes: Array<MasterData>;
    Recruiters: Array<MasterData>;
    TransferOwnership: TransferOwnershipMeta = new TransferOwnershipMeta();
    constructor(private _myProfilesDataSharedService: DataSharedService,
        private _allProfilesService: AllProfilesService,
        private toastr: ToastsManager,
        private _profileBankService: ProfileBankService,
        private _router: Router,
        private _mastersService: MastersService) {
    }

    routerOnActivate() {
        this.getCandidateIds();
        this.getOwnerTypes();
        this.getRecruiters();
    }

    getCandidateIds() {
        // this.CheckedCandidateIds = this._myProfilesDataSharedService.getCheckedItems();
        this.CheckedCandidateIds = JSON.parse(sessionStorage.getItem('CheckedItemIds'));

        // this._profileBankService.getCandidateOwnwershipInfo(this.CheckedCandidateIds)
        //     .subscribe(
        //     results => {
        //         this.candidateProfiles = <any>results;
        //     },
        //     error => this.errorMessage = <any>error);
        this._profileBankService.getCandidateOwnwershipInfo(this.CheckedCandidateIds)
            .subscribe(
            (results: TransferOwnershipMeta) => {
                this.candidateProfiles = <any>results;
            },
            (error: any) => this.errorMessage = <any>error);
    }
    onDelete(profile: any) {
        var chkItemIndex = _.findIndex(this.candidateProfiles, profile);
        this.candidateProfiles.splice(chkItemIndex, 1);
    }
    onSelectOwnerType(id: string) {
        this.TransferOwnership.OwnerType.Id = parseInt(id);
        this.TransferOwnership.OwnerType.Value = null;
    }
    onSelectOwner(id: string) {
        this.TransferOwnership.Owner.Id = parseInt(id);
        this.TransferOwnership.Owner.Value = null;
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
            this._profileBankService.updateOwnership(this.TransferOwnership)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this._router.navigate(['/App/ProfileBank/AllProfiles/']);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => this.errorMessage = <any>error);
        } else {
            this.toastr.error('No Candidate Selected');
        }
    }
}
