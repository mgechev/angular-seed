import {Component} from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import { RRFDashboardService } from '../services/rrfDashboard.service';
import { RRFDetails, AllRRFStatusCount } from '../../myRRF/models/rrfDetails';
import { MyRRFService } from '../../myRRF/services/myRRF.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-dashboard-list',
    templateUrl: 'RRFDashboardList.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class RRFDashboardListComponent implements OnActivate {

    rrfList: RRFDetails[] = [];
    errorMessage: string;
    selectedRRF: RRFDetails = new RRFDetails();
    isListVisible: boolean = true;
    rrfStatusCount: AllRRFStatusCount = new AllRRFStatusCount();
    constructor(private _rrfDashboardService: RRFDashboardService,
        private _myRRFService: MyRRFService) {
    }

    routerOnActivate() {
        this.getAllRRF();
        this.getStatuswiseRRFCount();
    }

    getAllRRF() {
        this._rrfDashboardService.getAllRRF()
            .subscribe(
            results => {
                this.rrfList = results;
            },
            error => this.errorMessage = <any>error);
    }

    getStatuswiseRRFCount() {
        this._rrfDashboardService.getStatuswiseRRFCount()
            .subscribe(
            results => {
                this.rrfStatusCount = results;
            },
            error => this.errorMessage = <any>error);
    }


    getRRFDetails(rrfID: number) {
        this._myRRFService.getRRFDetails(rrfID)
            .subscribe(
            results => {
                this.selectedRRF = results;
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
        //console.log(viewMode);
        this.getAllRRF();
    }
}
