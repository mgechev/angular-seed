import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router } from '@angular/router';
import {CandidateProfile, AllCandidateProfiles} from '../../shared/model/myProfilesInfo';
import { AllProfilesService } from '../../allProfiles/services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { MasterData, GrdOptions, ResponseFromAPI, SortingMasterData } from  '../../../shared/model/index';
import { DataSharedService } from '../../shared/services/dataShared.service';
import { ProfileBankService } from '../../shared/services/profileBank.service';
import { ProfileBankPipe }from '../../shared/filter/profileBank.pipe';
import {IfAuthorizeDirective} from '../../../shared/directives/ifAuthorize.directive';
import { DetailProfileComponent } from '../../shared/component/detailProfile.component';

@Component({
    moduleId: module.id,
    selector: 'rrf-incompleteprofiles-list',
    templateUrl: 'incompleteProfilesList.component.html',
    directives: [DetailProfileComponent, ROUTER_DIRECTIVES, IfAuthorizeDirective, CollapseDirective, TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    providers: [AllProfilesService],
    pipes: [ProfileBankPipe]
})

export class IncompleteProfilesListComponent implements OnActivate {
    profile: CandidateProfile;
    CandidateProfiles: AllCandidateProfiles = new AllCandidateProfiles();
    incompleteProfilesList: AllCandidateProfiles = new AllCandidateProfiles();
    NORECORDSFOUND: boolean = false;
    errorMessage: any;
    ColumnList: Array<SortingMasterData> = new Array<SortingMasterData>();
    constructor(private _allProfilesService: AllProfilesService,
        private _dataSharedService: DataSharedService,
        private _router: Router,
        public toastr: ToastsManager,
        private _profileBankService: ProfileBankService,
        private _masterService: MastersService) {
        this.profile = new CandidateProfile();
    }
    routerOnActivate() {
        this.getIncompleteProfiles();
    }
    /** Get ALL incomplte profiles to bind */
    getIncompleteProfiles() {
        console.log('API integration is pending');
        try {
            this._allProfilesService.getAllProfiles(this.incompleteProfilesList.GrdOperations)
                .subscribe(
                (results: any) => {
                    if (results.Profiles !== undefined && results.Profiles.length > 0) {
                        this.incompleteProfilesList = <AllCandidateProfiles>results;
                    } else { this.NORECORDSFOUND = true; }
                },
                error => this.errorMessage = <any>error);
        } catch (error) {
            this.incompleteProfilesList = new AllCandidateProfiles();
        }
    }
    /** START Pagination and sorting functionality */

    setPaginationValues() {
        //this.CandidateProfiles.GrdOperations.
        this.CandidateProfiles.GrdOperations.ButtonClicked = 0;
        this.CandidateProfiles.GrdOperations.PerPageCount = 3;
    }
    OnPaginationClick(ButtonClicked: string) {
        this.incompleteProfilesList.GrdOperations.ButtonClicked = parseInt(ButtonClicked);
        this.getIncompleteProfiles();
    }
    onChange() {
        this.incompleteProfilesList.GrdOperations.ButtonClicked = 0;
        this.incompleteProfilesList.GrdOperations.NextPageUrl = new Array<string>();
        this.getIncompleteProfiles();
    }
    getColumnsForSorting() {
        this._profileBankService.getColumsForSorting('ALLPROFILES')
            .subscribe(
            (results: any) => {
                this.ColumnList = results;
            },
            error => this.toastr.error(<any>error));
    }
    /** END Pagination and sorting functionality */
}
