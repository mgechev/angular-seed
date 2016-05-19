import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router } from '@angular/router';
import {MyProfilesInfo, Masters} from '../../myProfiles/model/myProfilesInfo';
import { AllProfilesService } from '../services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'rrf-allprofiles-list',
    templateUrl: 'allProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AllProfilesListComponent implements OnActivate {
    allProfilesList: Array<MyProfilesInfo>;
    statusList: Array<Masters>;
    seletedCandidateID: number;
    selectedStatus: Masters;
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    constructor(private _allProfilesService: AllProfilesService,
        private _router: Router,
        private _masterService: MastersService) {
    }

    routerOnActivate() {
        this.getAllProfiles();
        this.getCandidateStatuses();
    }

    getAllProfiles() {

        this._allProfilesService.getAllProfiles()
            .subscribe(
            results => {
                this.allProfilesList = results;
            },
            error => this.errorMessage = <any>error);
    }

    redirectToView(CandidateID: number) {
        this._router.navigate(['/ProfileBank/AllProfiles/View/' + CandidateID]);
    }

    SaveCandidateID(id: number) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.allProfilesList, { CandidateID: this.seletedCandidateID });
        this.Comments = this.allProfilesList[index].Comments;
        this.currentStatus = this.allProfilesList[index].Status[0].Id;
    }

    getCandidateStatuses() {
        this._masterService.getCandidateStatuses()
            .subscribe(
            results => {
                this.statusList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onSelectStatus(statusId: number) {
        for (var i = 0; i < this.statusList.length; i++) {
            if (this.statusList[i].Id === statusId) {
                this.selectedStatus = this.statusList[i];
            }
        }
    }

    onUpdateStauts() {
        this._allProfilesService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.Comments)
            .subscribe(
            results => {
                $('#myModal').modal('toggle');
                this.getAllProfiles();
            },
            error => this.errorMessage = <any>error);
    }
}

