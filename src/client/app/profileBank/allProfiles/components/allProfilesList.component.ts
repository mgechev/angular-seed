import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router } from '@angular/router';
import {CandidateProfile, GridOperations, AllCandidateProfiles} from '../../shared/model/myProfilesInfo';
import { AllProfilesService } from '../services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
//import { RMSGridComponent } from '../../../shared/components/rmsGrid/rmsGrid.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { DataSharedService } from '../../shared/services/DataShared.service';
import { ProfileBankService } from '../../shared/services/profilebank.service';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ProfileFilterPipe, ProfileStatusFilterPipe, ProfileNoticePeriodFilterPipe,
    ProfileExpectedSalaryFilterPipe, ProfileSalaryFilterPipe} from './allProfilesPipe.component';
//import {CalendarComponent} from  '../../../shared/components/calendar/calendar';

@Component({
    moduleId: module.id,
    selector: 'rrf-allprofiles-list',
    templateUrl: 'allProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES, PAGINATION_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    pipes: [ProfileFilterPipe, ProfileSalaryFilterPipe, ProfileStatusFilterPipe
        , ProfileNoticePeriodFilterPipe, ProfileExpectedSalaryFilterPipe]
})


export class AllProfilesListComponent implements OnActivate {
    allProfilesList: Array<CandidateProfile>;
    AllCheckedItemIds: Array<string> = new Array<string>();
    allProfilesList_1: Array<CandidateProfile>;
    profile: CandidateProfile;
    statusList: Array<MasterData>;
    seletedCandidateID: string;
    selectedStatus = new MasterData();
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate: string;
    selectedRowCount: number = 0;
    allChecked: boolean = false;
    isCollapsed: boolean = false;
    isAuthourized: boolean = false;
    currentUser: MasterData = new MasterData();
    url: any;
    CandidateProfiles: AllCandidateProfiles = new AllCandidateProfiles();
    //Pagination 
    grdOptions = new GridOperations();
    public maxSize: number = 3;

    constructor(private _allProfilesService: AllProfilesService,

        private _dataSharedService: DataSharedService,
        private _router: Router,
        public toastr: ToastsManager,
        private _profileBankService: ProfileBankService,
        private _masterService: MastersService) {
        this.profile = new CandidateProfile();
        this.allProfilesList = new Array<CandidateProfile>();

    }

    routerOnActivate() {
        this.setPaginationValues();
        this.getLoggedInUser();
        //this.getAllProfiles();
        this.getAllProfiles_1();
        this.getCandidateStatuses();
    }

    setPaginationValues() {
        this.CandidateProfiles.GrdOperations.ButtonClicked = 0;
        this.CandidateProfiles.GrdOperations.PerPageCount = 3;
    }
    getLoggedInUser() {
        this._profileBankService.getCurrentLoggedInUser()
            .subscribe(
            (results: MasterData) => {
                this.currentUser = results;
            },
            error => this.errorMessage = <any>error);
    }

    getAllProfiles() {
        try {
            this._allProfilesService.getAllProfiles()
                .subscribe(
                (results: any) => {
                    if (results.length !== undefined) {
                        this.allProfilesList = <Array<CandidateProfile>>results;
                        //this.allProfilesList_1 = <Array<CandidateProfile>>results;
                    }
                },
                error => this.errorMessage = <any>error);
        } catch (error) {
            this.allProfilesList = new Array<CandidateProfile>();
        }

    }
    //Method for With Pagination
     getAllProfiles_1() {
        try {
            this._allProfilesService.getOpenProfiles(this.CandidateProfiles.GrdOperations)
                .subscribe(
                (results: any) => {
                    if (results.Profiles.length !== undefined) {
                        this.CandidateProfiles = <AllCandidateProfiles>results;
                    }
                },
                error => this.errorMessage = <any>error);
        } catch (error) {
            this.allProfilesList = new Array<CandidateProfile>();
        }

    }
    redirectToView(CandidateID: string) {
        this._router.navigate(['/App/ProfileBank/AllProfiles/View/' + CandidateID]);
    }

    redirectToEditProfile(CandidateID: string) {
        this._router.navigate(['/App/ProfileBank/AllProfiles/Edit/' + CandidateID]);
    }

