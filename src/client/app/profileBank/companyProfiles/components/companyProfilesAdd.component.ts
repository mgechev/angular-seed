import {Component } from '@angular/core';
import { Router, RouteSegment, ROUTER_DIRECTIVES, OnActivate } from '@angular/router';
import { CompanyProfilesService } from '../services/CompanyProfiles.service';
import { MyProfilesInfo, Qualification } from '../../shared/model/myProfilesInfo';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService } from '../../shared/services/profilebank.service';
@Component({
    moduleId: module.id,
    selector: 'rrf-company-profile-add',
   // templateUrl: 'CompanyProfilesAdd.component.html',
    templateUrl: '../../shared/views/profileBankAdd.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class CompanyProfilesAddComponent implements OnActivate {

    profile: MyProfilesInfo;
    qualification: Qualification;
    errorMessage: string;
    params: string;

    countries: Array<MasterData>;
    states: Array<MasterData>;


    qualifications: Array<MasterData>;
    grades: Array<MasterData>;
    years: Array<MasterData>;
    selectedQualification: number;
    selectedYear: number;
    selectedGrade: number;
    Marks: number;
    selectedVisa: MasterData = new MasterData();
    VisaType: Array<MasterData> = new Array<MasterData>();
    CurrentYear: number;

    IsCurrentAddressSameAsPermanentChecked: boolean = false;
    IsOutstationedCandidateChecked: boolean = false;
    IsReadyToRelocateChecked: boolean = false;

    IsHidden: boolean = true;
    IsSuccess: boolean = false;
    TITLE: string = 'Company Profiles';

    constructor(private _CompanyProfilesService: CompanyProfilesService,
        private _router: Router,
        public toastr: ToastsManager,
        private _profileBankService: ProfileBankService,
        private _masterService: MastersService) {
        this.profile = new MyProfilesInfo();
        this.createQualification();

    }

    routerOnActivate(segment: RouteSegment) {
        //get all master data and bind to dropdown
        this.getCountries();
        //this.getStates();
        //this.getDistricts();
        this.getQualifications();
        //this.getYears();
        this.getGrades();
        this.getVisaType();
        //get current profile by Id
        this.params = segment.getParam('id');
        if (this.params) {
            this.getCandidateProfileById(this.params);
        }
        var date = new Date();
        this.CurrentYear = date.getFullYear();

    }

    getCandidateProfileById(profileId: string) {
        this._profileBankService.getCandidateProfile(profileId)
            .subscribe(
            (results: MyProfilesInfo) => {
                this.profile = <MyProfilesInfo>results;
                if (results.Country.Id !== 0)
                    this.getStates(results.Country.Id);
                //this.convertCheckboxesValuesToBoolean();
            },
            error => this.errorMessage = <any>error);
    }

    getCountries(): void {
        this._masterService.getCountries()
            .subscribe(
            results => {
                this.countries = results;

            },
            error => this.errorMessage = <any>error);
    }

    getStates(CountryId: number): void {
        this._masterService.getStates(CountryId)
            .subscribe(
            results => {
                this.states = results;

            },
            error => this.errorMessage = <any>error);
    }

    getQualifications(): void {
        this._masterService.getQualifications()
            .subscribe(
            results => {
                this.qualifications = <Array<MasterData>>results;
            },
            error => this.errorMessage = <any>error);
    }

    getYears(): void {
        this._masterService.getYears()
            .subscribe(
            results => {
                this.years = results;
            },
            error => this.errorMessage = <any>error);
    }

    getGrades(): void {
        this._masterService.getGrades()
            .subscribe(
            results => {
                this.grades = results;
            },
            error => this.errorMessage = <any>error);
    }
    getVisaType(): void {
        this._masterService.GetVisaType()
            .subscribe(
            results => {
                this.VisaType = results;
            },
            error => this.errorMessage = <any>error);
    }
    createQualification() {
        this.qualification = new Qualification();
        this.qualification.Qualification = new MasterData;
        this.qualification.Grade = new MasterData;
    }
    onSelectQualification(candidateQualification: string) {
        this.selectedQualification = parseInt(candidateQualification);
    }
    onSelectVisa(visaId: string) {
        this.profile.CandidateOtherDetails.Visa.Id = parseInt(visaId);
    }

    onSelectGrade(grade: string) {
        this.selectedGrade = parseInt(grade);
    }

    onSameAddressChecked(value: boolean) {
        if (value) {
            this.profile.PermanentAddress = this.profile.CurrentAddress;
        } else {
            this.profile.PermanentAddress = '';
        }
    }

    onSavePrimaryInfo(): void {
        if (this.params) {
            if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
                this.profile.CommentsUpdated = true;
                this.profile.PreviousFollowupComments = this.profile.FollowUpComments.trim();
            } else {
                this.profile.CommentsUpdated = false;
            }

            this._profileBankService.editCandidateProfile(this.profile)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.params);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }

    onSavePersonalDetails(): void {
        //   this.convertCheckboxesValues();
        if (this.params) {
            if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
                this.profile.CommentsUpdated = true;
                this.profile.PreviousFollowupComments = this.profile.FollowUpComments.trim();
            } else {
                this.profile.CommentsUpdated = false;
            }
            this._profileBankService.editCandidatePersonalDetails(this.profile)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.params);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }

    onSaveProfessionalDetails(): void {

        if (this.params) {
            //Check For Comments Updated
            if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
                this.profile.CommentsUpdated = this.profile.CandidateOtherDetails.CommentsUpdated = true;
                this.profile.PreviousFollowupComments = this.profile.CandidateOtherDetails.FollowUpComments
                    = this.profile.FollowUpComments.trim();
            } else {
                this.profile.CommentsUpdated = this.profile.CandidateOtherDetails.CommentsUpdated = false;
            }
            this.profile.CandidateOtherDetails.CandidateID = this.params;
            //Save Data
            this._profileBankService.editCandidateProfessionalDetails(this.profile.CandidateOtherDetails)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.params);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }

    onSaveSkillsDetails(): void {
        //   this.showMessage('Wait', true);
        if (this.params) {
            this.profile.CandidateSkills.CandidateID = this.params;
            if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
                this.profile.CommentsUpdated = this.profile.CandidateSkills.CommentsUpdated = true;
                this.profile.CandidateSkills.FollowUpComments = this.profile.PreviousFollowupComments
                    = this.profile.FollowUpComments.trim();
            } else {
                this.profile.CommentsUpdated = this.profile.CandidateSkills.CommentsUpdated = false;
            }
            this.profile.CandidateSkills.CandidateID = this.params;
            this._profileBankService.editCandidateSkillsDetails(this.profile.CandidateSkills)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.params);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }

    onSaveTeamManagementDetails(): void {
        //   this.showMessage('Wait', true);
        //   this.convertCheckboxesValues();
        if (this.params) {
            if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
                this.profile.CommentsUpdated = this.profile.CandidateTeamManagement.CommentsUpdated = true;
                this.profile.PreviousFollowupComments = this.profile.CandidateTeamManagement.FollowUpComments =
                    this.profile.FollowUpComments.trim();
            } else {
                this.profile.CommentsUpdated = this.profile.CandidateTeamManagement.CommentsUpdated = false;
            }
            this.profile.CandidateTeamManagement.CandidateID = this.params;
            this._profileBankService.editCandidateTeamManagementDetails(this.profile.CandidateTeamManagement)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.params);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }

    onSaveCareerProfileDetails(): void {
        //   this.showMessage('Wait', true);
        if (this.params) {
            if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
                this.profile.CommentsUpdated = this.profile.CandidateCareerProfile.CommentsUpdated = true;
                this.profile.PreviousFollowupComments = this.profile.CandidateCareerProfile.FollowUpComments
                    = this.profile.FollowUpComments.trim();
            } else {
                this.profile.CommentsUpdated = this.profile.CandidateCareerProfile.CommentsUpdated = false;
            }
            this.profile.CandidateCareerProfile.CandidateID = this.params;
            this._profileBankService.editCandidateCareerDetails(this.profile.CandidateCareerProfile)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.params);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                }
                );
        }
    }

    onSaveSalaryDetails(): void {
        //   this.showMessage('Wait', true);
        //   this.convertCheckboxesValues();
        if (this.params) {
            if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
                this.profile.CommentsUpdated = this.profile.CandidateSalaryDetails.CommentsUpdated = true;
                this.profile.PreviousFollowupComments = this.profile.CandidateSalaryDetails.FollowUpComments =
                    this.profile.FollowUpComments.trim();
            } else {
                this.profile.CommentsUpdated = false;
            }
            this.profile.CandidateSalaryDetails.CandidateID = this.params;
            this._profileBankService.editCandidateSalaryDetails(this.profile.CandidateSalaryDetails)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.params);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }

    onAddQualification(): void {
        //   Add New Qualification
        if (this.qualification.QualificationID === undefined) {
            this.qualification.CandidateID = this.profile.CandidateID;
            this.qualification.Qualification.Id = this.selectedQualification;
            this.qualification.Grade.Id = this.selectedGrade;
            this.qualification.Qualification.Value = this.qualification.Grade.Value = null;

            if (this.params) {
                this._profileBankService.addCandidateQualification(this.qualification)
                    .subscribe(
                    results => {

                        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                            this.toastr.success((<ResponseFromAPI>results).Message);
                            this.createQualification();
                            this.getCandidateQualification();
                        } else {
                            this.toastr.error((<ResponseFromAPI>results).Message);
                        }
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.toastr.error(<any>error);
                    });
            }
        } else {
            //update Qualification
            if (this.selectedQualification !== undefined) {
                this.qualification.Qualification = new MasterData();
                this.qualification.Qualification.Id = this.selectedQualification;
            } else {
                this.qualification.Qualification.Id = this.qualification.Qualification.Id;
            }

            if (this.selectedGrade !== undefined) {
                this.qualification.Grade = new MasterData();
                this.qualification.Grade.Id = this.selectedGrade;
            } else {
                this.qualification.Grade.Id = this.qualification.Grade.Id;
            }


            if (this.params) {
                this._profileBankService.editCandidateQualification(this.qualification)
                    .subscribe(
                    results => {
                        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                            this.toastr.success((<ResponseFromAPI>results).Message);
                            this.createQualification();
                            this.IsHidden = true;
                            this.getCandidateQualification();
                        } else {
                            this.toastr.error((<ResponseFromAPI>results).Message);
                        }
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.createQualification();
                        this.toastr.error(<any>error);
                    });
            }
        }
    }

    getCandidateQualification() {
        if (this.params) {
            this._profileBankService.getCandidateQualifications(this.params)
                .subscribe(
                results => {
                    this.profile.CandidateQualification = new Array<Qualification>();
                    this.profile.CandidateQualification = <any>results;
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }

    editQualidficationData(QID: string) {
        if (this.params) {
            this._profileBankService.getQualificationById(this.params, QID.toString())
                .subscribe(
                (results: Qualification) => {
                    this.qualification = results;
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }

    Back() {
        this._router.navigate(['/App/ProfileBank/CompanyProfiles']);
    }
}
