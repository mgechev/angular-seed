import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MyProfilesInfo, Qualification, Masters } from '../../myProfiles/model/myProfilesInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()

export class AllProfilesService {

    constructor(private http: Http, private authHttp: AuthHttp) { }

    getAllProfiles() {
        let url = Config.GetURL('/api/ProfileBank/getOpenProfiles');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editCandidateProfile(profile: MyProfilesInfo) {
        let url = Config.GetURL('/api/ProfileBank/editCandidateProfile');
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError);
    }
    

    getCandidateProfile(id: string) {
        let body = JSON.stringify({ profile: { ProfileId: id } });
        let url = Config.GetURL('/api/ProfileBank/getCandidateProfile');
        return this.authHttp.post(url, { profile: { ProfileId: id } })
            .map(this.extractData)
            .catch(this.handleError);
    }
       
    editCandidatePersonalDetails(profile: MyProfilesInfo) {
        let url = Config.GetURL('/api/ProfileBank/AddPersonalDetails');
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editCandidateProfessionalDetails(profile: MyProfilesInfo) {
        let url = Config.GetURL('/api/ProfileBank/AddCandidateOtherDetails');
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editCandidateQualificationDetails(profile: MyProfilesInfo) {
        let url = Config.GetURL('/api/ProfileBank/AddQualificationDetails');
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editCandidateCareerDetails(profile: MyProfilesInfo) {
        let url = Config.GetURL('/api/ProfileBank/AddCareerProfileDetails');
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editCandidateSkillsDetails(profile: MyProfilesInfo) {
        let url = Config.GetURL('/api/ProfileBank/AddCandidateSkillsDetails');
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editCandidateSalaryDetails(profile: MyProfilesInfo) {
        let url = Config.GetURL('/api/ProfileBank/AddCandidateSalaryDetails');
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editCandidateTeamManagementDetails(profile: MyProfilesInfo) {
        let url = Config.GetURL('/api/ProfileBank/AddCandidateTeamManagementDetails');
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError);
    }

    addCandidateQualification(qualification: Qualification) {
        let url = Config.GetURL('/api/ProfileBank/AddQualificationDetails');
        return this.authHttp.post(url, { qualification })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getCandidateQualifications(id: string) {
        let url = Config.GetURL('/api/ProfileBank/getQualificationDetails');
        return this.authHttp.post(url, { profile: { ProfileId: id } })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editCandidateQualification(qualification: Qualification) {
        let url = Config.GetURL('/api/Masters/UpdateQualifications');
        return this.authHttp.post(url, { qualification })
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateCandidateStatus(CandidateID: number, Status: Masters, Comments: string) {
        let url = Config.GetURL('/api/ProfileBank/UpdateStatus');
        return this.authHttp.post(url, { profile: { CandidateID: CandidateID, Status: Status, Comments: Comments } })
            .map(this.extractData)
            .catch(this.handleError);

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