    SaveCandidateID(id: string) {
        this.seletedCandidateID = id;

        var index = _.findIndex(this.allProfilesList, { CandidateID: this.seletedCandidateID });
        this.currentCandidate = this.allProfilesList[index].Candidate;
        this._profileBankService.getStatusById(id)
            .subscribe(
            (results: any) => {
                this.profile.Comments = results.Comments;
                this.profile.Status = results.Status;
            },
            error => this.toastr.error(<any>error));

        //Auto Scroll up
        window.scrollTo(0, 40);
        if (this.isCollapsed === false)
            this.isCollapsed = !this.isCollapsed;
    }

    getCandidateStatuses() {
        this._masterService.getCandidateStatuses()
            .subscribe(
            results => {
                this.statusList = results;
            }, error => {
                this.toastr.error(<any>error);
            });

    }

    onSelectStatus(statusId: string) {
        this.selectedStatus.Id = parseInt(statusId);
        this.selectedStatus.Value = null;
    }

    onUpdateStauts() {
        if (this.selectedStatus.Id === undefined)
            this.selectedStatus = this.profile.Status;
        this._profileBankService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.profile.Comments)
            .subscribe(
            (results: ResponseFromAPI) => {
                if (results.StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    console.log((<ResponseFromAPI>results).Message);
                    this.profile.Status = new MasterData();
                    this.getAllProfiles();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => this.toastr.error(<any>error));
        this.isCollapsed = false;
    }

    closeUpdatePanel() {
        this.isCollapsed = false;
    }
    onStateChange(e: any): void {
        if (e.target.checked) {
            this.selectedRowCount++;
        } else {
            this.selectedRowCount--;
        }

        if (this.selectedRowCount === this.allProfilesList.length) {
            this.allChecked = true;
        } else {
            this.allChecked = false;
        }
    }

    onAllSelect(e: any): void {
        var state: boolean;
        if (e.target.checked) {
            state = true;
            this.selectedRowCount = this.allProfilesList.length;
        } else {
            state = false;
            this.selectedRowCount = 0;
        }

        for (var index = 0; index < this.allProfilesList.length; index++) {
            this.allProfilesList[index].IsChecked = state;
        }
    }

    openMailWindow() {
        var mailto: string = '';
        for (var index = 0; index < this.allProfilesList.length; index++) {
            if (this.allProfilesList[index].IsChecked) {
                mailto = mailto + this.allProfilesList[index].Email + ';';
                this.allProfilesList[index].IsChecked = false;
            }
            this.selectedRowCount = 0;
        }
        this.allChecked = false;
        window.location.href = 'mailto:' + mailto;
    }

    transferOwnerShipClick() {
        // let checkedItemIds: Array<string> = new Array<string>();
        // for (var index = 0; index < this.allProfilesList.length; index++) {
        //     if (this.allProfilesList[index].IsChecked) {
        //         checkedItemIds.push(this.allProfilesList[index].CandidateID);
        //     }
        // }
        for (var index = 0; index < this.CandidateProfiles.Profiles.length; index++) {
            if (this.CandidateProfiles.Profiles[index].IsChecked) {
                this.AllCheckedItemIds.push(this.CandidateProfiles.Profiles[index].CandidateID);
            }
        }
        if (this.AllCheckedItemIds.length > 0) {
            this._dataSharedService.setCheckedItems(this.AllCheckedItemIds);
            this._router.navigate(['/App/ProfileBank/AllProfiles/Transfer/']);
        }
    }

    getEditAccess(Owner: MasterData) {
        try {
            if (Owner.Id === this.currentUser.Id) {
                return false;
            } else { return true; }
        } catch (error) {
            this.toastr.error(error);
            return false;
        }

    }

    getResume(CandidateID: string) {
        this._profileBankService.getResumeById(CandidateID)
            .subscribe(
            (results: any) => {
                this.url = results;
            },
            error => this.toastr.error(<any>error));
    }

    OnPaginationClick(ButtonClicked: string) {
        /* ButtonClicked 
                i. Initial - 0
                ii.Next - 1
                iii.Prev - (-1)
            PerPageCount = No of items shown per page
                */
        this.CandidateProfiles.GrdOperations.ButtonClicked = parseInt(ButtonClicked);
        this.CandidateProfiles.GrdOperations.PerPageCount = 3;
        this.getAllProfiles_1();
    }
}

