import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RRFDetails} from '../../../myRRF/models/rrfDetails';
import { MasterData } from  '../../../../shared/model/index';
import { PanelsAvailabilityService} from '../../services/panelsAvailability.service';
import { PanelAvailability} from '../../model/panelAvailability.model';
@Component({
    moduleId: module.id,
    selector: 'panel-availablity',
    templateUrl: 'panelsAvailablity.component.html',
    providers: [ToastsManager, PanelsAvailabilityService]
})
export class PanelsAvailablityComponent implements OnInit, OnChanges {
    rrfDetails: RRFDetails;
    errorMessage: any;
    _strr: Array<string> = new Array<string>();
    _availability: Array<PanelAvailability> = new Array<PanelAvailability>();
    //Get profiles data

    //Now it will show Interviewers availablity irrespective of RRF 
    //@Input() selectedRRF: RRFDetails;

    @Output() updatedRRF: EventEmitter<RRFDetails> = new EventEmitter<RRFDetails>();
    constructor(private toastr: ToastsManager,
        private _panelsAvailability: PanelsAvailabilityService) {
        console.log('In Contructor of panel...');

    }
    ngOnInit() {
        /** */
        //this.rrfDetails = this.selectedRRF;
        this.getPanelAvailablity();
        //console.log(this.profilePic);
        // for (var index = 0; index < 4; index++) {
        //     this._strr.push(index.toString());
        // }
        console.log('In init of panel...');
    }
    getPanelAvailablity() {
        /**Get interviewr's data from service */

        this._panelsAvailability.getAvailabilityForRRF()
            .subscribe(
            (results: any) => {
                this._availability = results;
            },
            error => this.errorMessage = <any>error);
    }
    sendrequest(interviewer: MasterData) {
        this._panelsAvailability.sendRequest(interviewer)
            .subscribe(
            (results: any) => {
                this._availability = results;
            },
            error => this.errorMessage = <any>error);
        /** */
    }

    ngOnChanges(changes: any) {
        //
    }
}
