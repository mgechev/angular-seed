import {Component} from '@angular/core';
import {OnActivate, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { RRFFeedback} from '../../myRRF/models/rrfDetails';
import { FeedbackPendingService } from '../services/feedbackPending.service';
import { APIResult } from  '../../../shared/constantValue/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ResponseFromAPI, GrdOptions, MasterData, SortingMasterData } from '../../../shared/model/common.model';
import {RRFPipe } from '../../shared/Filters/RRFFilter.component';
import {RRFGridRowComponent} from '../../shared/components/RRFGridRow/RRFGridRow.component';
import { MastersService } from '../../../shared/services/masters.service';
import {IfAuthorizeDirective} from '../../../shared/directives/ifAuthorize.directive';
import {FeedbackDataComponent} from '../../shared/components/feedbackData/feedbackData.component';
import { FeedBackpending} from '../models/feedbackPending';

@Component({
    moduleId: module.id,
    selector: 'rrf-feedbackPending',
    templateUrl: 'feedbackPending.component.html',
    directives: [ROUTER_DIRECTIVES, RRFGridRowComponent, IfAuthorizeDirective, FeedbackDataComponent],
    styleUrls: ['../../shared/css/RRF.component.css'],
    providers: [ToastsManager, FeedbackPendingService, MastersService],
    pipes: [RRFPipe],
})

export class FeedbackPendingComponent implements OnActivate {
    rrfFeedbackPendingList: FeedBackpending[] = [];
    errorMessage: string;
    comment: string;
    selectedRowCount: number = 0;
    allChecked: boolean = false;
    searchText: string = '';
    NORECORDSFOUND: boolean = false;
    SortByList: SortingMasterData[] = [];
    grdOptions: GrdOptions = new GrdOptions();
    logedInUser: MasterData = new MasterData();

    constructor(private _feedbackPendingService: FeedbackPendingService,
        public toastr: ToastsManager,
        private _mastersService: MastersService,
        private _router: Router) {
    }

    routerOnActivate(): void {
        this.getLoggedInUser();
        this.getFeedbackPendingRRF();
        this.getColumsForSorting('RRFAPPROVAL'); //TODO
    }

    //Get list of ALL RRF waiting for Freeze or feedback
    getFeedbackPendingRRF(): void {
        this._feedbackPendingService.getFeedbackPendingRRF(this.grdOptions)
            .subscribe(
            (results: any) => {
                this.grdOptions = (<any>(results)).GrdOperations;
                if (results.RRFs !== undefined && results.RRFs.length > 0) {
                    this.rrfFeedbackPendingList = (<any>(results)).RRFs;

                    for (var index = 0; index < this.rrfFeedbackPendingList.length; index++) {
                        this.rrfFeedbackPendingList[index].IsChecked = false;
                        this.rrfFeedbackPendingList[index].IsShowFeedback = false;
                    }
                } else {
                    this.NORECORDSFOUND = true;
                    this.rrfFeedbackPendingList = [];
                }
            },
            error => this.errorMessage = <any>error);
    }

    //On checkbox check
    onStateChange(e: any): void {
        if (e.target.checked) {
            this.selectedRowCount++;
        } else {
            this.selectedRowCount--;
        }
        if (this.selectedRowCount === this.rrfFeedbackPendingList.length) {
            this.allChecked = true;
        } else {
            this.allChecked = false;
        }
    }

    //On Header checkbox check check/uncheck below all checkbox
    onAllSelect(e: any): void {
        var state: boolean;
        if (e.target.checked) {
            state = true;
            this.selectedRowCount = this.rrfFeedbackPendingList.length;
        } else {
            state = false;
            this.selectedRowCount = 0;
        }
        for (var index = 0; index < this.rrfFeedbackPendingList.length; index++) {
            this.rrfFeedbackPendingList[index].IsChecked = state;

        }
    }


    //Save feedback 
    onFeedback(): void {
        var RRFFeedbackList: RRFFeedback[] = [];
        for (var index = 0; index < this.rrfFeedbackPendingList.length; index++) {
            var rrfFeedbackData: RRFFeedback = new RRFFeedback();
            if (this.rrfFeedbackPendingList[index].IsChecked) {
                rrfFeedbackData.RRFID = this.rrfFeedbackPendingList[index].RRFID;
                rrfFeedbackData.Feedback = this.comment;
                rrfFeedbackData.PreviousValue = null;
                rrfFeedbackData.UpdatedValue = null;
                RRFFeedbackList.push(rrfFeedbackData);
            }
        }

        this._feedbackPendingService.FeedbackToRRFFormRH(RRFFeedbackList)
            .subscribe(
            results => {
                if (+ (<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }

                this.comment = '';
                this.allChecked = false;

                this.getFeedbackPendingRRF();
            },
            error => this.errorMessage = <any>error);
    }


    //Freeze RRF
    onRRFFreeze(): void {
        var RRFFeedbackList: RRFFeedback[] = [];
        for (var index = 0; index < this.rrfFeedbackPendingList.length; index++) {
            if (this.rrfFeedbackPendingList[index].IsChecked) {
                var rrfFeedback: RRFFeedback = new RRFFeedback();
                rrfFeedback.RRFID = this.rrfFeedbackPendingList[index].RRFID;
                RRFFeedbackList.push(rrfFeedback);
            }
        }

        this._feedbackPendingService.freezeRRF(RRFFeedbackList)
            .subscribe(
            results => {
                if (+ (<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
                this.comment = '';
                this.allChecked = false;

                this.getFeedbackPendingRRF();
            },
            error => this.errorMessage = <any>error);
    }


    resetToDefaultGridOptions() {
        this.grdOptions.ButtonClicked = 0;
        this.grdOptions.NextPageUrl = [];
    }

    //On Previ/next button click load data
    OnPaginationClick(page: number) {
        this.grdOptions.ButtonClicked = page;
        this.getFeedbackPendingRRF();
    }

    //get list of column to sort grid
    getColumsForSorting(featureName: string) {
        this._mastersService.getColumsForSorting(featureName)
            .subscribe(
            results => {
                this.SortByList = <any>results;
            },
            error => this.errorMessage = <any>error);
    }

    //On edit open RRF in edit mode
    redirectToEditRRF(rrfID: MasterData, status: number) {
        this._router.navigate(['/App/RRF/MyRRF/Edit/' + rrfID.Value + 'ID' + rrfID.Id + 'ST' + status]);
    }

    //reset pagination and reload data and bind to grid
    bindGridData() {
        //First set grid option
        this.resetToDefaultGridOptions();
        //call APIResult
        this.getFeedbackPendingRRF();
    }

    //get currently logIn user Id ,name
    getLoggedInUser() {
        this._feedbackPendingService.getCurrentLoggedInUser()
            .subscribe(
            (results: MasterData) => {
                this.logedInUser = results;
            },
            error => this.errorMessage = <any>error);

    }

    //Check can loggedIn user have authority to Edit RRF
    allowEditRRF(rrf: FeedBackpending) {
        try {
            if (rrf.RaisedBy.Id === this.logedInUser.Id) {
                if (rrf.FeedbackStatus.toLowerCase()=== 'update needed') {
                    return true;
                } else {
                    return false;
                }

            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    //Show Feedback details
    showAllFeedback(rrf: FeedBackpending) {
        if (rrf.IsShowFeedback === true) {
            rrf.IsShowFeedback = false;
        } else {
            rrf.IsShowFeedback = true;
        }
    }

    //Set value of action Hide/Show feedback
    getStringToDisplayInAction(rrf: FeedBackpending) {
        if (rrf.IsShowFeedback) {
            return 'Hide Feedback';
        } else {
            return 'Show Feedback';
        }
    }
}
