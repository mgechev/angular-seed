import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RRFReScheduleInterviewService} from '../services/RRFReScheduleInterviews.service';
import {InterviewsList, CandidateRRFID} from '../../../recruitmentCycle/recruitersTab/index';
import { GrdOptions, MasterData } from  '../../../shared/model/index';
import { AllScheduleInterviewPipe } from  '../../..//recruitmentCycle/recruitersTab/index';
@Component({
    moduleId: module.id,
    selector: 'show-re-schedule-interviews',
    templateUrl: 'RRFReScheduleInterviews.component.html',
    //directives: [ROUTER_DIRECTIVES],
    providers: [ToastsManager],
    //pipes: [AllScheduleInterviewPipe]
})

export class RRFReScheduleInterviewsComponent implements OnInit {
    currentView: string = 'myReInterviews';
    NORECORDSFOUND: boolean = false;
    mode: string;
    RRFID: MasterData = new MasterData();
    errorMessage: string;
    InterviewDetailsList: InterviewsList = new InterviewsList();
    constructor(private _rrfReScheduleInterviewService: RRFReScheduleInterviewService,
        private toastr: ToastsManager,
        private activatedRoute: ActivatedRoute,
        private _router: Router) {
        this.currentView = 'myReInterviews';
    }

    ngOnInit() {
        var _paras = this.activatedRoute.snapshot.params['id'];
        this.InterviewDetailsList.CandidateRRFIDs.RRFID.Id = parseInt((_paras).split('ID')[1]);
        this.InterviewDetailsList.CandidateRRFIDs.RRFID.Value = (_paras).split('ID')[0];
        this.RRFID = this.InterviewDetailsList.CandidateRRFIDs.RRFID;
        this.getMyReScheduleInterviewsData();
    }
    Back() {
        this._router.navigate(['/App/RRF/RRFDashboard']);
    }
    onViewChanged(viewMode: string) {

        //Clear RRF List
        this.InterviewDetailsList = new InterviewsList();
        this.InterviewDetailsList.CandidateRRFIDs.RRFID.Id = this.RRFID.Id;
        this.InterviewDetailsList.CandidateRRFIDs.RRFID.Value = this.RRFID.Value;
        // this.InterviewDetailsList.GrdOperations = new GrdOptions();
        this.resetToDefaultGridOptions();
        this.setGridOptions();

        if (viewMode === 'allReInterviews') {
            this.currentView = 'allReInterviews';
            this.getAllReScheduleInterviewsData();
        } else if (viewMode === 'myReInterviews') {
            this.currentView = 'myReInterviews';
            this.getAllReScheduleInterviewsData();
        }
    }
    resetToDefaultGridOptions() {
        this.InterviewDetailsList.GrdOperations = new GrdOptions();
        this.setGridOptions();
        this.InterviewDetailsList.GrdOperations.ButtonClicked = 0;
        this.InterviewDetailsList.GrdOperations.NextPageUrl = new Array<string>();
    }

    getAllReScheduleInterviewsData() {
        this.NORECORDSFOUND = false;
        this.setGridOptions();
        this._rrfReScheduleInterviewService.getAllRescheduleInterviews(this.InterviewDetailsList.GrdOperations,
            this.InterviewDetailsList.CandidateRRFIDs)
            .subscribe(
            (results: any) => {
                if (results.AllInterviews.length !== undefined && results.AllInterviews.length > 0) {
                    this.InterviewDetailsList = results;

                } else { this.NORECORDSFOUND = true; }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    getMyReScheduleInterviewsData() {

        this.NORECORDSFOUND = false;
        this.setGridOptions();
        this._rrfReScheduleInterviewService.getMyRescheduleInterviews(this.InterviewDetailsList.GrdOperations,
            this.InterviewDetailsList.CandidateRRFIDs)
            .subscribe(
            (results: any) => {
                if (results.AllInterviews.length !== undefined && results.AllInterviews.length > 0) {
                    this.InterviewDetailsList = results;
                } else { this.NORECORDSFOUND = true; }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
    onChange() {
        // this.InterviewDetailsList.GrdOperations.ButtonClicked = 0;
        // this.InterviewDetailsList.GrdOperations.NextPageUrl = new Array<string>();
        this.checkViewMode();
    }
    OnPaginationClick(ButtonClicked: string) {
        /* ButtonClicked 
                i. Initial - 0
                ii.Next - 1
                iii.Prev - (-1)
           PerPageCount = No of items shown per page
                */
        this.InterviewDetailsList.GrdOperations.ButtonClicked = parseInt(ButtonClicked);
        this.checkViewMode();
    }
    checkViewMode() {
        //Clear RRF List
        this.InterviewDetailsList.CandidateRRFIDs = new CandidateRRFID();
        this.InterviewDetailsList.CandidateRRFIDs.RRFID.Id = this.RRFID.Id;
        this.InterviewDetailsList.CandidateRRFIDs.RRFID.Value = this.RRFID.Value;
        // this.InterviewDetailsList.GrdOperations = new GrdOptions();
        //this.resetToDefaultGridOptions();//
        this.setGridOptions();

        if (this.currentView === 'allReInterviews') {
            this.getAllReScheduleInterviewsData();
        } else if (this.currentView === 'myReInterviews') {
            this.getMyReScheduleInterviewsData();
        }
    }
    setGridOptions() {
        this.InterviewDetailsList.GrdOperations.Order = 'desc';
        this.InterviewDetailsList.GrdOperations.OrderBy = 'Interview_x0020_ID';
    }
}
