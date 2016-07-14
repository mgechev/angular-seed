import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import {AssignRRFDetails} from '../model/RRF';
import {AssignRRFService} from '../services/assignRRF.service';
import { APIResult } from  '../../../shared/constantValue/index';
import { ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RRFDetails } from  '../../../RRF/myRRF/index';
import * as  _ from 'lodash';
@Component({
    moduleId: module.id,
    selector: 'profiles-assignrrf',
    templateUrl: 'assignRRF.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [AssignRRFService, ToastsManager],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class ProfileBankAssignRRFComponent implements OnActivate {
    CandidateIDs: Array<string> = new Array<string>();
    returnPath: string;
    Title: string;
    errorMessage: string;
    isRRFSelected: boolean = false;
    CandidateAssigment: AssignRRFDetails;
    RRFList : Array<RRFDetails>;
    selectedRRF : RRFDetails;


    constructor(private _router: Router,
        private toastr: ToastsManager,
        private _assignRRFService: AssignRRFService) {
        this.CandidateAssigment = new AssignRRFDetails();
        this.RRFList = new Array<RRFDetails>();
        this.selectedRRF = new RRFDetails();
    }

    routerOnActivate() {
        this.returnPath = sessionStorage.getItem('returnPath');
        if (this.returnPath.includes('MyProfiles')) {
            this.Title = 'My Profiles';
        } else {
            this.Title = 'Company Profiles';
        }
        this.getCandidateIDs();

        //TODO :  call getMyOpenRRF to fill RRf Dropdown
         this.getMyOpenAssignedRRF();
    }

    getCandidateIDs() {
        this.CandidateAssigment.Candidates = JSON.parse(sessionStorage.getItem('Candidates'));
        this.CandidateAssigment.CandidateIDs = new Array<string>();
        for (var index = 0; index < this.CandidateAssigment.Candidates.length; index++) {
            this.CandidateAssigment.CandidateIDs.push(this.CandidateAssigment.Candidates[index].CandidateID);
        }
        sessionStorage.removeItem('CandidateIDs');
    }

    getMyOpenAssignedRRF() {
        this._assignRRFService.getMyOpenRRF()
            .subscribe(
            (results: any) => {
               this.RRFList = results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    Back() {
        if (this.returnPath !== undefined)
            this._router.navigate([this.returnPath]);
    }

    onSelectRRF(RRFID: string) {
      //  this.CandidateAssigment.RRFID = RRFID;
        var index = _.findIndex(this.RRFList, { RRFID:RRFID });
        this.selectedRRF = this.RRFList[index];
        this.isRRFSelected = true;
    }

    onDelete(candidate: any) {
        var chkItemIndex = _.findIndex(this.CandidateAssigment.CandidateIDs, candidate.CandidateID);
        this.CandidateAssigment.CandidateIDs.splice(chkItemIndex, 1);

        chkItemIndex = _.findIndex(this.CandidateAssigment.Candidates, candidate);
        this.CandidateAssigment.Candidates.splice(chkItemIndex, 1);
    }

    onAssignRRF() {
        //TODO :  Call AssignRRF() to post Data --> Uncomment following Block
        this.CandidateAssigment.RRFID = this.selectedRRF.RRFID;
        this._assignRRFService.assignRRFToCandidates(this.CandidateAssigment)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this.Back();
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }
}
