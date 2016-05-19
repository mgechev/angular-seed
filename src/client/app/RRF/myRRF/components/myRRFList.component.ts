import {Component} from '@angular/core';
import { Router, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import { MyRRFInfo } from '../models/myRRFInfo';
import { MyRRFService } from '../services/myRRF.service';
import { RRFDetails } from '../models/rrfDetails';

@Component({
    moduleId: module.id,
    selector: 'rrf-myrrf-list',
    templateUrl: 'myRRFList.component.html',
    directives: [ROUTER_DIRECTIVES],

})

export class MyRRFListComponent implements OnActivate {
    raisedRRFList: Array<MyRRFInfo>;
    errorMessage: string;
    selectedRRF: RRFDetails = new RRFDetails();
    constructor(private _myRRFService: MyRRFService, private _router: Router
    ) {
    }

    routerOnActivate() {
        this.getRaisedRRF('admin', 1);
        this.getRRFDetails(1);

        //Displayed complete % graph
        $('.knob').knob();
        $('.knob').val(44);
        $('.knob').trigger('change');
    }

    getRaisedRRF(userName: string, roleID: number) {
        this._myRRFService.getRaisedRRF(userName, roleID)
            .subscribe(
            results => {
                this.raisedRRFList = results;
            },
            error => this.errorMessage = <any>error);
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


