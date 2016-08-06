import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RRFDetails} from '../../../myRRF/models/rrfDetails';
import { MasterData } from  '../../../../shared/model/index';
@Component({
    moduleId: module.id,
    selector: 'panel-availablity',
    templateUrl: 'panelsAvailablity.component.html',
    providers: [ToastsManager]
})
export class PanelsAvailablityComponent implements OnInit {
    rrfDetails: RRFDetails;
    errorMessage: any;
    _strr: Array<string> = new Array<string>();
    //Get profiles data
    @Input() selectedRRF: RRFDetails;
    @Output() updatedRRF: EventEmitter<RRFDetails> = new EventEmitter<RRFDetails>();
    constructor(private toastr: ToastsManager) {
        console.log('In Contructor of panel...');

    }
    ngOnInit() {
        /** */
        //this.rrfDetails = this.selectedRRF;
        //console.log(this.profilePic);
        for (var index = 0; index < 4; index++) {
            this._strr.push(index.toString());
        }
        console.log('In init of panel...');
    }
    getPanelAvailablity(rrfID: MasterData) {
        /**Get interviewr's data from service */
        // this._allProfilesService.getInterviewrsAvailablity(rrfID)
        //     .subscribe(
        //     (results: any) => {
        //         this.allProfilesList = <AllCandidateProfiles>results;
        //     },
        //     error => this.errorMessage = <any>error);
    }
    sendrequest(interviewerID: string) {
        /** */
    }
}
