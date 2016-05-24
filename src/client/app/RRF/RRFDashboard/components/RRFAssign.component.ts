import {Component, AfterViewInit, AfterContentInit  } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, RouteSegment } from '@angular/router';
import { RRFDetails, AssignmentDetails, MasterData } from '../../myRRF/models/rrfDetails';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import { RRFDashboardService } from '../services/rrfDashboard.service';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { MastersService } from '../../../shared/services/masters.service';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';

@Component({
    selector: 'rrf-assign',
    templateUrl: 'app/RRF/RRFDashboard/components/RRFAssign.component.html',
    directives: [ROUTER_DIRECTIVES, DATEPICKER_DIRECTIVES, SELECT_DIRECTIVES]
})

export class RRFAssignComponent implements OnActivate, AfterViewInit, AfterContentInit {
    selectedRRF: RRFDetails = new RRFDetails();
    errorMessage: string;
    Id: number;
    recruiterDtls: MasterData[];
    AssignedComments: string = '';
    unAssignRowVisible: boolean = false;
    UnAssignRec: AssignmentDetails = new AssignmentDetails();
    unAssignedComments: string = '';
    public currentDate: Date = new Date();

    constructor(private _myRRFService: MyRRFService,
        private _rrfDashboardService: RRFDashboardService,
        private _mastersService: MastersService) {
    }

    routerOnActivate(segment: RouteSegment) {
        this.Id = +segment.getParam('id');
        this.GetRecruiter();
        this.getRRFDetails(this.Id);
        this.UnAssignRec.AssignedTo = new MasterData();
    }

    ngAfterViewInit() {
        //$('.date-picker').datepicker();
        $('#cmbAssignTo').select2();
    }

    ngAfterContentInit() {
        // Component content has been initialized
        $('#cmbAssignTo').select2();
    }

    getRRFDetails(rrfID: number): void {
        this._myRRFService.getRRFDetails(rrfID)
            .subscribe(
            results => {
                this.selectedRRF = results;
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
        this._rrfDashboardService.saveRRFAssignmentDeatils(this.Id, selectedRec, this.AssignedComments)
            .subscribe(
            results => {
                // if (results.StatusCode === 1) {
                //     for (var index = 0; index < selectedRec.length; index++) {
                //     var assignmentDetails: AssignmentDetails = new AssignmentDetails();
                //     assignmentDetails.RRFID =this.Id;
                //     assignmentDetails.AssignedTo.Id = selectedRec[index];
                //     assignmentDetails.AssignedComments =this.AssignedComments;
                //     assignmentDetails.AssignedDate = new Date();
                //     this.selectedRRF.AssignedData.push(assignmentDetails);
                //     }
                // }
                this.getRRFDetails(this.Id); //TODO
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
        setTimeout(function() {
            $('#cmbAssignTo').select2();
        }, 20);

    }



    onUnAssignRRF(): void {
        this._rrfDashboardService.unassignRRF(this.Id, this.UnAssignRec.AssignedTo.Id, this.unAssignedComments)
            .subscribe(
            results => {
                if (results.StatusCode === 1) { //TODO
                    this.unAssignRowVisible = false;
                    this.UnAssignRec = new AssignmentDetails();
                    this.unAssignedComments = '';
                    $('#cmbAssignTo').select2();
                    this.getRRFDetails(this.Id); //TODO
                }
            },
            error => this.errorMessage = <any>error);
    }
}
