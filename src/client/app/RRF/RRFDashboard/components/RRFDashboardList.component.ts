import {Component} from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { RRFDashboardService } from '../services/rrfDashboard.service';
import { RRFDetails, AllRRFStatusCount  } from '../../myRRF/models/rrfDetails';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {RRFIDPipe } from './RRFIdFilter.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult, RRFStatus } from  '../../../shared/constantValue/index';
import { ResponseFromAPI } from '../../../shared/model/common.model';

@Component({
    moduleId: module.id,
    selector: 'rrf-dashboard-list',
    templateUrl: 'RRFDashboardList.component.html',
    directives: [ROUTER_DIRECTIVES, CHART_DIRECTIVES],
    styleUrls: ['../../RRFApproval/components/RRFApproval.component.css'],
    pipes: [RRFIDPipe],
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
    closeRRFID: number = 0;
    isChartVisible: boolean = false;

    doughnutChartLabels: string[] = []
    doughnutChartData: number[] = [];
    doughnutChartType: string = 'doughnut'; //doughnut
    doughnutChartColors: any[] = [{ backgroundColor: [] }];
    doughnutChartOptions: any = {
        animation: false,
        responsive: true
    };

    constructor(private _rrfDashboardService: RRFDashboardService,
        private _myRRFService: MyRRFService, private _router: Router,
        public toastr: ToastsManager) {
    }

    routerOnActivate() {
        this.getMyRRFData();
    }

    getMyRRFData() {
        this.getMyRRF();
        this.getStatuswiseMyRRFCount();
    }

    getAllRRFData() {
        this.getAllRRF();
        this.getStatuswiseRRFCount();
    }

    chartClicked(e: any): void {
        console.log(e);
    }

    chartHovered(e: any): void {
        console.log(e);
    }
    getAllRRF() {
        this._rrfDashboardService.getAllRRF()
            .subscribe(
            results => {
                this.rrfList = <any>results;
            },
            error => this.errorMessage = <any>error);
    }

    getMyRRF() {
        this._rrfDashboardService.getMyRRF()
            .subscribe(
            results => {
                this.rrfList = <any>results;
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

    getRRFDetails(rrfID: string) {
        this._myRRFService.getRRFDetails(rrfID)
            .subscribe(
            (results: RRFDetails) => {
                this.selectedRRF = results;
            },
            error => this.errorMessage = <any>error);
    }

    showRRFDetails(rrfId: string) {
        this.getRRFDetails(rrfId);
        console.log(this.selectedRRF);
        this.isListVisible = false;
    }

    showListOfRRF() {
        this.isListVisible = true;
    }

    onViewChanged(viewMode: string) {
        if (viewMode === 'AllRRF') {
            this.currentView = 'allRRF';
            this.getAllRRFData();
        } else {
            this.currentView = 'myRRF';
            this.getMyRRFData();
        }
    }

    onEditRRF(rrfID: number) {
        console.log(rrfID);
    }

    onCloseRRFClick(rrfID: number) {
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
            },
            error => this.errorMessage = <any>error);

        this.closeRRFID = 0;
        this.closeComment = '';

        if (this.currentView = 'allRRF') {
            this.getAllRRFData();
        } else {
            this.getMyRRFData();
        }
    }

    onCancelCloseRRF() {
        this.closeRRFID = 0;
        this.closeComment = '';
    }

    getPriorityClass(priority: string): string {
        return 'priority' + priority;
    }

    getStatusClass(statusID: number): string {
        return 'status' + statusID;
    }


    checkIfRRFClosed(status: string) {
        try {
            if (status.toLowerCase() === 'closed') {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    redirectToAssignRRF(rrfID: string) {
        this._router.navigate(['/App/RRF/RRFDashboard/Assign/' + rrfID]);
    }
    redirectToEditRRF(rrfID: string) {
        this._router.navigate(['/App/RRF/MyRRF/Edit/' + rrfID]);
    }

    onViewCandidateClick (rrfID: string) {
        this._router.navigate(['/App/RRF/RRFDashboard/Candidates/' + rrfID]);
    }

}

