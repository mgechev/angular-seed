import {Component} from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { RRFDashboardService } from '../services/rrfDashboard.service';
import { RRFDetails, AllRRFStatusCount  } from '../../myRRF/models/rrfDetails';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {RRFIDPipe } from '../../shared/Filters/RRFIdFilter.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult, RRFStatus, RRFAssignStatus} from  '../../../shared/constantValue/index';
import { MasterData, ResponseFromAPI, GrdOptions} from '../../../shared/model/common.model';
import {IfAuthorizeDirective} from '../../../shared/directives/ifAuthorize.directive';
import { MastersService } from '../../../shared/services/masters.service';
import {RRFPipe } from '../../shared/Filters/RRFFilter.component';

@Component({
    moduleId: module.id,
    selector: 'rrf-dashboard-list',
    templateUrl: 'RRFDashboardList.component.html',
    directives: [ROUTER_DIRECTIVES, CHART_DIRECTIVES, IfAuthorizeDirective],
    styleUrls: ['../../RRFApproval/components/RRFApproval.component.css'],
    pipes: [RRFIDPipe, RRFPipe],
    providers: [ToastsManager]
})

export class RRFDashboardListComponent implements OnActivate {

    rrfList: RRFDetails[] = [];
    errorMessage: string;
    selectedRRF: RRFDetails = new RRFDetails();
    isListVisible: boolean = true;
    rrfStatusCount: AllRRFStatusCount[] = [];
    currentView: string = 'myRRF';
    closeComment: string = '';
    closeRRF: boolean = false;
    closeRRFID: MasterData = new MasterData();
    isChartVisible: boolean = false;
    logedInUser: MasterData = new MasterData();
    recruiterList: MasterData[] = [];
    selectedRecruiter: MasterData = new MasterData();
    AssignStatus: RRFAssignStatus = RRFAssignStatus;
    grdOptions: GrdOptions = new GrdOptions();

    //required for pagination
    // showRecord: number = 5;
    // orderByRecord : string = "";
    // sortByRecord : string = "";
    //buttonClick: number = 0;

    doughnutChartLabels: string[] = [];
    doughnutChartData: number[] = [];
    doughnutChartType: string = 'doughnut'; //doughnut
    doughnutChartColors: any[] = [{ backgroundColor: [] }];
    doughnutChartOptions: any = {
        animation: false,
        responsive: true,
        legend: {
            onClick: function(event: any, legendItem: any) {
                //console.log("legend click");
            }
        }
    }
    constructor(private _rrfDashboardService: RRFDashboardService,
        private _myRRFService: MyRRFService, private _router: Router,
        public toastr: ToastsManager,
        private _mastersService: MastersService) {
        this.currentView = 'myRRF';
    }

    routerOnActivate() {
        this.getLoggedInUser();
        this.getMyRRFData();
        this.GetRecruiter();
        this.setDefaultcloseRRFID();
    }

    getMyRRFData() {
        this.getMyRRF();
        this.getStatuswiseMyRRFCount();
    }

    getAllRRFData() {
        this.getAllRRF();
        this.getStatuswiseRRFCount();
    }

    getAssignedRRFData() {
        this.GetRRFAssignedToRecruiter();
        // this.getStatuswiseAssignedRRFCount();
        this.isChartVisible = false;
    }

    getUnAssignedRRFData() {
        //this.getStatuswiseUnAssignedRRFCount();
        this.GetAllUnAssignedRRF();
        this.isChartVisible = false;
    }

    chartClicked(e: any): void {
        console.log(e);
    }

    chartHovered(e: any): void {
        console.log(e);
    }
    getAllRRF() {
        this._rrfDashboardService.getAllRRF(this.grdOptions)
            .subscribe(
            results => {
                this.grdOptions = (<any>(results)).GrdOperations;
                this.rrfList = (<any>(results)).RRFs;
            },
            error => this.errorMessage = <any>error);
    }

