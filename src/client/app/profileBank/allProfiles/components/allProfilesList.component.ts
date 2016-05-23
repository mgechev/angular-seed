import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router } from '@angular/router';
import {MyProfilesInfo, Masters} from '../../myProfiles/model/myProfilesInfo';
import { AllProfilesService } from '../services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective,TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';


@Component({
    moduleId: module.id,
    selector: 'rrf-allprofiles-list',
    templateUrl: 'allProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES,CollapseDirective,TOOLTIP_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class AllProfilesListComponent implements OnActivate {
    allProfilesList: Array<MyProfilesInfo>;
    statusList: Array<Masters>;
    seletedCandidateID: number;
    selectedStatus: Masters;
    Comments: string;
    currentStatus: number;
    errorMessage: string;
    currentCandidate:string;

    public isCollapsed:boolean = false;
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
                this.allProfilesList = <any>results;
            },
            error => this.errorMessage = <any>error);
    }

    redirectToView(CandidateID: number) {
        this._router.navigate(['/App/ProfileBank/AllProfiles/View/' + CandidateID]);
    }

    SaveCandidateID(id: number) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.allProfilesList, { CandidateID: this.seletedCandidateID });
        this.Comments = this.allProfilesList[index].Comments;
        this.currentStatus = this.allProfilesList[index].Status[0].Id;
        this.currentCandidate = this.allProfilesList[index].Candidate;
         if(this.isCollapsed === false)
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
        for (var i = 0; i < this.statusList.length; i++) {
            if (this.statusList[i].Id === parseInt(statusId)) {
                this.selectedStatus = this.statusList[i];
            }
        }
    }

     onUpdateStauts() {
        if (this.selectedStatus === undefined) {
            var index = _.findIndex(this.allProfilesList, { CandidateID: this.seletedCandidateID });
            this.selectedStatus = this.allProfilesList[index].Status[0];
        }
        this._allProfilesService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.Comments)
            .subscribe(
            results => {
                this.getAllProfiles();
            },
            error => this.errorMessage = <any>error);
        this.isCollapsed = false;
    }

    closeUpdatePanel() {
           this.isCollapsed = false;
    }
}

