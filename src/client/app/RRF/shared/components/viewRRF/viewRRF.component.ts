import { Component, Input, AfterViewInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { RRFDetails} from '../../../myRRF/models/rrfDetails';
import { MyRRFService } from '../../../myRRF/services/myRRF.service';
import { MasterData} from '../../../../shared/model/common.model';
import { RRFGridRowComponent } from '../RRFGridRow/RRFGridRow.component';
import { RRFCandidateListService } from '../../../RRFDashboard/services/RRFCandidatesList.service';
import {RRFSpecificCandidateList} from '../../../RRFDashboard/model/RRFCandidateList';



@Component({
    moduleId: module.id,
    selector: 'view-RRF',
    templateUrl: 'viewRRF.component.html',
    directives: [ROUTER_DIRECTIVES, RRFGridRowComponent],
    styleUrls: ['viewRRF.component.css'],
    providers: [MyRRFService, RRFCandidateListService]
})


export class ViewRRFComponent implements AfterViewInit {
    @Input() RRFID: MasterData = new MasterData();
    selectedRRF: RRFDetails = new RRFDetails();
    candidatelist: RRFSpecificCandidateList[] = [];
    errorMessage: string = '';
    constructor(private _myRRFService: MyRRFService,
        private _RRFCandidateService: RRFCandidateListService) {
    }

    getRRFDetails(rrfID: MasterData) {
        this._myRRFService.getRRFDetails(rrfID.Value)
            .subscribe(
            (results: RRFDetails) => {
                this.selectedRRF = results;
            },
            error => this.errorMessage = <any>error);
    }

    getCandidatesForRRF(rrfID: MasterData) {
        this._RRFCandidateService.getCandidatesForRRF(rrfID.Value)
            .subscribe(
            (results: RRFSpecificCandidateList[]) => {
                this.candidatelist = results;
                this.setValue();
            },
            error => this.errorMessage = <any>error);
    }

    setValue() {
        for (var index = 0; index < this.candidatelist.length; index++) {
            if (this.candidatelist[index].InterviewDetails.Status !== null) {
                //
            } else {
                this.candidatelist[index].InterviewDetails.Status = 'Not Scheduled';
                if (this.candidatelist[index].InterviewDetails.Round.Value === null)
                    this.candidatelist[index].InterviewDetails.Round.Value = '--';
            }
        }
    }

    ngAfterViewInit() {
        this.getRRFDetails(this.RRFID);
        this.getCandidatesForRRF(this.RRFID);
    }


}
