import {Component} from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import { RRFDashboardService } from '../services/rrfDashboard.service';
import { RRFDetails, AllRRFStatusCount } from '../../myRRF/models/rrfDetails';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
    moduleId: module.id,
    selector: 'rrf-dashboard-list',
    templateUrl: 'RRFDashboardList.component.html',
    directives: [ROUTER_DIRECTIVES, CHART_DIRECTIVES],
    styleUrls: ['../../RRFApproval/components/RRFApproval.component.css']
})

export class RRFDashboardListComponent implements OnActivate {

    rrfList: RRFDetails[] = [];
    errorMessage: string;
    selectedRRF: RRFDetails = new RRFDetails();
    isListVisible: boolean = true;
    rrfStatusCount: AllRRFStatusCount = new AllRRFStatusCount();
    currentView: string = 'myRRF';

    doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    doughnutChartData: number[] = [350, 450, 100];
    doughnutChartType: string = 'doughnut';

    public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string = 'pie';

    constructor(private _rrfDashboardService: RRFDashboardService,
        private _myRRFService: MyRRFService) {
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
            },
            error => this.errorMessage = <any>error);
    }

    getStatuswiseMyRRFCount() {
        this._rrfDashboardService.getStatuswiseMyRRFCount()
            .subscribe(
            results => {
                this.rrfStatusCount = <any>results;
            },
            error => this.errorMessage = <any>error);
    }

    getRRFDetails(rrfID: number) {
        this._myRRFService.getRRFDetails(rrfID)
            .subscribe(
            results => {
                this.selectedRRF = <any>results;
            },
            error => this.errorMessage = <any>error);
    }

    showRRFDetails(rrfId: number) {
        this.getRRFDetails(rrfId);
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

}

