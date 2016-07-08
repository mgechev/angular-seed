import {Component, AfterViewInit, AfterContentInit  } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, RouteSegment } from '@angular/router';
import { RRFDetails, AssignmentDetails } from '../../myRRF/models/rrfDetails';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import { RRFDashboardService } from '../services/rrfDashboard.service';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { MastersService } from '../../../shared/services/masters.service';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult, RRFAssignStatus } from  '../../../shared/constantValue/index';
import { MasterData, ResponseFromAPI } from '../../../shared/model/common.model';


@Component({
    moduleId: module.id,
    selector: 'rrf-assign',
    templateUrl: 'RRFAssign.component.html',
    directives: [ROUTER_DIRECTIVES, DATEPICKER_DIRECTIVES, SELECT_DIRECTIVES],
    styleUrls: ['../../RRFApproval/components/RRFApproval.component.css'],
    providers: [ToastsManager]
})

export class RRFAssignComponent implements OnActivate, AfterViewInit, AfterContentInit {
    selectedRRF: RRFDetails = new RRFDetails();
    errorMessage: string;
    RRFId: string;
    recruiterDtls: MasterData[];
    AssignedComments: string = '';
    unAssignRowVisible: boolean = false;
    UnAssignRec: AssignmentDetails = new AssignmentDetails();
    unAssignedComments: string = '';
    public currentDate: Date = new Date();
    AssignStatus: RRFAssignStatus = RRFAssignStatus;

    constructor(private _myRRFService: MyRRFService,
        private _rrfDashboardService: RRFDashboardService,
        private _mastersService: MastersService,
        public toastr: ToastsManager) {
    }

    routerOnActivate(segment: RouteSegment) {
        this.RRFId = segment.getParam('id');
        this.GetRecruiter();
        this.getRRFDetails(this.RRFId);
        this.UnAssignRec.AssignedTo = new MasterData();
    }

    ngAfterViewInit() {
        (<any>$('#cmbAssignTo')).select2();
    }

    ngAfterContentInit() {
        // Component content has been initialized
        (<any>$('#cmbAssignTo')).select2();
    }

    getRRFDetails(rrfID: string): void {
        this._myRRFService.getRRFDetails(rrfID)
            .subscribe(
            results => {
                this.selectedRRF = <any>results;
                if (this.selectedRRF.AssignedData === undefined) {
                    var assignmentDetails: AssignmentDetails = new AssignmentDetails();
                    this.selectedRRF.AssignedData = new Array();
                    this.selectedRRF.AssignedData.push(assignmentDetails);
                }
            },
            error => this.errorMessage = <any>error);
    }

    GetRecruiter(): void {
        this._mastersService.GetRecruiter()
            .subscribe(
            results => {
                this.recruiterDtls = results;
            },
            error => this.errorMessage = <any>error);
    }

    onAssignRRF(): void {
        if ($('#cmbAssignTo').val() === null) {
            return;
        }
        var selectedRec: number[] = $('#cmbAssignTo').val();
        // Creating array of selected Assignee
        var selectedRRFidsList: Array<MasterData> = new Array<MasterData>();
        for (var index = 0; index < selectedRec.length; index++) {
            var selectedRRF: MasterData = new MasterData();
            selectedRRF.Id = selectedRec[index];
            selectedRRF.Value = "";
            selectedRRFidsList.push(selectedRRF);
        }
        
        this._rrfDashboardService.saveRRFAssignmentDeatils(this.RRFId, selectedRRFidsList, this.AssignedComments)
        //this._rrfDashboardService.saveRRFAssignmentDeatils(this.RRFId, selectedRec, this.AssignedComments)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
                this.getRRFDetails(this.RRFId); //TODO
                this.AssignedComments = '';
                $('#cmbAssignTo').select2('val', '');
            },
            error => this.errorMessage = <any>error);
    }

    onUnassign(recdtls: AssignmentDetails): void {
        this.unAssignRowVisible = true;
        this.UnAssignRec = recdtls;
    }

    onUnAssignCancel(): void {
        this.unAssignRowVisible = false;
        this.UnAssignRec = new AssignmentDetails();
        setTimeout(function () {
            $('#cmbAssignTo').select2();
        }, 20);

    }

    onUnAssignRRF(): void {
        this._rrfDashboardService.unassignRRF(this.RRFId, this.UnAssignRec.AssignedTo.Id, this.unAssignedComments)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.unAssignRowVisible = false;
                    this.UnAssignRec = new AssignmentDetails();
                    this.unAssignedComments = '';
                    $('#cmbAssignTo').select2();
                    this.getRRFDetails(this.RRFId); //TODO
                    setTimeout(function () {
                        $('#cmbAssignTo').select2();
                    }, 20);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => this.errorMessage = <any>error);
    }

    getPriorityClass(priority: string): string {
        return 'priority' + priority;
    }
}
