import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RRFReScheduleInterviewService} from '../services/RRFReScheduleInterviews.service';
import {InterviewsList} from '../../../recruitmentCycle/recruitersTab/index';
import { GrdOptions } from  '../../../shared/model/index';

@Component({
    moduleId: module.id,
    selector: 'show-re-schedule-interviews',
    templateUrl: 'RRFReScheduleInterviews.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ToastsManager]
})

export class RRFReScheduleInterviewsComponent implements OnActivate {
    currentView: string = 'myReInterviews';
    NORECORDSFOUND: boolean = false;
    mode: string;
    errorMessage: string;
    InterviewDetailsList: InterviewsList = new InterviewsList();
    constructor(private _rrfReScheduleInterviewService: RRFReScheduleInterviewService,
        private toastr: ToastsManager) {
        this.currentView = 'myReInterviews';
    }

    routerOnActivate(segment: RouteSegment) {
        this.InterviewDetailsList.CandidateRRFIDs.RRFID.Id = parseInt((segment.getParam('id')).split('ID')[1]);
        this.InterviewDetailsList.CandidateRRFIDs.RRFID.Value = (segment.getParam('id')).split('ID')[0];
        this.getMyReScheduleInterviewsData();
    }
    onViewChanged(viewMode: string) {
        // this.InterviewDetailsList.GrdOperations = new GrdOptions();
        this.resetToDefaultGridOptions();
        this.InterviewDetailsList.GrdOperations.OrderBy = 'Modified';
        this.InterviewDetailsList.GrdOperations.Order = 'asc';
        this.InterviewDetailsList.GrdOperations.PerPageCount = 5;
        //Clear RRF List
        this.InterviewDetailsList = new InterviewsList();

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
        this.InterviewDetailsList.GrdOperations.ButtonClicked = 0;
        this.InterviewDetailsList.GrdOperations.NextPageUrl = [];
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
        this.InterviewDetailsList.GrdOperations.ButtonClicked = 0;
        this.InterviewDetailsList.GrdOperations.NextPageUrl = new Array<string>();
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
        this.InterviewDetailsList = new InterviewsList();

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
