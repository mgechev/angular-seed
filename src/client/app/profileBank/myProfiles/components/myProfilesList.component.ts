import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import { CandidateProfile, ResumeMeta, AddCandidateResponse } from '../../shared/model/myProfilesInfo';
import { MyProfilesService } from '../services/myProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { CollapseDirective, TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService} from  '../../shared/services/profileBank.service';
//import {MyProfilesFilterPipe} from './myProfiles.component.pipe';
import { Headers, Http } from '@angular/http';
import { Candidate } from '../../shared/model/RRF';


@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-list',
    templateUrl: 'myProfilesList.component.html',
    directives: [ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES],
    styleUrls: ['myProfiles.component.css'],
})

export class MyProfilesListComponent implements OnActivate {
    myProfilesList: Array<CandidateProfile>;
    profile: CandidateProfile;
    errorMessage: string;
    status: number;
    psdTemplates: any;
    resumeFiles: any;
    statusList: Array<MasterData>;
    seletedCandidateID: string;
    selectedStatus = new MasterData();
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
    seletedCandidateIDForUpload: string;
    highlightRow: string;
    public file: File;
    public url: string;
    headers: Headers;
    isUploadPanelCollapsed: boolean = false;
    resumeUploaded: boolean = false;
    resumeName: string;
    Candidate: Candidate;
    selectedCandidates: Array<Candidate>;

    constructor(private _myProfilesService: MyProfilesService,
        private http: Http,
        private _router: Router,
        private _profileBankService: ProfileBankService,
        public toastr: ToastsManager,
        private _masterService: MastersService) {
        this.psdTemplates = new Array<File>();
        this.resumeFiles = new Array<File>();
        this.profile = new CandidateProfile();
        this.resumeMeta = new ResumeMeta();
        this.selectedCandidates = new Array<Candidate>();
        this.Candidate = new Candidate();
    }

    routerOnActivate() {
        this.getMyProfiles();
        this.getCandidateStatuses();
    }

    SaveCandidateID(id: string) {
        this.seletedCandidateID = id;

        var index = _.findIndex(this.myProfilesList, { CandidateID: this.seletedCandidateID });
        // this.profile.Comments = this.allProfilesList[index].Comments;
        // this.profile.Status = this.allProfilesList[index].Status;
        this.currentCandidate = this.myProfilesList[index].Candidate;
        this._profileBankService.getStatusById(id)
            .subscribe(
            (results: any) => {
                this.profile.Comments = results.Comments;
                this.profile.Status = results.Status;
            },
            error => this.toastr.error(<any>error));
        if (this.isCollapsed === false)
            this.isCollapsed = !this.isCollapsed;
        if (this.isCommentsPanelCollapsed === true)
            this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;
        if (this.isUploadPanelCollapsed === true)
            this.isUploadPanelCollapsed = !this.isUploadPanelCollapsed;
        window.scrollTo(0, 40);
    }

    getMyProfiles() {
        this._myProfilesService.getMyProfiles()
            .subscribe(
            (results: any) => {
                if (results.length !== undefined) {
                    this.myProfilesList = <any>results;
                }
            },
            error => this.errorMessage = <any>error);
    }

    redirectToView(CandidateID: number) {
        this._router.navigate(['/App/ProfileBank/MyProfiles/View/' + CandidateID]);
    }

