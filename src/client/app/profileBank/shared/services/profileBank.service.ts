import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CandidateProfile, ResumeMeta, SalaryDetails, Qualification, TeamManagement, CareerProfile,
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
        let url = Config.GetURL('/api/ProfileBank/UpdateProfileOwner');
        this._spinnerService.show();
        return this.authHttp.post(url, { Ownership })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getCandidateOwnwershipInfo(candidateIds: Array<MasterData>) {
        let url = Config.GetURL('/api/ProfileBank/getCandidateOwnwershipInfo');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateIds: candidateIds })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidateProfile(profile: CandidateProfile) {
        let url = Config.GetURL('/api/ProfileBank/UpdateCandidateIntialInfo');
        this._spinnerService.show();
        return this.authHttp.post(url, { profile })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getCandidateProfile(id: string) {
        let url = Config.GetURL('/api/ProfileBank/ViewCandidateInformation?CandidateID=' + id);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidatePersonalDetails(profile: CandidateProfile) {
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

    editCandidateQualificationDetails(profile: CandidateProfile) {
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

    addCandidateQualification(CandidateQualifications: Qualification) {
        let url = Config.GetURL('/api/ProfileBank/AddQualificationDetails');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateQualifications })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getCandidateQualifications(id: string) {
        let url = Config.GetURL('/api/ProfileBank/getQualificationDetails?CandidateID=' + id);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editCandidateQualification(CandidateQualification: Qualification) {
        let url = Config.GetURL('/api/ProfileBank/UpdateQualifications');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateQualification })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    updateCandidateStatus(CandidateID: MasterData, Status: MasterData, Comments: string) {
        let url = Config.GetURL('/api/ProfileBank/UpdateStatus');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateID: CandidateID, Status: Status, Comments: Comments })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());

    }

    updateFollowUpComments(CandidateID: MasterData, Comments: string) {
        let url = Config.GetURL('/api/ProfileBank/UpdateFollowUpComments');
        this._spinnerService.show();
        return this.authHttp.post(url, { CandidateID: CandidateID, FollowUpComments: Comments })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getQualificationById(CandidateID: string, QualificationID: string) {
        let url = Config.GetURL('/api/ProfileBank/getCandidateQualification?CandidateID=' +
            CandidateID + '&QualificationID=' + QualificationID);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());

    }

    getResumeById(CandidateID: MasterData) {
        //  let url = Config.GetURL('/api/ProfileBank/GetResume?CandidateID='+CandidateID);
        // this._spinnerService.show();
        // return this.authHttp.get(url)
        //     .map(this.extractData)
        //     .catch(this.handleError)
        //     .finally(() => this._spinnerService.hide());
        // return this.http.get('https://static.pexels.com/photos/4825/red-love-romantic-flowers.jpg')
        //     .map(this.ChangeResponseType)
        //     .catch(this.handleError)
        //     .finally(() => this._spinnerService.hide());
        // let formData: FormData = new FormData();


        // formData.append('CandidateID', resumeMeta.Profile, resumeMeta.Profile.name);
        // formData.append('CandidateID', resumeMeta.CandidateID.Value);
        // formData.append('Overwrite', resumeMeta.Overwrite);

        // var xhr = new XMLHttpRequest();
        // let url = Config.GetURL('/api/ProfileBank/GetResume?CandidateID=' + CandidateID.Value);
        // xhr.open('GET', url, true);
        // xhr.responseType = 'blob';
        // xhr.setRequestHeader('responseType', 'bolb');
        // xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


        // xhr.onreadystatechange = function () {//Call a function when the state changes.
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         var blob = new Blob([this.response], { type: 'application/jpeg' });
        //         saveAs(blob, 'Report.jpg');
        //     } else {
        //         console.log('Error');
        //     }
        // };
        // xhr.open('GET', url, true);
        // xhr.send();
        let url = Config.GetURL('/api/ProfileBank/GetResume?CandidateID=' + CandidateID.Value);
        var headers = new Headers();
        headers.append('responseType', 'bolb');
        // headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        let options = new RequestOptions({ headers: headers });
        //'http://www.pdf995.com/samples/pdf.pdf
        return this.http.get('http://www.pdf995.com/samples/pdf.pdf',headers)
            .map((response:any) => {
                var mediaType = 'application/pdf';
                var blob = new Blob([response._body], { type: mediaType });
                var filename = 'test.pdf';
                saveAs(blob, filename);
            })
            .catch(this.handleError);

    }

    uploadProfilePhoto(resumeMeta: ResumeMeta) {
        console.log('Operaration sucessfull..! but API is pending to upload photo.');
        /** TODO:: Update api URL Once API is ready (API is pending) */
        let url = Config.GetURL('/api/ProfileBank/UploadCandidateProfile');
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append('Profile', resumeMeta.Profile, resumeMeta.Profile.name);
            formData.append('CandidateID', resumeMeta.CandidateID.Value);
            formData.append('Overwrite', resumeMeta.Overwrite);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
            xhr.send(formData);
        });
    }
    /*** Remove Profile photo */
    removeProfilePhoto(candidateID: MasterData) {
        console.log('Operaration sucessfull..! but API is pending to remove photo.');
        /** TODO:: Update api URL Once API is ready (API is pending) */
        let url = Config.GetURL('/api/ProfileBank/');
        this._spinnerService.show();
        return this.authHttp.post(url, { candidateID })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    deleteProfile(candidateID: MasterData) {
        console.log('Operaration sucessfull..! but API is pending to delete profile.');
        /** TODO:: Update api URL Once API is ready (API is pending) */
        let url = Config.GetURL('/api/ProfileBankPaging/GetOpenProfiles');
        this._spinnerService.show();
        return this.authHttp.post(url, { candidateID })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getStatusById(CandidateID: string) {
        let url = Config.GetURL('/api/ProfileBank/GetStatus?CandidateID=' + CandidateID);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    /* Sorting */
    getColumsForSorting(featureName: string) {
        let url = Config.GetURL('/api/Masters/GetSortableColumns?Feature=' + featureName);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    private createBolb(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        return new Blob([res], { type: 'image/jpeg' });
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
