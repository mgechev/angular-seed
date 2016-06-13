import {Component} from '@angular/core';
import { Router, RouteSegment, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import { RecentProfilesService } from '../services/recentProfiles.service';
import { MyProfilesInfo, Qualification } from '../../myProfiles/model/myProfilesInfo';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { MasterData,ResponseFromAPI } from  '../../../shared/model/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult } from  '../../../shared/constantValue/index';


@Component({
    moduleId: module.id,
    selector: 'rrf-recent-profiles-add',
    templateUrl: 'recentProfilesAdd.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class RecentProfilesAddComponent implements OnActivate {
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

    constructor(private _recentProfilesService: RecentProfilesService,
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
        this._recentProfilesService.getCandidateProfile(profileId)
            .subscribe(
            results => {
                this.profile = <any>results;
               // this.convertCheckboxesValuesToBoolean();
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
        //   this.showMessage('Wait', true);
        if (this.params) {
            this._recentProfilesService.editCandidateProfile(this.profile)
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
        //   this.showMessage('Wait', true);
     //   this.convertCheckboxesValues();
        if (this.params) {
            this._recentProfilesService.editCandidatePersonalDetails(this.profile)
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
            this._recentProfilesService.editCandidateProfessionalDetails(this.profile.CandidateOtherDetails)
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
            this._recentProfilesService.editCandidateSkillsDetails(this.profile.CandidateSkills)
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
            this._recentProfilesService.editCandidateTeamManagementDetails(this.profile)
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
            this._recentProfilesService.editCandidateCareerDetails(this.profile)
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
            this._recentProfilesService.editCandidateSalaryDetails(this.profile.CandidateSalaryDetails)
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
        //this.showMessage(this.errorMessage, false);

        if (this.qualification.QualificationID === undefined) {
            this.qualification.CandidateID = this.profile.CandidateID;
            this.qualification.Qualification = this.selectedQualification;
            this.qualification.Grade = this.selectedGrade;
            this.qualification.YearOfPassing = this.selectedYear;

            if (this.params) {
                this._recentProfilesService.addCandidateQualification(this.qualification)
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
                this._recentProfilesService.editCandidateQualification(this.qualification)
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
            this._recentProfilesService.getCandidateQualifications(this.params)
                .subscribe(
                results => {
                    this.profile.Qualifications = new Array<Qualification>();
                    this.profile.Qualifications = <any>results;
                },
                error => {
                    this.errorMessage = <any>error;
                     this.toastr.error(<any>error);
                });
        }
    }

    editQualidficationData(QID: number) {
        var index = _.findIndex(this.profile.Qualifications, { QualificationID: QID });
        this.qualification = this.profile.Qualifications[index];
        this.IsHidden = false;
    }
}
