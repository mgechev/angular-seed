import {Component} from '@angular/core';
import {OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import { RRFDetails, RRFApproval} from '../../myRRF/models/rrfDetails';
import { RRFApprovalService } from '../services/rrfApproval.service';
import { RRFStatus } from  '../../../shared/constantValue/index';
import { APIResult } from  '../../../shared/constantValue/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ResponseFromAPI } from '../../../shared/model/common.model';

@Component({
    moduleId: module.id,
    selector: 'rrf-approval-list',
    templateUrl: 'RRFApprovalList.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['RRFApproval.component.css'],
    providers: [ToastsManager]
})

export class RRFApprovalListComponent implements OnActivate {
    rrfApprovalList: RRFDetails[] = [];
    errorMessage: string;
    comment: string;
    selectedRowCount: number = 0;
    allChecked: boolean = false;
    statusConstant: RRFStatus = RRFStatus;

    constructor(private _rrfApprovalService: RRFApprovalService,
        public toastr: ToastsManager) {
    }

    routerOnActivate(): void {
        this.getRRFApprovalList();
    }

    getRRFApprovalList(): void {
        this._rrfApprovalService.getRRFApprovalList()
            .subscribe(
            results => {
                this.rrfApprovalList = <any>results;

                for (var index = 0; index < this.rrfApprovalList.length; index++) {
                    // this.rrfApprovalList[index].Status = {'Id' :1 ,'Value' :'PendingApproval'}; //TODO : get it from API
                    this.rrfApprovalList[index].IsChecked = false;
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
        if (this.selectedRowCount === this.rrfApprovalList.length) {
            this.allChecked = true;
        } else {
            this.allChecked = false;
        }
    }

    onAllSelect(e: any): void {
        var state: boolean;
        if (e.target.checked) {
            state = true;
            this.selectedRowCount = this.rrfApprovalList.length;
        } else {
            state = false;
            this.selectedRowCount = 0;
        }
        for (var index = 0; index < this.rrfApprovalList.length; index++) {
            if (+this.rrfApprovalList[index].Status.Id !== +RRFStatus.Rejected) {
                this.rrfApprovalList[index].IsChecked = state;
            }
        }
    }

    onStatusHold(): void {
        //TODO use ID
        this.onStatusChange('On-Hold');
    }

    onStatusReject(): void {
        this.onStatusChange('Rejected');
        this.getRRFApprovalList();
    }

    onStatusApprove(): void {
        this.onStatusChange('Approved');
        this.getRRFApprovalList();
    }

    onStatusChange(status: string): void {
        var _selectedRrfDetailsList = new Array<RRFDetails>();
        for (var index = 0; index < this.rrfApprovalList.length; index++) {
            if (this.rrfApprovalList[index].IsChecked) {
                this.rrfApprovalList[index].Status.Value = status;
                this.rrfApprovalList[index].IsChecked = false;
                this.rrfApprovalList[index].Comment = this.comment;

                //:: Create object of RRF details and send object to api
                var _rrfDetails: RRFDetails = new RRFDetails();
                _rrfDetails.RRFID = this.rrfApprovalList[index].RRFID;
                //:: Created Approval list object
                var _rrfApprovalList: RRFApproval = new RRFApproval();
                _rrfApprovalList.Status = status;
                _rrfApprovalList.Comments = this.comment;
                //:: Adding Prepared object in array list
                _rrfDetails.RRFApproval.push(_rrfApprovalList);
                _selectedRrfDetailsList.push(_rrfDetails);
                //Removed:: Added bulk approval service call
                //this.ActionOnRaisedRRF(this.rrfApprovalList[index].RRFID, 1, this.comment);
            }
            //this.rrfApprovalList 
            this.selectedRowCount = 0;
        }
        console.log(_selectedRrfDetailsList);
        //:: Because required bulk approval service call
        this.ActionOnRaisedRRFBulk(_selectedRrfDetailsList);
        this.comment = '';
        this.allChecked = false;
        this.getRRFApprovalList();
    }
    //Raised RRF Bulk approval service call
    ActionOnRaisedRRFBulk(_selectedRrfList: RRFDetails[]): void {
        this._rrfApprovalService.ActionOnRaisedBulk(_selectedRrfList)
            .subscribe(
            results => {
                if (+ (<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message, 'Success!');
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => this.errorMessage = <any>error);
    }
    //Raised RRF single approval service call
    ActionOnRaisedRRF(rrfID: string,
        status: number,
        comment: string): void {
        this._rrfApprovalService.ActionOnRaisedRRF(rrfID, status, comment)
            .subscribe(
            results => {
                if (+ (<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message, 'Success!');
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => this.errorMessage = <any>error);
    }

    getPriorityClass(priority: string): string {
        return 'priority' + priority;
    }

    getStatusClass(statusID: number): string {
        return 'status' + statusID;
    }
}
