import {Component  } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, RouteSegment } from '@angular/router';
//import { RRFDetails, AssignmentDetails } from '../../myRRF/models/rrfDetails';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import { RRFDashboardService } from '../services/rrfDashboard.service';
//import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { MastersService } from '../../../shared/services/masters.service';
//import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
//import { APIResult, RRFAssignStatus } from  '../../../shared/constantValue/index';
//import { MasterData, ResponseFromAPI } from '../../../shared/model/common.model';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CAROUSEL_DIRECTIVES} from 'ng2-bootstrap';


@Component({
    moduleId: module.id,
    selector: 'rrf-candidate-list',
    templateUrl: 'RRFCandidateList.component.html',
    directives: [ROUTER_DIRECTIVES, CHART_DIRECTIVES, CAROUSEL_DIRECTIVES],
    styleUrls: ['RRFDashboard.component.css'],
    providers: [ToastsManager]
})

export class RRFCandidateListComponent implements OnActivate {
    RRFId: string;
    Candidate: 'Jhone DEF';
    doughnutChartLabels: string[] = []
    doughnutChartData: number[] = [];
    doughnutChartType: string = 'doughnut'; //doughnut
    doughnutChartColors: any[] = [{ backgroundColor: [] }];
    doughnutChartOptions: any = {
        animation: false,
        responsive: true
    };
    public myInterval: number = 5000;
    public noWrapSlides: boolean = false;
    public slides: Array<any> = [];

    constructor(private _myRRFService: MyRRFService,
        private _rrfDashboardService: RRFDashboardService,
        private _mastersService: MastersService,
        public toastr: ToastsManager) {

    }

    routerOnActivate(segment: RouteSegment) {
        this.RRFId = segment.getParam('id');
        this.doughnutChartLabels = ['Technical 1', 'HR'];
        this.doughnutChartData = [50, 50];
        this.doughnutChartColors = [{ backgroundColor: ['#E9EF0B', '#32c5d2'] }];

        for (let i = 0; i < 4; i++) {
            this.addSlide();
        }
        this.slides[0].active=true;
        // this.GetRecruiter();
        // this.getRRFDetails(this.RRFId);
        // this.UnAssignRec.AssignedTo = new MasterData();
    }

    chartClicked(e: any): void {
        console.log(e);
    }

    chartHovered(e: any): void {
        console.log(e);
    }

    public addSlide(): void {
        let newWidth = this.slides.length + 1;
        this.slides.push({
            InterViewwr: 'InterViewer : ABCD '+newWidth,
            Status : 'Status : Selected'
        });
    }
}
