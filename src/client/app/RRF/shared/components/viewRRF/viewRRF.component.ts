import { Component, Input ,AfterViewInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { RRFDetails} from '../../../myRRF/models/rrfDetails';
import { MyRRFService } from '../../../myRRF/services/myRRF.service';
import { MasterData} from '../../../../shared/model/common.model';



@Component({
    moduleId: module.id,
    selector: 'view-RRF',
    templateUrl: 'viewRRF.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [MyRRFService]
})


export class ViewRRFComponent implements AfterViewInit {
    @Input() RRFID: MasterData = new MasterData();
    selectedRRF: RRFDetails = new RRFDetails();
    errorMessage: string = '';
    constructor(private _myRRFService: MyRRFService) {
    }

    getRRFDetails(rrfID: MasterData) {
        this._myRRFService.getRRFDetails(rrfID.Value)
            .subscribe(
            (results: RRFDetails) => {
                this.selectedRRF = results;
            },
            error => this.errorMessage = <any>error);
    }

    ngAfterViewInit(){
        this.getRRFDetails(this.RRFID);
    }


}
