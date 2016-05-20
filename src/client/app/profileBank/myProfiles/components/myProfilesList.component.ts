import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import { MyProfilesInfo, Masters } from '../model/myProfilesInfo';
import { MyProfilesService } from '../services/myProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-list',
    templateUrl: 'myProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['myProfiles.component.css'],
})

export class MyProfilesListComponent implements OnActivate {
    myProfilesList: Array<MyProfilesInfo>;
    profile: MyProfilesInfo;
    errorMessage: string;
    status: number;
    psdTemplates: any;
    statusList: Array<Masters>;
    seletedCandidateID: number;
    selectedStatus: Masters;
    Comments:string;
    currentStatus : number;
    constructor(private _myProfilesService: MyProfilesService,
        private _router: Router,
        private _masterService: MastersService) {
        this.psdTemplates = new Array<File>();
         this.profile = new MyProfilesInfo();
    }

    routerOnActivate() {
     //   $('[data-toggle="tooltip"]').tooltip();

        this.getMyProfiles();
        this.getCandidateStatuses();
    }

    SaveCandidateID(id : number) {
        this.seletedCandidateID = id;
        var index = _.findIndex(this.myProfilesList, { CandidateID: this.seletedCandidateID });
        this.Comments = this.myProfilesList[index].Comments;
        this.currentStatus = this.myProfilesList[index].Status[0].Id;
    }

    getMyProfiles() {
        this._myProfilesService.getMyProfiles()
            .subscribe(
            results => {
                this.myProfilesList = results;
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
        for (var i = 0; i < this.statusList.length; i++) {
            if (this.statusList[i].Id === parseInt(statusId)) {
                this.selectedStatus = this.statusList[i];
            }
        }
    }

    onUpdateStauts() {
         this._myProfilesService.updateCandidateStatus(this.seletedCandidateID,this.selectedStatus,this.Comments)
            .subscribe(
            results => {
               // $('#myModal').modal('toggle');
               alert('Status updated sucessfully');
                this.getMyProfiles();
            },
            error => this.errorMessage = <any>error);
    }
}


