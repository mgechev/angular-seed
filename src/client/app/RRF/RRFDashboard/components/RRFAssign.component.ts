import {Component} from '@angular/core';
import { OnActivate, ROUTER_DIRECTIVES ,RouteSegment } from '@angular/router';
import { RRFDetails } from '../../myRRF/models/rrfDetails';
import { MyRRFService } from '../../myRRF/services/myRRF.service';


@Component({
    selector: 'rrf-assign',
    templateUrl: 'app/RRF/RRFDashboard/components/RRFAssign.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class RRFAssignComponent implements OnActivate {
    selectedRRF: RRFDetails = new RRFDetails();
    errorMessage: string;
     Id: number;

    constructor(private _myRRFService: MyRRFService) {
    }

    routerOnActivate(segment: RouteSegment) {
        this.Id = +segment.getParam('id');
        this.getRRFDetails(this.Id);
    }

    getRRFDetails(rrfID: number) {
        this._myRRFService.getRRFDetails(rrfID)
            .subscribe(
            results => {
                this.selectedRRF = results;
            },
            error => this.errorMessage = <any>error);
    }


}
