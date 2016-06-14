import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import { MyProfilesInfo, ResumeMeta, AddCandidateResponse } from '../model/myProfilesInfo';
import { MyProfilesService } from '../services/myProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';

@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-list',
    templateUrl: 'myProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES],
    styleUrls: ['myProfiles.component.css'],
})

export class MyProfilesListComponent implements OnActivate {
    myProfilesList: Array<MyProfilesInfo>;
    profile: MyProfilesInfo;
    errorMessage: string;
    status: number;
    psdTemplates: any;
    statusList: Array<MasterData>;
    seletedCandidateID: number;
    selectedStatus: number;
    Comments: string;
    currentStatus: number;
    currentCandidate: string;
    selectedRowCount: number = 0;
    allChecked: boolean = false;
    isCollapsed: boolean = false;
    IsSuccess: boolean = false;
    resumeMeta: ResumeMeta;
    fileUploaded: boolean = false;
    fileName: string;
    searchString: string;
    isCommentsPanelCollapsed: boolean = false;
    seletedCandidateIDForComments: string;
    highlightRow :string ;
    constructor(private _myProfilesService: MyProfilesService,
        private _router: Router,
        public toastr: ToastsManager,
        private _masterService: MastersService) {
        this.psdTemplates = new Array<File>();
        this.profile = new MyProfilesInfo();
        this.resumeMeta = new ResumeMeta();
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
        this._router.navigate(['/App/ProfileBank/MyProfiles/View/' + CandidateID]);
    }

    onSave(): void {
        if (this.chkValidations()) {
            this._myProfilesService.addCandidateProfile(this.profile)
                .subscribe(
                results => {
                    if ((<AddCandidateResponse>results).StatusCode === APIResult.Success) {
                        this.uploadResume((<AddCandidateResponse>results).candidateLookupId);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                    }
                    this.profile = new MyProfilesInfo();
                },
                error => this.errorMessage = <any>error);
        } else {
            this.toastr.error('Please enter one of field : PassportNumber / PANNumber /AadhaarCardNo');
        }
    }

    chkValidations(): boolean {
        if ((this.profile.PassportNumber !== undefined && this.profile.PassportNumber !== '') ||
            (this.profile.PANNumber !== undefined && this.profile.PANNumber !== '') ||
            (this.profile.AadharCardNo !== undefined && this.profile.AadharCardNo !== '')) {
            return true;
        } else { return false; }
    }

    uploadResume(CandidateLookupId: string) {
        this.resumeMeta.CandidateLookupId = CandidateLookupId;
        this.resumeMeta.Overwrite = false;
        this.resumeMeta.Profile = this.psdTemplates[0];
        this._myProfilesService.UploadCandidateProfile(this.resumeMeta)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.getMyProfiles();
                    this.fileUploaded = false;
                    this.fileName = '';
                    this.profile = new MyProfilesInfo();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => this.errorMessage = <any>error);
    }

    public uploadFile(fileInput: any) {
        console.log(fileInput);
        let FileList: FileList = fileInput.target.files;
        this.psdTemplates.length = 0;
        for (let i = 0, length = FileList.length; i < length; i++) {
            this.psdTemplates.push(FileList.item(i));
            this.fileUploaded = true;
            this.fileName = FileList.item(i).name;
        }
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
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.profile.Status = new MasterData();
                    this.getMyProfiles();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
                this.profile.Status = new MasterData();
            },
            error => this.errorMessage = <any>error);
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

        if (this.selectedRowCount === this.myProfilesList.length) {
            this.allChecked = true;
        } else {
            this.allChecked = false;
        }
    }

    onAllSelect(e: any): void {
        var state: boolean;
        if (e.target.checked) {
            state = true;
            this.selectedRowCount = this.myProfilesList.length;
        } else {
            state = false;
            this.selectedRowCount = 0;
        }

        for (var index = 0; index < this.myProfilesList.length; index++) {
            this.myProfilesList[index].IsChecked = state;
        }
    }

    openMailWindow() {
        var mailto: string = '';
        for (var index = 0; index < this.myProfilesList.length; index++) {
            if (this.myProfilesList[index].IsChecked) {
                mailto = mailto + this.myProfilesList[index].Email + ';';
                this.myProfilesList[index].IsChecked = false;
            }
            this.selectedRowCount = 0;
        }
        this.allChecked = false;
        window.location.href = 'mailto:' + mailto;
    }

    onClickFollowUpComments(id: string) {
        this.seletedCandidateIDForComments = id;
        var index = _.findIndex(this.myProfilesList, { CandidateID: this.seletedCandidateIDForComments });
        this.profile.Candidate = this.myProfilesList[index].Candidate;
        this.profile.FollowUpComments = this.myProfilesList[index].FollowUpComments;
        this.profile.PreviousFollowupComments = this.profile.FollowUpComments;
        this.highlightRow = 'selectedRowColor';
        if (this.isCommentsPanelCollapsed === false)
            this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;
    }

    closeCommentsPanel() {
        this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;
          this.highlightRow = '';
    }

    onSubmitFollowupComment() {
        //check if comment is actually updated regardless of spaces
        if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim()) {
            //Update Comments
            this._myProfilesService.updateFollowUpComments( this.seletedCandidateIDForComments,
             this.profile.FollowUpComments.trim())
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getMyProfiles();
                        this.profile = new MyProfilesInfo();
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                    }
                },
                error => this.errorMessage = <any>error);
            this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;
             this.highlightRow = '';
        }

    }

}


