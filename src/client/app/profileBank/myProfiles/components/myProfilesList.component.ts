import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import { MyProfilesInfo, Masters,Response } from '../model/myProfilesInfo';
import { MyProfilesService } from '../services/myProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES,AlertComponent } from 'ng2-bootstrap';


@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-list',
    templateUrl: 'myProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES,AlertComponent],
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
    IsSuccess: boolean = false;
    public alerts = new Array<Object>();

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

public closeAlert(i: number): void {
        this.alerts.splice(i, 1);
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
        this._router.navigate(['/App/ProfileBank/MyProfiles/View/' + CandidateID]);
    }

    onSave(): void {
        this._myProfilesService.addCandidateProfile(this.profile)
            .subscribe(
            results => {
                var result =  results as Response;
                if(result.StatusCode === '1') {
                    this.alerts.push({ msg: result.Message, type: 'success', closable: true });
                    this.getMyProfiles();
                }else {
                    this.alerts.push({ msg: result.ErrorMsg, type: 'danger', closable: true });
                }
                this.profile = new MyProfilesInfo();
            },
            error => this.errorMessage = <any>error);
    }

    public psdTemplateSelectionHandler(fileInput: any) {
        console.log(fileInput);
        let FileList: FileList = fileInput.target.files;
        this.psdTemplates.length = 0;
        for (let i = 0, length = FileList.length; i < length; i++) {
            this.psdTemplates.push(FileList.item(i));
            console.log(FileList.item(i));
        }
        console.log(this.psdTemplates);
        console.log('Length : '+this.psdTemplates.length);
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
                 var result =  results as Response;
                if(result.StatusCode === '1') {
                    this.alerts.push({ msg: result.Message, type: 'success', closable: true });
                    this.getMyProfiles();
                }else {
                    this.alerts.push({ msg: result.ErrorMsg, type: 'danger', closable: true });
                }
                this.profile.Status = new Masters();
            },
            error => this.errorMessage = <any>error);
        this.isCollapsed = false;
    }

    closeUpdatePanel() {
        this.isCollapsed = false;
    }
}


