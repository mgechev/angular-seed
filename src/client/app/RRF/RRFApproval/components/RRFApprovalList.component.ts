import {Component} from '@angular/core';
import {OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import { RRFDetails } from '../../myRRF/models/rrfDetails';
import { RRFApprovalService } from '../services/rrfApproval.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-approval-list',
    templateUrl: 'RRFApprovalList.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['RRFApproval.component.css']
})

export class RRFApprovalListComponent implements OnActivate {
    rrfApprovalList: RRFDetails[] = [];
    errorMessage: string;
    comment: string;
    selectedRowCount: number = 0;
    allChecked: boolean = false;

    constructor(private _rrfApprovalService: RRFApprovalService) {
    }

    routerOnActivate(): void {
        this.getRRFApprovalList('admin', 1);
    }

    getRRFApprovalList(userName: string, roleID: number): void {
        this._rrfApprovalService.getRRFApprovalList(userName, roleID)
            .subscribe(
            results => {
                this.rrfApprovalList = <any>results;

                for (var index = 0; index < this.rrfApprovalList.length; index++) {
                    this.rrfApprovalList[index].Status = {'Id' :1 ,'Value' :'PendingApproval'}; //TODO : get it from API
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
            this.rrfApprovalList[index].IsChecked = state;
        }
    }

    onStatusHold(): void {
        //TODO use ID
        this.onStatusChange('On-Hold');
    }

    onStatusReject(): void {
        this.onStatusChange('Rejected');
    }

    onStatusApprove(): void {
        this.onStatusChange('Approved');
    }

    onStatusChange(status: string): void {
        for (var index = 0; index < this.rrfApprovalList.length; index++) {
            if (this.rrfApprovalList[index].IsChecked) {
                this.rrfApprovalList[index].Status.Value = status;
                this.rrfApprovalList[index].IsChecked = false;
                this.rrfApprovalList[index].Comment = this.comment;

                //TODO : status value
                this.ActionOnRaisedRRF(this.rrfApprovalList[index].RRFID, 1, this.comment);
            }
            this.comment = '';
            this.selectedRowCount = 0;
        }
        this.allChecked = false;
    }

    ActionOnRaisedRRF(rrfID: number,
        status: number,
        comment: string): void {
        this._rrfApprovalService.ActionOnRaisedRRF(rrfID, status, comment)
            .subscribe(
            error => this.errorMessage = <any>error);
    }
}
