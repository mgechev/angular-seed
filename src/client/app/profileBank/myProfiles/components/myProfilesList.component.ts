import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import { MyProfilesInfo, Masters } from '../model/myProfilesInfo';
import { MyProfilesService } from '../services/myProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-list',
    templateUrl: 'myProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES],
    styleUrls: ['myProfiles.component.css']
})

export class MyProfilesListComponent implements OnActivate {
    myProfilesList: Array<MyProfilesInfo>;
    profile: MyProfilesInfo;
    errorMessage: string;
    status: number;
    psdTemplates: any;
    statusList: Array<Masters>;
    seletedCandidateID: number;
    selectedStatus: number;
    Comments: string;
    currentStatus: number;
    currentCandidate: string;

    public isCollapsed: boolean = false;
    constructor(private _myProfilesService: MyProfilesService,
        private _router: Router,
        private _masterService: MastersService) {
        this.psdTemplates = new Array<File>();
        this.profile = new MyProfilesInfo();
        this.profile.Status = new Masters();
    }

    routerOnActivate() {
        this.getMyProfiles();
        this.getCandidateStatuses();
    }

    SaveCandidateID(id: number) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.myProfilesList, { CandidateID: this.seletedCandidateID });
        this.profile.Comments = this.myProfilesList[index].Comments;
        this.profile.Status = this.myProfilesList[index].Status;
        this.currentCandidate = this.myProfilesList[index].Candidate;
        if (this.isCollapsed === false)
            this.isCollapsed = !this.isCollapsed;
    }

    getMyProfiles() {
        this._myProfilesService.getMyProfiles()
            .subscribe(
            results => {
                this.myProfilesList = <any>results;
            },
            error => this.errorMessage = <any>error);
    }

    redirectToView(CandidateID: number) {
        this._router.navigate(['App/ProfileBank/MyProfiles/View/' + CandidateID]);
    }

    onSave(): void {
        this._myProfilesService.addCandidateProfile(this.profile)
            .subscribe(
            results => {
                this.profile = new MyProfilesInfo();
                this.getMyProfiles();
            },
            error => this.errorMessage = <any>error);
    }

    public psdTemplateSelectionHandler(fileInput: any) {
        console.log(fileInput);
        let FileList: FileList = fileInput.target.files;
        this.psdTemplates.length = 0;
        for (let i = 0, length = FileList.length; i < length; i++) {
            this.psdTemplates.push(FileList.item(i));
        }
        console.log(this.psdTemplates);
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
        this._myProfilesService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.profile.Comments)
            .subscribe(
            results => {
                this.profile.Status = new Masters();
                this.getMyProfiles();
            },
            error => this.errorMessage = <any>error);
        this.isCollapsed = false;
    }

    closeUpdatePanel() {
        this.isCollapsed = false;
    }
}


