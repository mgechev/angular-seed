import { Component, Input} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { InterviewApproval } from './model/interviewApproval';
import { InterviewApprovalService } from './service/interviewApproval.service';
import { MasterData, GrdOptions, ResponseFromAPI} from '../../../../shared/model/common.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../../shared/constantValue/index';
import { InterviewApprovalGridRowComponent } from  '../InterviewApprovalGridRow/InterviewApprovalGridRow.component';
import {  TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'interview-approval',
    templateUrl: 'InterviewApproval.component.html',
    directives: [ROUTER_DIRECTIVES ,InterviewApprovalGridRowComponent ,TOOLTIP_DIRECTIVES],
    providers: [InterviewApprovalService, ToastsManager]
})

export class InterviewApprovalComponent {

    interviewApproval: InterviewApproval[] = [];
    errorMessage: string = '';
    grdOptions: GrdOptions = new GrdOptions();
    allChecked: boolean = false;
    selectedRowCount: number = 0;
    isRecordFound: boolean = false;
    comment: string = '';

    constructor(private _interviewApprovalService: InterviewApprovalService,
        public toastr: ToastsManager) {
        this.getListOfInterviewReqApproval();
    }

    getListOfInterviewReqApproval() {
        this._interviewApprovalService.getListOfInterviewReqApproval(this.grdOptions)
            .subscribe(
            (results: any) => {
                this.grdOptions = (<any>(results)).GrdOperations;
                if (results.AllInterviews !== undefined && results.AllInterviews.length > 0) {
                    this.interviewApproval = (<any>(results)).AllInterviews;
                    for (var index = 0; index < this.interviewApproval.length; index++) {
                        this.interviewApproval[index].IsChecked = false;
                    }
                    this.isRecordFound = true;
                } else {
                    this.interviewApproval = [];
                    this.isRecordFound = false;
                }
            },
            error => this.errorMessage = <any>error);
    }
    onStateChange(e: any): void {
        if (e.target.checked) {
            this.selectedRowCount++;
        } else {
            this.selectedRowCount--;
        }
        if (this.selectedRowCount === this.interviewApproval.length) {
            this.allChecked = true;
        } else {
            this.allChecked = false;
        }
    }

    onAllSelect(e: any): void {
        var state: boolean;
        if (e.target.checked) {
            state = true;
            this.selectedRowCount = this.interviewApproval.length;
        } else {
            state = false;
            this.selectedRowCount = 0;
        }
        for (var index = 0; index < this.interviewApproval.length; index++) {

            this.interviewApproval[index].IsChecked = state;

        }
    }

    onInterviewApprove() {
        this.updateInterviewStatus('Approved');
    }


    onInterviewReject() {
        this.updateInterviewStatus('Rejected');
    }

    updateInterviewStatus(status: string) {
        var tempData: InterviewApproval[] = [];
        for (var index = 0; index < this.interviewApproval.length; index++) {

            if (this.interviewApproval[index].IsChecked) {
                this.interviewApproval[index].Status = status;
                this.interviewApproval[index].Comments = this.comment;
                tempData.push(this.interviewApproval[index]);
            }
        }

        if (tempData.length > 0) {
            this.updateInterviewStatusBulk(tempData);
        }
    }

    updateInterviewStatusBulk(_selectedInterview: InterviewApproval[]): void {
        this._interviewApprovalService.UpdateInterviewStatus(_selectedInterview)
            .subscribe(
            results => {
                if (+ (<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
                this.getListOfInterviewReqApproval();
                this.comment = '';
                this.allChecked = false;
            },
            error => this.errorMessage = <any>error);
    }

}

