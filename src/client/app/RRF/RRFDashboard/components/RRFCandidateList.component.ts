import {Component } from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES, RouteSegment, Router } from '@angular/router';
import { MyRRFService } from '../../myRRF/services/myRRF.service';
import { RRFDashboardService } from '../services/rrfDashboard.service';
import { MastersService } from '../../../shared/services/masters.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { MasterData, ResponseFromAPI} from '../../../shared/model/common.model';
import { CandidateProfile } from  '../../../profileBank/shared/model/myProfilesInfo';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
//import {CAROUSEL_DIRECTIVES} from 'ng2-bootstrap';
import {RRFCandidateListService} from '../services/RRFCandidatesList.service';
import {RRFSpecificCandidateList} from '../model/RRFCandidateList';
import {Interview} from '../../../recruitmentCycle/shared/model/interview';
import { RRFDetails } from '../../myRRF/models/rrfDetails';

@Component({
    moduleId: module.id,
    selector: 'rrf-candidate-list',
    templateUrl: 'RRFCandidateList.component.html',
    directives: [ROUTER_DIRECTIVES, CHART_DIRECTIVES],
    styleUrls: ['RRFDashboard.component.css'],
    providers: [ToastsManager]
})

export class RRFCandidateListComponent implements OnActivate {
    RRFID: MasterData = new MasterData();
    selectedRRF: RRFDetails;
    isNull: boolean = false;
    Candidate: string = 'Jhone DEF';
    doughnutChartLabels: string[] = [];
    doughnutChartData: number[] = [];
    doughnutChartType: string = 'doughnut'; //doughnut
    doughnutChartColors: any[] = [{ backgroundColor: [] }];
    doughnutChartOptions: any = {
        animation: false,
        responsive: true
    };
    isInterviewSchedule: boolean = false;
    errorMessage: string;
    Candidates: Array<CandidateProfile>;
    AllCandidatesForRRF: RRFSpecificCandidateList[];
    CandidateRoundHistory: Array<Interview>;
    isRoundHistoryPresent: boolean = false;
    selectedCandidate: string;
    InterviewID:MasterData = new MasterData();
    constructor(private _myRRFService: MyRRFService,
        private _router: Router,
        private _rrfDashboardService: RRFDashboardService,
        private _mastersService: MastersService,
        private _rrfCandidatesList: RRFCandidateListService,
        public toastr: ToastsManager) {
        this.Candidates = new Array<CandidateProfile>();
        this.AllCandidatesForRRF = new Array<RRFSpecificCandidateList>();
        this.CandidateRoundHistory = new Array<Interview>();
    }

    routerOnActivate(segment: RouteSegment) {
        this.RRFID.Id = parseInt((segment.getParam('id')).split('ID')[1]);
        this.RRFID.Value = (segment.getParam('id')).split('ID')[0];

        this.doughnutChartLabels = ['Technical 1', 'HR'];
        this.doughnutChartData = [50, 50];
        this.doughnutChartColors = [{ backgroundColor: ['#E9EF0B', '#32c5d2'] }];
        this.selectedRRF = new RRFDetails();
        //TODO : Call API to get Candidates Specific to SelectedRRF
        this.getCanidatesForRRF();
        this.getRRFDetails();

    }

    onScheduleInterviewClick(Candidate: any) {
        sessionStorage.setItem('RRFID', JSON.stringify(this.RRFID));
        sessionStorage.setItem('Candidate', JSON.stringify(Candidate));
        sessionStorage.setItem('Status', Candidate.InterviewDetails.Status);
        this._router.navigate(['/App/Recruitment Cycle/Schedule/New']);
    }

    chartClicked(e: any): void {
        console.log(e);
    }

    chartHovered(e: any): void {
        console.log(e);
    }
    //Get All Canidate List Along with Interview Data 
    getCanidatesForRRF() {
        this._rrfCandidatesList.getCandidatesForRRF(this.RRFID.Value)
            .subscribe(
            (results: any) => {
                if (results.length !== undefined) {
                    // this.AllCandidatesForRRF = results;
                    this.CheckInterviewStatus(results);
                } else {
                    //If No data present
                    this.isNull = true;
                }
            },
            error => this.errorMessage = <any>error);
    }

    getRRFDetails() {
        //this.RRFID
        this._rrfCandidatesList.getRRFByID(this.RRFID.Value)
            .subscribe(
            (results: any) => {
                this.selectedRRF = results;
            },
            error => this.errorMessage = <any>error);
    }

