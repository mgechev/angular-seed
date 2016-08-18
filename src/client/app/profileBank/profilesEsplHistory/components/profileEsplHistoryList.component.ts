import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {IfAuthorizeDirective} from '../../../shared/directives/ifAuthorize.directive';
import { ProfileBankPipe }from '../../shared/filter/profileBank.pipe';
import { ProfileInterviewHistory, AllInterviewsHistory }from '../models/profileEsplHistoryModel';
import { MasterData } from  '../../../shared/model/index';
import { ProfileEsplHistoryService } from '../services/profileEsplHistory.service';

@Component({
    moduleId: module.id,
    selector: 'profile-esplhistory-list',
    templateUrl: 'profileEsplHistoryList.component.html',
    directives: [ROUTER_DIRECTIVES, IfAuthorizeDirective],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    providers: [ProfileEsplHistoryService],
    pipes: [ProfileBankPipe]
})

export class ProfileEsplHistoryListComponent implements OnActivate {
    allInterviewsHistory: AllInterviewsHistory = new AllInterviewsHistory();
    profileHistory: ProfileInterviewHistory;
    profileHistoryCollection: Array<ProfileInterviewHistory> = new Array<ProfileInterviewHistory>();
    historyOfCandidate: MasterData;
    errorMessage: string;
    NORECORDSFOUND: boolean = false;
    constructor(private _router: Router,
        public toastr: ToastsManager,
        private profilesHistoryService: ProfileEsplHistoryService) {
        /** */
    }

    routerOnActivate() {
        /** */
        this.historyOfCandidate = this.getSessionOf<MasterData>('HistoryOfCandidate');
        console.log(this.historyOfCandidate);
        this.getProfilesHistory(this.historyOfCandidate);
    }
    /**Function to get candidates interviews history with ESPL */
    getProfilesHistory(_candidateID: MasterData) {
        /** TODO:: write service call for history  getProfilesInterviewHistory*/
        this.profilesHistoryService.getProfilesInterviewHistory(_candidateID)
            .subscribe(
            (results: any) => {
                //if (results.Profiles !== undefined && results.Profiles.length > 0) {
                if (results !== undefined && results.length > 0) {
                    this.profileHistoryCollection = <any>results;
                } else {
                    this.toastr.error('No Records Found.');
                    this.profileHistoryCollection = null;
                }
            },
            error => this.errorMessage = <any>error);
    }

    // getProfilesAllHistory() {
    //     try {
    //         this.profilesHistoryService.getProfilesInterviewHistory(this.allInterviewsHistory.GrdOperations)
    //             .subscribe(
    //             (results: any) => {
    //                 if (results.Profiles !== undefined && results.Profiles.length > 0) {
    //                     this.allInterviewsHistory = <AllInterviewsHistory>results;
    //                 } else { this.NORECORDSFOUND = true; }
    //             },
    //             error => this.errorMessage = <any>error);
    //     } catch (error) {
    //         this.allInterviewsHistory = new AllInterviewsHistory();
    //     }
    // }

    /**Get data from session */
    getSessionOf<T>(variableName: string): T {
        var _requestedIef = sessionStorage.getItem(variableName);
        if (_requestedIef !== null) {
            var response = JSON.parse(_requestedIef);
            sessionStorage.setItem(variableName, '');
        } else {
            /** If no information found from Session then it will redirected to existing page */
            this.toastr.error('Somthing went wrong..!');
        }
        return response;
    }

}
