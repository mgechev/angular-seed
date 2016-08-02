import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment, Router } from '@angular/router';
import { CandidateProfile } from '../../shared/model/myProfilesInfo';
import { ProfileBankService } from '../../shared/services/profileBank.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-allprofiles-view',
    templateUrl: '../../shared/views/profileBankView.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['allProfilesView.component.css']
})
export class AllProfilesViewComponent implements OnActivate {
    params: string;
    errorMessage: string;
    profile: CandidateProfile;
    count: number = 0;
    TITLE: string = 'All Profiles';
    constructor(private _profileBankService: ProfileBankService,
        private _router: Router) {
        this.profile = new CandidateProfile();
    }
    routerOnActivate(segment: RouteSegment) {
        this.params = segment.getParam('id');
        this.getProfileInformation(this.params);
    }

    getProfileInformation(CandidateID: string) {
        if (CandidateID) {
            this._profileBankService.getCandidateProfile(CandidateID)
                .subscribe(
                (results: CandidateProfile) => {
                    this.profile = results;
                    this.count = results.CandidateQualification.length;
                    this.convertCheckboxesValues();
                },
                error => this.errorMessage = <any>error);
        }
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
        this._router.navigate(['/App/ProfileBank/AllProfiles']);
    }
}
