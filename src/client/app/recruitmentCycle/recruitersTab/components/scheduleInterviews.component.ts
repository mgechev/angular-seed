import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RecruiterScheduleInterviewService} from '../index';
import {InterviewsList} from '../index';
import { GrdOptions } from  '../../../shared/model/index';

@Component({
    moduleId: module.id,
    selector: 'show-schedule-interviews',
    templateUrl: 'scheduleInterviews.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class ScheduleInterviewsForRecruitersComponent implements OnActivate {
    currentView: string = 'myInterviews';
    NORECORDSFOUND: boolean = false;
    mode: string;
    errorMessage: string;
    InterviewDetailsList: InterviewsList = new InterviewsList();
    constructor(private _recruitersInterviewService: RecruiterScheduleInterviewService,
        private toastr: ToastsManager) {
        this.currentView = 'myInterviews';
    }

    routerOnActivate() {
        this.getMyScheduleInterviewsData();
    }
    onViewChanged(viewMode: string) {
        // this.InterviewDetailsList.GrdOperations = new GrdOptions();
        this.resetToDefaultGridOptions();
        this.InterviewDetailsList.GrdOperations.OrderBy = 'Modified';
        this.InterviewDetailsList.GrdOperations.Order = 'asc';
        this.InterviewDetailsList.GrdOperations.PerPageCount = 5;
        //Clear RRF List
        this.InterviewDetailsList = new InterviewsList();

        if (viewMode === 'allInterviews') {
            this.currentView = 'allInterviews';
            this.getAllScheduleInterviewsData();
        } else if (viewMode === 'myInterviews') {
            this.currentView = 'myInterviews';
            this.getMyScheduleInterviewsData();
        }
    }
    resetToDefaultGridOptions() {
        this.InterviewDetailsList.GrdOperations = new GrdOptions();
        this.InterviewDetailsList.GrdOperations.ButtonClicked = 0;
        this.InterviewDetailsList.GrdOperations.NextPageUrl = [];
    }
    getAllScheduleInterviewsData() {
      
        this.NORECORDSFOUND = false;
        this._recruitersInterviewService.getAllInterviews(this.InterviewDetailsList.GrdOperations)
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
    getMyScheduleInterviewsData() {

        this.NORECORDSFOUND = false;
        this._recruitersInterviewService.getMyInterviews(this.InterviewDetailsList.GrdOperations)
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

        if (this.currentView === 'allInterviews') {
            //this.currentView = 'allInterviews';
            this.getAllScheduleInterviewsData();
        } else if (this.currentView === 'myInterviews') {
            //this.currentView = 'myInterviews';
            this.getMyScheduleInterviewsData();
        }
    }
}