    getMyRRF() {
        this._rrfDashboardService.getMyRRF(this.grdOptions)
            .subscribe(
            results => {
                this.grdOptions = (<any>(results)).GrdOperations;
                this.rrfList = (<any>(results)).RRFs;
            },
            error => this.errorMessage = <any>error);
    }

    GetRRFAssignedToRecruiter() {
        this._rrfDashboardService.GetRRFAssignedToRecruiter(this.selectedRecruiter, this.grdOptions)
            .subscribe(
            results => {
                this.grdOptions = (<any>(results)).GrdOperations;
                this.rrfList = (<any>(results)).RRFs;
            },
            error => this.errorMessage = <any>error);
    }

    GetAllUnAssignedRRF() {
        this._rrfDashboardService.GetAllUnAssignedRRF(this.grdOptions)
            .subscribe(
            results => {
                this.grdOptions = (<any>(results)).GrdOperations;
                this.rrfList = (<any>(results)).RRFs;
            },
            error => this.errorMessage = <any>error);
    }


    getStatuswiseRRFCount() {
        this._rrfDashboardService.getStatuswiseRRFCount()
            .subscribe(
            results => {
                this.rrfStatusCount = <any>results;
                this.setValueToChart();
            },
            error => this.errorMessage = <any>error);
    }

    getStatuswiseMyRRFCount() {
        this._rrfDashboardService.getStatuswiseMyRRFCount()
            .subscribe(
            results => {
                this.rrfStatusCount = <any>results;
                this.setValueToChart();
            },
            error => this.errorMessage = <any>error);
    }

    getStatuswiseAssignedRRFCount() {
        this._rrfDashboardService.getStatuswiseAssignedRRFCount()
            .subscribe(
            results => {
                this.rrfStatusCount = <any>results;
                this.setValueToChart();
            },
            error => this.errorMessage = <any>error);

    }

    setValueToChart() {
        this.doughnutChartLabels = [];
        this.doughnutChartData = [];
        var chartColor: any[] = [];
        // doughnutChartColors: any[] = [{ backgroundColor: ["#E9EF0B", "#32c5d2" , "#e7505a" , "#c2cad8" , "#41ce29"] }];
        this.isChartVisible = false;
        for (var index = 0; index < this.rrfStatusCount.length; index++) {
            this.doughnutChartLabels.push(this.rrfStatusCount[index].Status.Value);
            this.doughnutChartData.push(this.rrfStatusCount[index].Count);
            chartColor.push(this.getChartColor(this.rrfStatusCount[index].Status.Id));
            this.isChartVisible = true;
        }
        this.doughnutChartColors[0].backgroundColor = chartColor;
    }

    getChartColor(statusID: number): string {
        switch (statusID) {
            case RRFStatus.PendingApproval:
                return '#E9EF0B';
            case RRFStatus.Open:
                return '#32c5d2';
            case RRFStatus.Rejected:
                return '#e7505a';
            case RRFStatus.Assigned:
                return '#c2cad8';
            case RRFStatus.Closed:
                return '#41ce29';
            default:
                return '';
        }
    }

    getRRFDetails(rrfID: MasterData) {
        this._myRRFService.getRRFDetails(rrfID.Value)
            .subscribe(
            (results: RRFDetails) => {
                this.selectedRRF = results;
            },
            error => this.errorMessage = <any>error);
    }

    showRRFDetails(rrfId: MasterData) {
        this.getRRFDetails(rrfId);
        //console.log(this.selectedRRF);
        this.isListVisible = false;
    }

    showListOfRRF() {
        this.isListVisible = true;
        if (this.currentView === 'allRRF') {
            this.getAllRRFData();
        } else if (this.currentView === 'myRRF') {
            this.getMyRRFData();
        } else if (this.currentView === 'unAssignRRF') {
            this.getUnAssignedRRFData();

        } else {
            // this.setDefaultValueToRecrCmb();
            this.getAssignedRRFData();
        }
    }