    onSave(): void {
        if (this.chkValidations()) {
            if (this.fileName === '' || this.fileName === undefined) {
                this._myProfilesService.addCandidateProfile(this.profile)
                    .subscribe(
                    results => {
                        if ((<AddCandidateResponse>results).StatusCode === APIResult.Success) {
                            this.getMyProfiles();
                            this.toastr.success((<ResponseFromAPI>results).Message);
                        } else {
                            this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                        }
                        this.profile = new CandidateProfile();
                    },
                    error => { this.errorMessage = <any>error; this.toastr.error(this.errorMessage) });
            } else {

                //If File is Uploaded then After Adding Candidate Call API to Upload File
                this._myProfilesService.addCandidateProfile(this.profile)
                    .subscribe(
                    results => {
                        if ((<AddCandidateResponse>results).StatusCode === APIResult.Success) {
                            this.uploadResume((<AddCandidateResponse>results).CandidateID, this.psdTemplates[0]);
                        } else {
                            this.toastr.error((<ResponseFromAPI>results).Message);
                        }
                        this.profile = new CandidateProfile();
                    },
                    error => { this.errorMessage = <any>error; this.toastr.error(this.errorMessage) });
            }
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

    uploadResume(CandidateLookupId: string, File: any) {
        this.resumeMeta.CandidateID = CandidateLookupId;
        this.resumeMeta.Overwrite = false;
        this.resumeMeta.Profile = File;
        this._myProfilesService.upload(this.resumeMeta).then(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.fileUploaded = false;
                    this.fileName = '';
                    this.getMyProfiles();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            (error: any) => this.errorMessage = <any>error);
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
        this.selectedStatus.Id = parseInt(statusId);
        this.selectedStatus.Value = null;
    }

    onUpdateStauts() {
        if (this.selectedStatus.Id === undefined)
            this.selectedStatus = this.profile.Status;
        this._profileBankService.updateCandidateStatus(this.seletedCandidateID, this.selectedStatus, this.profile.Comments)
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
        window.scrollTo(0, 40);
        if (this.isCommentsPanelCollapsed === false)
            this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;

        //If updateStatus or Resume row is open close those
        if (this.isCollapsed === true)
            this.isCollapsed = !this.isCollapsed;
        if (this.isUploadPanelCollapsed === true)
            this.isUploadPanelCollapsed = !this.isUploadPanelCollapsed;
    }

    closeCommentsPanel() {
        this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;
        this.highlightRow = '';
    }

    onSubmitFollowupComment() {
        //check if comment is actually updated regardless of spaces
        if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim()) {
            //Update Comments
            this._profileBankService.updateFollowUpComments(this.seletedCandidateIDForComments,
                this.profile.FollowUpComments.trim())
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getMyProfiles();
                        this.profile = new CandidateProfile();
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                    }
                },
                error => this.errorMessage = <any>error);
            this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;
            this.highlightRow = '';
        }

    }

    uploadFile(inputValue: any): void {
        try {
            let FileList: FileList = inputValue.target.files;
            this.psdTemplates.length = 0;
            for (let i = 0, length = FileList.length; i < length; i++) {
                this.psdTemplates.push(FileList.item(i));
                this.fileUploaded = true;
                this.fileName = FileList.item(i).name;
            }
        } catch (error) {
            document.write(error);
        }

    }

    postFile(inputValue: any): void {
        try {
            let FileList: FileList = inputValue.target.files;
            this.resumeFiles.length = 0;
            for (let i = 0, length = FileList.length; i < length; i++) {
                this.resumeFiles.push(FileList.item(i));
                this.resumeUploaded = true;
                this.resumeName = FileList.item(i).name;
            }
        } catch (error) {
            document.write(error);
        }

    }

    onClickUploadResume(CandidateId: string) {
        window.scrollTo(0, 40);
        this.seletedCandidateIDForUpload = CandidateId;
        var index = _.findIndex(this.myProfilesList, { CandidateID: this.seletedCandidateIDForUpload });
        this.profile.Candidate = this.myProfilesList[index].Candidate;
        if (this.isUploadPanelCollapsed === false)
            this.isUploadPanelCollapsed = !this.isUploadPanelCollapsed;
        //Close Other Panel
        if (this.isCollapsed === true)
            this.isCollapsed = !this.isCollapsed;
        if (this.isCommentsPanelCollapsed === true)
            this.isCommentsPanelCollapsed = !this.isCommentsPanelCollapsed;

    }

    closeUploadPanel() {
        this.isUploadPanelCollapsed = !this.isUploadPanelCollapsed;
    }
    onSubmitUploadResume() {
        this.uploadResume(this.seletedCandidateIDForUpload, this.resumeFiles[0]);
        this.resumeFiles = new Array<File>();
        this.resumeName = '';
        this.isUploadPanelCollapsed = !this.isUploadPanelCollapsed;
    }

    //Assign RRf 
    AssignRRFClick() {
        let chkStatus = false;
        for (var index = 0; index < this.myProfilesList.length; index++) {
            if (this.myProfilesList[index].IsChecked) {
                //Check for open / rejected Status
                if (this.myProfilesList[index].Status.Value.toLowerCase() === 'open' ||
                    this.myProfilesList[index].Status.Value.toLowerCase() === 'rejected') {
                    //Add to selectedCandidates array
                    this.Candidate.CandidateID = this.myProfilesList[index].CandidateID;
                    this.Candidate.Candidate = this.myProfilesList[index].Candidate;
                    this.selectedCandidates.push(this.Candidate);
                    this.Candidate = new Candidate();
                } else {
                    chkStatus = true;
                    break;
                }
            }
        }
        if (chkStatus) {
            this.toastr.warning('Only Open / Rejected status candidates can be Assigned to RRF');
        } else {
            sessionStorage.setItem('Candidates', JSON.stringify(this.selectedCandidates));
            sessionStorage.setItem('returnPath', '/App/ProfileBank/MyProfiles');
            this._router.navigate(['/App/ProfileBank/MyProfiles/Assign']);
        }
    }
}


