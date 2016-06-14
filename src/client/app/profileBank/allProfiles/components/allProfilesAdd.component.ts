import {Component} from '@angular/core';
import { Router, RouteSegment, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import {MyProfilesInfo, Qualification} from '../../myProfiles/model/myProfilesInfo';
import { AllProfilesService } from '../services/allProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { AlertComponent } from 'ng2-bootstrap';
import { MasterData, ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';

@Component({
    moduleId: module.id,
    selector: 'rrf-allprofiles-add',
    templateUrl: 'allProfilesAdd.component.html',
    directives: [ROUTER_DIRECTIVES, AlertComponent],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class AllProfilesAddComponent implements OnActivate {
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
    CurrentQualification: number;
    CurrentYear: number;
    CurrentGrade: number;

    IsCurrentAddressSameAsPermanentChecked: boolean = false;
    IsOutstationedCandidateChecked: boolean = false;
    IsReadyToRelocateChecked: boolean = false;

    IsHidden: boolean = true;
    IsSuccess: boolean = false;

    infoNotSavedAlert: boolean = false;

    constructor(private _allProfilesService: AllProfilesService,
        private _router: Router,
        public toastr: ToastsManager,
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
        this._allProfilesService.getCandidateProfile(profileId)
            .subscribe(
            results => {
                this.profile = <any>results;
                //this.convertCheckboxesValuesToBoolean();
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });
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

    createQualification() {
        this.qualification = new Qualification();
        this.qualification.Qualification = new MasterData;
        this.qualification.Grade = new MasterData;
        this.qualification.YearOfPassing = new MasterData;
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
            this._allProfilesService.editCandidateProfile(this.profile)
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
            this._allProfilesService.editCandidatePersonalDetails(this.profile)
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
     //   this.convertCheckboxesValues();
        if (this.params) {
            this.profile.CandidateOtherDetails.CandidateID = this.params;
            this._allProfilesService.editCandidateProfessionalDetails(this.profile.CandidateOtherDetails)
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
            this._allProfilesService.editCandidateSkillsDetails(this.profile.CandidateSkills)
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
            this._allProfilesService.editCandidateTeamManagementDetails(this.profile)
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
            this._allProfilesService.editCandidateCareerDetails(this.profile)
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
            this.profile.CandidateSalaryDetails.CandidateID = this.params;
            this._allProfilesService.editCandidateSalaryDetails(this.profile.CandidateSalaryDetails)
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
        if (this.qualification.QualificationID === undefined) {
            this.qualification.CandidateID = this.profile.CandidateID;
            this.qualification.Qualification = this.selectedQualification;
            this.qualification.Grade = this.selectedGrade;
            this.qualification.YearOfPassing = this.selectedYear;

            if (this.params) {
                this._allProfilesService.addCandidateQualification(this.qualification)
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
                        this.createQualification();
                        this.errorMessage = <any>error;
                        this.toastr.error(<any>error);
                    });
            }
        } else {
            //update
            if (this.selectedQualification !== undefined) {
                this.qualification.Qualification = new MasterData;
                this.qualification.Qualification = this.selectedQualification;
            } else {
                this.qualification.Qualification = this.qualification.Qualification.Id;
            }

            if (this.selectedGrade !== undefined) {
                this.qualification.Grade = new MasterData;
                this.qualification.Grade = this.selectedGrade;
            } else {
                this.qualification.Grade = this.qualification.Grade.Id;
            }
            if (this.selectedYear !== undefined) {
                this.qualification.YearOfPassing = new MasterData;
                this.qualification.YearOfPassing = this.selectedYear;
            } else {
                this.qualification.YearOfPassing = this.qualification.YearOfPassing.Id;
            }

            if (this.params) {
                this._allProfilesService.editCandidateQualification(this.qualification)
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
            this._allProfilesService.getCandidateQualifications(this.params)
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
