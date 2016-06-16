import {Component } from '@angular/core';
import { Router, RouteSegment, ROUTER_DIRECTIVES, OnActivate } from '@angular/router';
import { BlackListedProfilesService } from '../services/blacklistedProfiles.service';
import { MyProfilesInfo, Qualification } from '../../shared/model/myProfilesInfo';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';
import { ProfileBankService } from '../../shared/services/profilebank.service';
@Component({
    moduleId: module.id,
    selector: 'rrf-black-listed-profile-add',
    templateUrl: 'blackListedProfilesAdd.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class BlackListedProfilesAddComponent implements OnActivate {

    profile: MyProfilesInfo;
    qualification: Qualification;
    errorMessage: string;
    params: string;

    countries: Array<MasterData>;
    states: Array<MasterData>;
    districts: Array<MasterData>;

    qualifications: Array<MasterData>;
    grades: Array<MasterData>;
    years: Array<MasterData>;
    selectedQualification: number;
    selectedYear: number;
    selectedGrade: number;
    Marks: number;

    IsCurrentAddressSameAsPermanentChecked: boolean = false;
    IsOutstationedCandidateChecked: boolean = false;
    IsReadyToRelocateChecked: boolean = false;

    IsHidden: boolean = true;
    IsSuccess: boolean = false;

    constructor(private _blacklistedProfilesService: BlackListedProfilesService,
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
        this.getStates();
        this.getDistricts();
        this.getQualifications();
        this.getYears();
        this.getGrades();
        //get current profile by Id
        this.params = segment.getParam('id');
        if (this.params) {
            this.getCandidateProfileById(this.params);
        }
        //dropdown with multi selector and search
        // $('select').select2();
    }

    getCandidateProfileById(profileId: string) {
        this._profileBankService.getCandidateProfile(profileId)
            .subscribe(
            results => {
                this.profile = <any>results;
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

    getStates(): void {
        this._masterService.getStates()
            .subscribe(
            results => {
                this.states = results;

            },
            error => this.errorMessage = <any>error);
    }

    getDistricts(): void {
        this._masterService.getDistricts()
            .subscribe(
            results => {
                this.districts = results;
            },
            error => this.errorMessage = <any>error);
    }

    getQualifications(): void {
        this._masterService.getQualifications()
            .subscribe(
            results => {
                this.qualifications = results;
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

    createQualification() {
        this.qualification = new Qualification();
        this.qualification.Qualification = new MasterData();
        this.qualification.Grade = new MasterData();
        this.qualification.YearOfPassing = new MasterData();
    }

    onSelectCountry(country: number) {
        this.profile.Country = country;
    }

    onSelectState(state: number) {
        this.profile.State = state;
    }

    onSelectDistrict(district: number) {
        this.profile.District = district;
    }

    onSelectQualification(candidateQualification: string) {
        this.selectedQualification = parseInt(candidateQualification);
    }

    onSelectGrade(grade: string) {
        this.selectedGrade = parseInt(grade);
    }

    onSelectYear(year: string) {
        this.selectedYear = parseInt(year);
    }

    onSameAddressChecked(value: string) {
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
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
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
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
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
            if (this.profile.PreviousFollowupComments !== this.profile.FollowUpComments.trim().replace(/ +/g, ' ')) {
                this.profile.CommentsUpdated = true;
                this.profile.PreviousFollowupComments = this.profile.FollowUpComments.trim();
            } else {
                this.profile.CommentsUpdated = false;
            }
            this.profile.CandidateOtherDetails.CandidateID = this.params;
            this._profileBankService.editCandidateProfessionalDetails(this.profile.CandidateOtherDetails)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.params);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
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
                this.profile.CommentsUpdated = true;
                this.profile.PreviousFollowupComments = this.profile.FollowUpComments.trim();
            } else {
                this.profile.CommentsUpdated = false;
            }
            this._profileBankService.editCandidateSkillsDetails(this.profile.CandidateSkills)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.params);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
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
                this.profile.CommentsUpdated = true;
                this.profile.PreviousFollowupComments = this.profile.FollowUpComments.trim();
            } else {
                this.profile.CommentsUpdated = false;
            }
            this._profileBankService.editCandidateTeamManagementDetails(this.profile)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.params);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
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
                this.profile.CommentsUpdated = true;
                this.profile.PreviousFollowupComments = this.profile.FollowUpComments.trim();
            } else {
                this.profile.CommentsUpdated = false;
            }
            this._profileBankService.editCandidateCareerDetails(this.profile)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                        this.getCandidateProfileById(this.params);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
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
                this.profile.CommentsUpdated = true;
                this.profile.PreviousFollowupComments = this.profile.FollowUpComments.trim();
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
                        this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
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
            this.qualification.Qualification = this.selectedQualification;
            this.qualification.Grade = this.selectedGrade;
            this.qualification.YearOfPassing = this.selectedYear;

            if (this.params) {
                this._profileBankService.addCandidateQualification(this.qualification)
                    .subscribe(
                    results => {

                        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                            this.toastr.success((<ResponseFromAPI>results).Message);
                            this.createQualification();
                            this.getCandidateQualifications();
                        } else {
                            this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
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
                this.qualification.Qualification = this.selectedQualification;
            } else {
                this.qualification.Qualification = this.qualification.Qualification.Id;
            }

            if (this.selectedGrade !== undefined) {
                this.qualification.Grade = new MasterData();
                this.qualification.Grade = this.selectedGrade;
            } else {
                this.qualification.Grade = this.qualification.Grade.Id;
            }
            if (this.selectedYear !== undefined) {
                this.qualification.YearOfPassing = new MasterData();
                this.qualification.YearOfPassing = this.selectedYear;
            } else {
                this.qualification.YearOfPassing = this.qualification.YearOfPassing.Id;
            }

            if (this.params) {
                this._profileBankService.editCandidateQualification(this.qualification)
                    .subscribe(
                    results => {
                        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                            this.toastr.success((<ResponseFromAPI>results).Message);
                            this.createQualification();
                            this.IsHidden = true;
                            this.getCandidateQualifications();
                        } else {
                            this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
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

    getCandidateQualifications() {
        if (this.params) {
            this._profileBankService.getCandidateQualifications(this.params)
                .subscribe(
                results => {
                    this.profile.CandidateQualifications = new Array<Qualification>();
                    this.profile.CandidateQualifications = <any>results;
                },
                error => {
                    this.errorMessage = <any>error;
                    this.toastr.error(<any>error);
                });
        }
    }

    editQualidficationData(QID: number) {
        var index = _.findIndex(this.profile.CandidateQualifications, { QualificationID: QID });
        this.qualification = this.profile.CandidateQualifications[index];
        this.IsHidden = false;
    }
}
