import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router } from '@angular/router';
import {MyProfilesInfo} from '../../myProfiles/model/myProfilesInfo';
import { AllProfilesService } from '../services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { RMSGridComponent } from '../../../shared/components/rmsGrid/rmsGrid.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { DataSharedService } from '../../shared/services/DataShared.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-allprofiles-list',
    templateUrl: 'allProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES, RMSGridComponent],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})


export class AllProfilesListComponent implements OnActivate {


    allProfilesList: Array<MyProfilesInfo>;
    profile: MyProfilesInfo;
    statusList: Array<MasterData>;
    seletedCandidateID: number;
    selectedStatus: number;
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate: string;
    selectedRowCount: number = 0;
    allChecked: boolean = false;
    isCollapsed: boolean = false;


    constructor(private _allProfilesService: AllProfilesService,
        private _dataSharedService: DataSharedService,
        private _router: Router,
        public toastr: ToastsManager,
        private _masterService: MastersService) {
        this.profile = new MyProfilesInfo();
        this.profile.Status = new MasterData();
    }

    routerOnActivate() {
        this.getAllProfiles();
        this.getCandidateStatuses();
    }

    getAllProfiles() {

        this._allProfilesService.getAllProfiles()
            .subscribe(
            (results: any) => {
                this.allProfilesList = <Array<MyProfilesInfo>>results;
            },
            error => this.errorMessage = <any>error);
    }

    redirectToView(CandidateID: number) {
        this._router.navigate(['/App/ProfileBank/AllProfiles/View/' + CandidateID]);
    }

    SaveCandidateID(id: number) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.allProfilesList, { CandidateID: this.seletedCandidateID });
        this.profile.Comments = this.allProfilesList[index].Comments;
        this.profile.Status = this.allProfilesList[index].Status;
        this.currentCandidate = this.allProfilesList[index].Candidate;
        if (this.isCollapsed === false)
            this.isCollapsed = !this.isCollapsed;
    }

    getCandidateStatuses() {
        this._masterService.getCandidateStatuses()
            .subscribe(
            results => {
                this.statusList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onSelectStatus(statusId: string) {
        this.selectedStatus = parseInt(statusId);
    }

    onUpdateStauts() {
        this._allProfilesService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.profile.Comments)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.profile.Status = new MasterData();
                    this.getAllProfiles();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
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
        let checkedItemIds: Array<string> = new Array<string>();
        for (var index = 0; index < this.allProfilesList.length; index++) {
            if (this.allProfilesList[index].IsChecked) {
                checkedItemIds.push(this.allProfilesList[index].CandidateID);
            }
        }
        this._dataSharedService.setCheckedItems(checkedItemIds);
        this._router.navigate(['/App/ProfileBank/AllProfiles/Transfer/']);
    }
}
