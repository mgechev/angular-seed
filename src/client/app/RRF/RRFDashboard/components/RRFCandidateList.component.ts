import {Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, RouteSegment, Router } from '@angular/router';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import { RRFDashboardService } from '../services/rrfDashboard.service';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
//import { APIResult, RRFAssignStatus } from  '../../../shared/constantValue/index';
//import { MasterData, ResponseFromAPI } from '../../../shared/model/common.model';
import { CandidateProfile } from  '../../../ProfileBank/shared/model/myProfilesInfo';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
//import {CAROUSEL_DIRECTIVES} from 'ng2-bootstrap';
import {RRFCandidateListService} from '../services/RRFCandidatesList.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-candidate-list',
    templateUrl: 'RRFCandidateList.component.html',
    directives: [ROUTER_DIRECTIVES, CHART_DIRECTIVES],
    styleUrls: ['RRFDashboard.component.css'],
    providers: [ToastsManager]
})

export class RRFCandidateListComponent implements OnActivate {
    RRFID: string;
    Candidate: string = 'Jhone DEF';
    doughnutChartLabels: string[] = [];
    doughnutChartData: number[] = [];
    doughnutChartType: string = 'doughnut'; //doughnut
    doughnutChartColors: any[] = [{ backgroundColor: [] }];
    doughnutChartOptions: any = {
        animation: false,
        responsive: true
    };
    errorMessage: string;
    Candidates: Array<CandidateProfile>;
   
    constructor(private _myRRFService: MyRRFService,
        private _router: Router,
        private _rrfDashboardService: RRFDashboardService,
        private _mastersService: MastersService,
        private _rrfCandidatesList: RRFCandidateListService,
        public toastr: ToastsManager) {
        this.Candidates = new Array<CandidateProfile>();
    }

    routerOnActivate(segment: RouteSegment) {
        this.RRFID = segment.getParam('id');
        this.doughnutChartLabels = ['Technical 1', 'HR'];
        this.doughnutChartData = [50, 50];
        this.doughnutChartColors = [{ backgroundColor: ['#E9EF0B', '#32c5d2'] }];

        //TODO : Call API to get Candidates Specific to SelectedRRF
        //  this.getCanidatesForRRF();

    }
    onScheduleInterviewClick() {
        localStorage.setItem('RRFID', this.RRFID);
        this._router.navigate(['/App//Recruitment Cycle/Schedule']);
    }

    chartClicked(e: any): void {
        console.log(e);
    }

    chartHovered(e: any): void {
        console.log(e);
    }

    getCanidatesForRRF() {
        this._rrfCandidatesList.getCandidatesForRRF(this.RRFID)
            .subscribe(
            results => {
                this.Candidates = <any>results;
            },
            error => this.errorMessage = <any>error);
    }

    getCandidatesRoundHistory(CandidateID: string) {
        console.log('Inside Rounds History');
    }

    showPopOver() {
        let row :any = $('#round');
        row.popover({
            placement: 'bottom',
            toggle: 'popover',
            title: 'Comments',
            html: true,
            trigger: 'hover',
            content: this.Candidate
        });
    }
}
