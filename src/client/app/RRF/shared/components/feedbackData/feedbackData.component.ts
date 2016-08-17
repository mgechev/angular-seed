import {Component, Input, AfterViewInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { RRFFeedback} from '../../../myRRF/models/rrfDetails';
import {  MasterData } from '../../../../shared/model/common.model';
import {FeedbackDataService} from './services/feedbackData.service'

@Component({
    moduleId: module.id,
    selector: 'feedback-data',
    templateUrl: 'feedbackData.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [FeedbackDataService]
})

export class FeedbackDataComponent implements AfterViewInit {
    @Input() RRFID: MasterData = new MasterData();
    RRFFeedbackData: RRFFeedback[] = [];
    errorMessage: string;
    NORECORDSFOUND = false;

    constructor(private _feedbackDataService: FeedbackDataService) {
    }

    ngAfterViewInit() {
        this.getAllFeedback();
    }

    //get all feedback of RRF
    getAllFeedback() {
        this._feedbackDataService.getAllFeedback(this.RRFID.Value)
            .subscribe(
            (results: any) => {
                if (results.length > 0) {
                    this.RRFFeedbackData = results;
                } else {
                    this.NORECORDSFOUND = true;
                    this.RRFFeedbackData = [];
                }
            },
            error => this.errorMessage = <any>error);
    }

}