    getCandidatesRoundHistory(CandidateID: MasterData, CandidateName: string) {
        this.CandidateRoundHistory = new Array<Interview>();
        this.selectedCandidate = CandidateName;
        this._rrfCandidatesList.getInterviewRoundHistorybyCandidateId(CandidateID, this.RRFID)
            .subscribe(
            (results: any) => {
                if (results !== null && results.length > 0) {
                    this.CandidateRoundHistory = <any>results;
                    this.isRoundHistoryPresent = false;
                } else {
                    this.isRoundHistoryPresent = true;
                }
            },
            error => this.errorMessage = <any>error);
    }

    showPopOver(Comments: string, index: string) {
        let rowId: any = 'round' + index;
        let row: any = $('#' + rowId);
        row.popover({
            placement: 'top',
            toggle: 'popover',
            title: 'Comments',
            html: true,
            trigger: 'hover',
            content: Comments
        });
    }

    setValueToChart() {
        this.doughnutChartLabels = [];
        this.doughnutChartData = [];
        var chartColor: any[] = [];
        // doughnutChartColors: any[] = [{ backgroundColor: ["#E9EF0B", "#32c5d2" , "#e7505a" , "#c2cad8" , "#41ce29"] }];
        for (var index = 0; index < this.CandidateRoundHistory.length; index++) {
            this.doughnutChartLabels.push(this.CandidateRoundHistory[index].Status);
            // this.doughnutChartData.push(this.CandidateRoundHistory[index].);
            // chartColor.push(this.getChartColor(this.rrfStatusCount[index].Status.Id));
        }
        this.doughnutChartColors[0].backgroundColor = chartColor;
    }
    getChartColor(statusID: number): string {
        switch (statusID) {
            case 1:
                return '#E9EF0B';
            case 2:
                return '#32c5d2';
            case 3:
                return '#e7505a';
            case 4:
                return '#c2cad8';
            case 5:
                return '#41ce29';
            default:
                return '';
        }
    }

    onReScheduleInterviewClick(Candidate: RRFSpecificCandidateList) {
        sessionStorage.setItem('RRFID', JSON.stringify(this.RRFID));
        sessionStorage.setItem('Candidate', JSON.stringify(Candidate));
        this._router.navigate(['/App/Recruitment Cycle/Schedule/' +
            Candidate.InterviewDetails.InterviewID.Value + 'ID' + Candidate.InterviewDetails.InterviewID.Id]);
    }

    CheckInterviewStatus(CandidateDetails: Array<RRFSpecificCandidateList>) {
        this.AllCandidatesForRRF = CandidateDetails;
        for (var index = 0; index < CandidateDetails.length; index++) {
            if (CandidateDetails[index].InterviewDetails.Status !== null) {
                switch (CandidateDetails[index].InterviewDetails.Status.toLowerCase()) {
                    case 'selected':
                    case 'on-hold':
                    case 'rejected':
                        this.AllCandidatesForRRF[index].isInterviewScheduled = false;
                        break;
                    case 'scheduled':
                    case 're-scheduled':
                        this.AllCandidatesForRRF[index].isInterviewScheduled = true;
                        break;
                    default:
                        break;
                }
            } else {
                CandidateDetails[index].InterviewDetails.Status = 'Not Scheduled';
                if (CandidateDetails[index].InterviewDetails.Round.Value === null)
                    CandidateDetails[index].InterviewDetails.Round.Value = '--';
            }
        }

    }

    getDate(interviewDate: string) {
        var d = new Date(interviewDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }

    isOfferGenerationVisible(lastInterviewRound: string) {
        if (lastInterviewRound.includes('hr')) {
            return false;
        } else { return true; }
    }

    canCancelInterview(status: string) {
        if (status.toLowerCase() === 'scheduled' || status.toLowerCase() === 're-scheduled' ||
            status.toLowerCase() === 'awaiting approval') {
            return false;
        } else { return true; }

    }
    OnProceedForOfferGenerationClick(CandidateDetails: RRFSpecificCandidateList) {
       this.InterviewID = CandidateDetails.InterviewDetails.InterviewID;
       var cnfrmbx :any = $('#prcedfrOffrgenration');
       cnfrmbx.modal();
    }
    proceedForOfferGeneration(InterviewID:MasterData) {
        if(InterviewID.Id !== null && InterviewID.Id !== undefined) {
         this._rrfCandidatesList.proceedForOfferGeneration(InterviewID)
            .subscribe(
            (results: any) => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                } else {
                    this.toastr.success((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => this.errorMessage = <any>error);
        }
    }
}
