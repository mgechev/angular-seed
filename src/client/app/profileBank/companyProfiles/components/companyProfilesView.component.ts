import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment, Router } from '@angular/router';
import { CandidateProfile } from '../../shared/model/myProfilesInfo';
import { MasterData } from  '../../../shared/model/index';
import { ProfileBankService } from '../../shared/services/profileBank.service';
@Component({
    moduleId: module.id,
    selector: 'rrf-companyprofiles-view',
    templateUrl: '../../shared/views/profileBankView.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['../../allProfiles/components/allProfilesView.component.css']
})
export class CompanyProfilesViewComponent implements OnActivate {
    params: string;
    CandidateID: MasterData = new MasterData();
    TITLE:string ='Company Profiles';

    profile: CandidateProfile;
    errorMessage: string;
    count: number = 0;
    constructor(private _profileBankService: ProfileBankService,
        private _router: Router) {
        this.profile = new CandidateProfile();
    }
    routerOnActivate(segment: RouteSegment) {
        this.params = segment.getParam('id');
        this.CandidateID.Id = parseInt(this.params.split('ID')[1]);
        this.CandidateID.Value = this.params.split('ID')[0];

        this._profileBankService.getCandidateProfile(this.CandidateID.Value)
            .subscribe(
            (results: CandidateProfile) => {
                this.profile = results;
                this.count = results.CandidateQualification.length;
                this.convertCheckboxesValues();
            },
            error => this.errorMessage = <any>error);

    }

    convertCheckboxesValues() {
        if (this.profile.IsCurrentSameAsPermanent === true) {
            this.profile.IsCurrentSameAsPermanent = 'Yes';
        } else {
            this.profile.IsCurrentSameAsPermanent = 'No';
        }

        if (this.profile.ReadyToRelocate === true) {
            this.profile.ReadyToRelocate = 'Yes';
        } else {
            this.profile.ReadyToRelocate = 'No';
        }

        if (this.profile.OutstationedCandidate === true) {
            this.profile.OutstationedCandidate = 'Yes';
        } else {
            this.profile.OutstationedCandidate = 'No';
        }

        if (this.profile.CandidateTeamManagement.TeamMgmt === true) {
            this.profile.CandidateTeamManagement.TeamMgmt = 'Yes';
        } else {
            this.profile.CandidateTeamManagement.TeamMgmt = 'No';
        }

        if (this.profile.CandidateOtherDetails.AppliedEarlier === true) {
            this.profile.CandidateOtherDetails.AppliedEarlier = 'Yes';
        } else {
            this.profile.CandidateOtherDetails.AppliedEarlier = 'No';
        }

        if (this.profile.CandidateOtherDetails.OfferInHand === true) {
            this.profile.CandidateOtherDetails.OfferInHand = 'Yes';
        } else {
            this.profile.CandidateOtherDetails.OfferInHand = 'No';
        }

        if (this.profile.CandidateSalaryDetails.CTCIncludeVariable === true) {
            this.profile.CandidateSalaryDetails.CTCIncludeVariable = 'Yes';
        } else {
            this.profile.CandidateSalaryDetails.CTCIncludeVariable = 'No';
        }
    }

    Back() {
        this._router.navigate(['/App/ProfileBank/CompanyProfiles']);
    }

}
