import {Component, OnInit, AfterViewInit, AfterContentInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RRFDetails, AssignmentDetails } from '../../myRRF/models/rrfDetails';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import { RRFDashboardService } from '../services/rrfDashboard.service';
//import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { MastersService } from '../../../shared/services/masters.service';
//import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult, RRFAssignStatus } from  '../../../shared/constantValue/index';
import { MasterData, ResponseFromAPI } from '../../../shared/model/common.model';
import {RRFGridRowComponent} from '../../shared/components/RRFGridRow/RRFGridRow.component';


@Component({
    moduleId: module.id,
    selector: 'rrf-assign',
    templateUrl: 'RRFAssign.component.html',
    //directives: [ROUTER_DIRECTIVES, DATEPICKER_DIRECTIVES, SELECT_DIRECTIVES, RRFGridRowComponent],
    styleUrls: ['../../shared/css/RRF.component.css'],
    providers: [ToastsManager]
})

export class RRFAssignComponent implements OnInit, AfterViewInit, AfterContentInit {
    selectedRRF: RRFDetails = new RRFDetails();
    errorMessage: string;
    RRFId: MasterData = new MasterData();
    recruiterDtls: MasterData[];
    AssignedComments: string = '';
    unAssignRowVisible: boolean = false;
    UnAssignRec: AssignmentDetails = new AssignmentDetails();
    unAssignedComments: string = '';
    public currentDate: Date = new Date();
    AssignStatus: RRFAssignStatus = RRFAssignStatus;

    constructor(private _myRRFService: MyRRFService,
        private activatedRoute: ActivatedRoute,
        private _rrfDashboardService: RRFDashboardService,
        private _mastersService: MastersService,
        public toastr: ToastsManager) {
    }

    ngOnInit() {
        var params = this.activatedRoute.snapshot.params['id'];
        //var params = segment.getParam('id');
        if (params) {
            this.RRFId.Id = parseInt(params.split('ID')[1]);
            this.RRFId.Value = params.split('ID')[0];
        }
        //this.RRFId = segment.getParam('id');
        // this.GetRecruiter();
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

    getRRFDetails(rrfID: MasterData): void {
        this._myRRFService.getRRFDetails(rrfID.Value)
            .subscribe(
            results => {
                this.selectedRRF = <any>results;
                this.selectedRRF.assignedData = new Array();
                for (var index = 0; index < results.AssignedData.length; index++) {
                    if (results.AssignedData[index].Status.Value === 'Assigned') {
                        this.selectedRRF.assignedData.push(results.AssignedData[index]);
                    }
                }
                if (this.selectedRRF.assignedData === undefined) {
                    var assignmentDetails: AssignmentDetails = new AssignmentDetails();
                    this.selectedRRF.assignedData = new Array();
                    this.selectedRRF.assignedData.push(assignmentDetails);
                }
                this.GetRecruiter();
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

        if (!this.isFormValidate()) {
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

    isFormValidate() {
        if ($('#cmbAssignTo').val() === null) {
            this.toastr.error('Please select assign To value');
            return false;
        }
        if ($('#txtAssigningComment').val() === "") {
            this.toastr.error('Please select Assigning Comment');
            return false;
        }
        return true;
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
        this._rrfDashboardService.unassignRRF(this.RRFId, this.UnAssignRec.AssignedTo, this.unAssignedComments)
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

    isAlreadyAssigned(recuiterId: number): boolean {
        if (this.selectedRRF.AssignedData === undefined) {
            return false;
        }

        for (var index = 0; index < this.selectedRRF.AssignedData.length; index++) {
            if (this.selectedRRF.AssignedData[index].AssignedTo.Id == recuiterId) {
                if (this.selectedRRF.AssignedData[index].Status.Id === RRFAssignStatus.Assigned) {
                    return true;
                }
            }
        }
        return false;
    }
}
