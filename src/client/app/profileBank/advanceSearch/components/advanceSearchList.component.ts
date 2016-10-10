import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateProfile, ResumeMeta, AddCandidateResponse, AllCandidateProfiles, CareerProfile, MailDetails } from '../../shared/model/myProfilesInfo';
import { AdvanceSearchService } from '../services/advanceSearch.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
//import { CollapseDirective, TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';
import { MasterData, SortingMasterData, GrdOptions, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService} from  '../../shared/services/profileBank.service';
//import {MyProfilesFilterPipe} from './myProfiles.component.pipe';
import { Headers, Http } from '@angular/http';
import { Candidate } from '../../shared/model/RRF';
import { ProfileBankPipe }from '../../shared/filter/profileBank.pipe';
import { IfAuthorizeDirective} from '../../../shared/directives/ifAuthorize.directive';
import { DetailProfileComponent } from '../../shared/component/detailProfile.component';

@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-list',
    templateUrl: 'advanceSearchList.component.html',
    //directives: [DetailProfileComponent, ROUTER_DIRECTIVES, CollapseDirective, TOOLTIP_DIRECTIVES, IfAuthorizeDirective],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    //pipes: [ProfileBankPipe]
})

export class AdvanceSearchListComponent implements OnInit {
    params: string;
    inputsearchString: string = '';
    CandidateID: MasterData = new MasterData();
    myProfilesList: AllCandidateProfiles = new AllCandidateProfiles();
    profile: CandidateProfile;
    existedProfile: CandidateProfile;
    isExist: boolean = false;
    errorMessage: string;
    status: number;
    psdTemplates: any;
    resumeFiles: any;
    statusList: Array<MasterData>;
    seletedCandidateID: MasterData = new MasterData();
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
    seletedCandidateIDForComments: MasterData = new MasterData();
    seletedCandidateIDForUpload: MasterData = new MasterData();
    highlightRow: string;
    public file: File;
    public url: string;
    headers: Headers;
    isUploadPanelCollapsed: boolean = false;
    resumeUploaded: boolean = false;
    resumeName: string;
    Candidate: Candidate;
    selectedCandidates: Array<Candidate>;
    NORECORDSFOUND: boolean = false;
    ColumnList: Array<SortingMasterData> = new Array<SortingMasterData>();
    /***variables for Upload photo */
    uploadedPhoto: any;
    photoUploaded: boolean = false;
    photoName: string;
    photoMeta: ResumeMeta;
    profilePhoto: string;
    /** For profile picture */
    profilePic: any;

    constructor(private _advanceSearchService: AdvanceSearchService,
        private http: Http,
        private _router: Router,
        private activatedRoute: ActivatedRoute,
        private _profileBankService: ProfileBankService,
        public toastr: ToastsManager,
        private _masterService: MastersService) {
        this.psdTemplates = new Array<File>();
        this.resumeFiles = new Array<File>();
        this.profile = new CandidateProfile();
        this.profile.CandidateCareerProfile = new CareerProfile();
        this.resumeMeta = new ResumeMeta();
        this.selectedCandidates = new Array<Candidate>();
        this.Candidate = new Candidate();
        this.uploadedPhoto = new Array<File>();
        this.photoMeta = new ResumeMeta();
    }

    ngOnInit() {

        this.params = this.activatedRoute.snapshot.params['Id'];
        //this.params = segment.getParam('searchString');
        if (this.params) {
            this.inputsearchString = this.params.split('searchString')[0];
            this.getAdvanceSearchResult(this.inputsearchString);
        }
    }
    // This function will get all profiles according to search string
    getAdvanceSearchResult(insputString: string) {
        this._advanceSearchService.getAdvanceSearch(insputString)
            .subscribe(
            (results: any) => {
                if (results.Profiles !== null && results.Profiles !== undefined && results.Profiles.length > 0) {
                    this.myProfilesList = <any>results;

                } else { this.NORECORDSFOUND = true; }
            },
            error => this.errorMessage = <any>error);
    }
}