    onViewChanged(viewMode: string) {
        this.resetToDefaultGridOptions();
        if (viewMode === 'allRRF') {
            this.currentView = 'allRRF';
            this.getAllRRFData();
        } else if (viewMode === 'myRRF') {
            this.currentView = 'myRRF';
            this.getMyRRFData();
        } else if (viewMode === 'unAssignRRF') {
            this.currentView = 'unAssignRRF';
            this.getUnAssignedRRFData();
        } else {
            this.currentView = 'assignRRF';
            this.setDefaultValueToRecrCmb();
            this.getAssignedRRFData();
        }
    }

    onEditRRF(rrfID: number) {
        console.log(rrfID);
    }

    onCloseRRFClick(rrfID: MasterData) {
        this.closeRRF = true;
        this.closeRRFID = rrfID;
    }

    onbtnCloseRRF() {
        this._rrfDashboardService.closeRRF(this.closeRRFID, this.closeComment)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.rrfStatusCount = <any>results;
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
                this.showListOfRRF();
            },
            error => this.errorMessage = <any>error);

        // this.closeRRFID = 0;
        this.setDefaultcloseRRFID();
        this.closeComment = '';
    }

    setDefaultcloseRRFID() {
        this.closeRRFID.Id = 0;
        this.closeRRFID.Value = '';
    }

    onCancelCloseRRF() {
        //this.closeRRFID = 0;
        this.setDefaultcloseRRFID();
        this.closeComment = '';
    }

    getPriorityClass(priority: string): string {
        return 'priority' + priority;
    }

    getStatusClass(statusID: number): string {
        return 'status' + statusID;
    }


    checkIfRRFClosed(statusId: number) {
        try {
            if (statusId === RRFStatus.Closed) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    allowEditRRF(statusId: number, raisedBy: number) {
        try {
            if (raisedBy === this.logedInUser.Id && statusId === RRFStatus.PendingApproval) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    allowAssignRRF(statusId: number) {
        try {
            if (statusId === RRFStatus.Open || statusId === RRFStatus.Assigned) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    allowCloseRRF(statusId: number) {
        try {
            if (statusId === RRFStatus.Open || statusId === RRFStatus.Assigned) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return false;
        }
    }


    redirectToAssignRRF(rrfID: MasterData) {
        this._router.navigate(['/App/RRF/RRFDashboard/Assign/' + rrfID.Value + 'ID' + rrfID.Id]);
    }
    redirectToEditRRF(rrfID: MasterData) {
        this._router.navigate(['/App/RRF/MyRRF/Edit/' + rrfID.Value + 'ID' + rrfID.Id]);
    }

    onViewCandidateClick(rrfID: MasterData) {
        // rrfID = 'RRF6866237939ID76';
        this._router.navigate(['/App/RRF/RRFDashboard/Candidates/' + rrfID.Value + 'ID' + rrfID.Id]);
    }

    getLoggedInUser() {
        this._rrfDashboardService.getCurrentLoggedInUser()
            .subscribe(
            (results: MasterData) => {
                this.logedInUser = results;
            },
            error => this.errorMessage = <any>error);

    }

    GetRecruiter() {
        this._mastersService.GetRecruiter()
            .subscribe(
            results => {
                this.recruiterList = results;
            },
            error => this.errorMessage = <any>error);
    }

    setDefaultValueToRecrCmb() {
        this.selectedRecruiter.Id = 0;
        this.selectedRecruiter.Value = 'All';
    }

    onRecChange(recID: any) {
        this.selectedRecruiter.Id = recID;
        this.getAssignedRRFData();
    }

    resetToDefaultGridOptions() {
        //this.grdOptions = new GrdOptions();
        this.grdOptions.ButtonClicked = 0;
        this.grdOptions.NextPageUrl = [];
    }

    setGrdOptions() {
        // this.grdOptions.PerPageCount = this.showRecord; //TODO
        // this.grdOptions.ButtonClicked = this.buttonClick;
        //  this.grdOptions.Order = this.orderByRecord;
    }

    OnPaginationClick(page: number) {
        this.grdOptions.ButtonClicked = page;
        this.showListOfRRF();
    }
    bindGridData() {
        //First set grid option
        this.resetToDefaultGridOptions();

        //call APIResult
        this.showListOfRRF();
    }
}

