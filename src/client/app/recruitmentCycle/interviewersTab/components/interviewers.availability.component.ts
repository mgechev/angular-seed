import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate} from '@angular/router';
import {Interview} from '../../shared/model/interview';
import {InterviewersAvailabilityService} from '../services/interviewers.availability.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DetailRRF } from '../../shared/model/detailRRF';
import {InterviewSlotComponent } from '../../shared/component/InterviewSlot/Component/InterviewSlot.component';
import {CalenderSlot, CalenderDetails} from '../../shared/component/InterviewSlot/Model/interviewSlot';
import { MasterData} from '../../../shared/model/common.model';

@Component({
    moduleId: module.id,
    selector: 'interviewers-availability',
    templateUrl: 'interviewers.availability.component.html',
    directives: [ROUTER_DIRECTIVES, InterviewSlotComponent],
    providers: [Interview, ToastsManager,InterviewersAvailabilityService]
})

export class RecruitmentInterviewAvailabilityComponent implements OnActivate {
    returnPath: string;
    Title: string;
    errorMessage: string;
    _rrfDetails: Array<DetailRRF> = new Array<DetailRRF>();;
    _rrfId: string;
    _showSlots: boolean;
    RRFIdTOShowSlot: MasterData = new MasterData();
    RRFCode: string;
    showSlotForRRF: boolean = false;

    constructor(private _router: Router,
        private toastr: ToastsManager,
        private _interviewService: InterviewersAvailabilityService) {
        this._rrfDetails = new Array<DetailRRF>();
        // this._showSlots =true;
    }
    //Router method overrid from OnActivate class
    routerOnActivate() {
        this.getMyAssignedRRF();
        this.returnPath = sessionStorage.getItem('returnPath');
    }
    Back() {
        if (this.returnPath !== undefined)
            this._router.navigate([this.returnPath]);
    }

    /** Get availability slots by specific RRF id
     * if (true) 
     *  Show availability on screen for edit
     * else
     *  Add new availability from screen
     */
    getAvailabilitySlots(_rrfId: string) {
        /** add logic to get all RRF */
    }
    //Get all interviews assigned and accepted by current logged in user from service.
    getMyAssignedRRF() {
        this._interviewService.getAssignedRRF()
            .subscribe(
            (results: any) => {
                this._rrfDetails = results;
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
    }

    showSlots(_rrfId: MasterData, RRFCode: string) {
        /** show slots information area */
        this.RRFIdTOShowSlot = _rrfId;
        this.RRFCode = RRFCode;
        this.showSlotForRRF = true;

        // this._showSlots = _isHidenSlot;
    }
    
    hideSlot(){
        this.showSlotForRRF = false;
    }

}
