import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MyProfilesInfo, SalaryDetails, Qualification,TeamManagement,CareerProfile,
         OtherDetails, Skills, TransferOwnershipMeta} from '../model/myProfilesInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import { MasterData } from  '../../../shared/model/index';

@Injectable()

export class ProfileBankService {

    constructor(private http: Http, private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }


    getCurrentLoggedInUser() {
        let url = Config.GetURL('/api/authentication/getCurrentUserName');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateOwnership(Ownership: TransferOwnershipMeta) {
        let url = Config.GetURL('api/ProfileBank/updateOwnership');
        this._spinnerService.show();
        return this.authHttp.post(url, { Ownership })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getCandidateOwnwershipInfo(candidateIds: Array<string>) {
        let url = Config.GetURL('/api/ProfileBank/getCandidateOwnwershipInfo');
        this._spinnerService.show();
        return this.authHttp.post(url, { Ids: candidateIds })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidateProfile(profile: MyProfilesInfo) {
        let url = Config.GetURL('/api/ProfileBank/editCandidateProfile');
        this._spinnerService.show();
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getCandidateProfile(id: string) {
        let url = Config.GetURL('/api/ProfileBank/ViewCandidateInformation?CandidateID='+id);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidatePersonalDetails(profile: MyProfilesInfo) {
        let url = Config.GetURL('/api/ProfileBank/AddPersonalDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidateProfessionalDetails(CandidateOtherDetails: OtherDetails) {
        let url = Config.GetURL('/api/ProfileBank/AddCandidateOtherDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateOtherDetails })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidateQualificationDetails(profile: MyProfilesInfo) {
        let url = Config.GetURL('/api/ProfileBank/AddQualificationDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidateCareerDetails(CandidateCareerProfile: CareerProfile) {
        let url = Config.GetURL('/api/ProfileBank/AddCareerProfileDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateCareerProfile })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidateSkillsDetails(CandidateSkills: Skills) {
        let url = Config.GetURL('/api/ProfileBank/AddCandidateSkillsDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateSkills })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidateSalaryDetails(CandidateSalaryDetails: SalaryDetails) {
        let url = Config.GetURL('/api/ProfileBank/AddCandidateSalaryDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateSalaryDetails })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidateTeamManagementDetails(CandidateTeamManagement: TeamManagement) {
        let url = Config.GetURL('/api/ProfileBank/AddCandidateTeamManagementDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateTeamManagement })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    addCandidateQualification(qualification: Qualification) {
        let url = Config.GetURL('/api/ProfileBank/AddQualificationDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { qualification })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getCandidateQualifications(id: string) {
        let url = Config.GetURL('/api/ProfileBank/getQualificationDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { profile: { ProfileId: id } })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidateQualification(qualification: Qualification) {
        let url = Config.GetURL('/api/ProfileBank/UpdateQualifications');
        this._spinnerService.show();
        return this.authHttp.post(url, { qualification })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    updateCandidateStatus(CandidateID: string, Status: MasterData, Comments: string) {
        let url = Config.GetURL('/api/ProfileBank/UpdateStatus');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateID: CandidateID, Status: Status, Comments: Comments})
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());

    }

    updateFollowUpComments(CandidateID: string, Comments: string) {
        let url = Config.GetURL('/api/ProfileBank/UpdateFollowUpComments');
        this._spinnerService.show();
        return this.authHttp.post(url, { profile: { CandidateID: CandidateID, Comments: Comments } })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
