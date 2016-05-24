import {Component } from '@angular/core';
import { Router, RouteSegment, ROUTER_DIRECTIVES, OnActivate } from '@angular/router';
import { BlackListedProfilesService } from '../services/blacklistedProfiles.service';
import { MyProfilesInfo, Qualification, Masters } from '../../myProfiles/model/myProfilesInfo';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';
import { AlertComponent } from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'rrf-black-listed-profile-add',
    templateUrl: 'blackListedProfilesAdd.component.html',
    directives: [ROUTER_DIRECTIVES, AlertComponent],
    styleUrls: ['../../myProfiles/components/myProfiles.component.css']
})

export class BlackListedProfilesAddComponent implements OnActivate {

    profile: MyProfilesInfo;
    qualification: Qualification;
    errorMessage: string;
    params: string;

    countries: Array<Masters>;
    states: Array<Masters>;
    districts: Array<Masters>;

    qualifications: Array<Masters>;
    grades: Array<Masters>;
    years: Array<Masters>;
    selectedQualification: number;
    selectedYear: number;
    selectedGrade: number;
    Marks: number;

    IsCurrentAddressSameAsPermanentChecked: boolean = false;
    IsOutstationedCandidateChecked: boolean = false;
    IsReadyToRelocateChecked: boolean = false;

    IsHidden: boolean = true;
    IsSuccess: boolean = false;
    public alerts: Array<Object>;

    public closeAlert(i: number): void {
        this.alerts.splice(i, 1);
    }

    constructor(private _blacklistedProfilesService: BlackListedProfilesService,
        private _router: Router,
        private _masterService: MastersService) {
        this.profile = new MyProfilesInfo();
        this.createQualification();
        this.alerts = new Array<Object>();
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
        this._blacklistedProfilesService.getCandidateProfile(profileId)
            .subscribe(
            results => {
                this.profile = <any>results;
                this.convertCheckboxesValuesToBoolean();
            },
            error => this.errorMessage = <any>error);
    }

    convertCheckboxesValuesToBoolean() {
        if (this.profile.IsCurrentSameAsPermanent === 'Yes' || this.profile.IsCurrentSameAsPermanent === 'yes') {
            this.profile.IsCurrentSameAsPermanent = true;
        } else {
            this.profile.IsCurrentSameAsPermanent = false;
        }

        if (this.profile.ReadyToRelocate === 'Yes' || this.profile.ReadyToRelocate === 'yes') {
            this.profile.ReadyToRelocate = true;
        } else {
            this.profile.ReadyToRelocate = false;
        }

        if (this.profile.OutstationedCandidate === 'Yes' || this.profile.OutstationedCandidate === 'yes') {
            this.profile.OutstationedCandidate = true;
        } else {
            this.profile.OutstationedCandidate = false;
        }

        if (this.profile.TeamMgmt === 'Yes' || this.profile.TeamMgmt === 'yes') {
            this.profile.TeamMgmt = true;
        } else {
            this.profile.TeamMgmt = false;
        }

        if (this.profile.AppliedEarlier === 'Yes' || this.profile.AppliedEarlier === 'yes') {
            this.profile.AppliedEarlier = true;
        } else {
            this.profile.AppliedEarlier = false;
        }

        if (this.profile.OfferInHand === 'Yes' || this.profile.OfferInHand === 'yes') {
            this.profile.OfferInHand = true;
        } else {
            this.profile.OfferInHand = false;
        }

        if (this.profile.CTCIncludeVariable === 'Yes' || this.profile.CTCIncludeVariable === 'yes') {
            this.profile.CTCIncludeVariable = true;
        } else {
            this.profile.CTCIncludeVariable = false;
        }
    }

    convertCheckboxesValues() {
        if (this.profile.IsCurrentSameAsPermanent === true) {
            this.profile.IsCurrentSameAsPermanent = 'Yes';
        } else {
            this.profile.IsCurrentSameAsPermanent = 'No';
        }

        if (this.profile.ReadyToRelocate === true) {
            this.profile.ReadyToRelocate = 'Yes';
        } else {
            this.profile.ReadyToRelocate = 'No';
        }

        if (this.profile.OutstationedCandidate === true) {
            this.profile.OutstationedCandidate = 'Yes';
        } else {
            this.profile.OutstationedCandidate = 'No';
        }

        if (this.profile.TeamMgmt === true) {
            this.profile.TeamMgmt = 'Yes';
        } else {
            this.profile.TeamMgmt = 'No';
        }

        if (this.profile.AppliedEarlier === true) {
            this.profile.AppliedEarlier = 'Yes';
        } else {
            this.profile.AppliedEarlier = 'No';
        }

        if (this.profile.OfferInHand === true) {
            this.profile.OfferInHand = 'Yes';
        } else {
            this.profile.OfferInHand = 'No';
        }

        if (this.profile.CTCIncludeVariable === true) {
            this.profile.CTCIncludeVariable = 'Yes';
        } else {
            this.profile.CTCIncludeVariable = 'No';
        }
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
        this.qualification.Qualification = new Masters;
        this.qualification.Grade = new Masters;
        this.qualification.YearOfPassing = new Masters;
    }

    onSelectCountry(country: number) {
        for (var i = 0; i < this.countries.length; i++) {
            if (this.countries[i].Id === country) {
                this.profile.Country = this.countries[i].Id;
            }
        }
    }

    onSelectState(state: number) {
        for (var i = 0; i < this.states.length; i++) {
            if (this.states[i].Id === state) {
                this.profile.State = this.states[i].Id;
            }
        }
    }

    onSelectDistrict(district: number) {
        for (var i = 0; i < this.districts.length; i++) {
            if (this.districts[i].Id === district) {
                this.profile.District = this.districts[i].Id;
            }
        }
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
            this._blacklistedProfilesService.editCandidateProfile(this.profile)
                .subscribe(
                results => {
                    this.alerts.push({ msg: 'Details Saved Sucessfully!', type: 'success', closable: true });
                    this.getCandidateProfileById(this.params);
                },
                error => {
                    this.errorMessage = <any>error;
                    this.alerts.push({ msg: 'Oops! Somthing Went Wrong', type: 'danger', closable: true });
                });
        }
    }

    onSavePersonalDetails(): void {
        //   this.showMessage('Wait', true);
        this.convertCheckboxesValues();
        if (this.params) {
            this._blacklistedProfilesService.editCandidatePersonalDetails(this.profile)
                .subscribe(
                results => {
                    this.alerts.push({ msg: 'Details Saved Sucessfully!', type: 'success', closable: true });
                    this.getCandidateProfileById(this.params);
                },
                error => {
                    this.errorMessage = <any>error;
                    this.alerts.push({ msg: 'Oops! Somthing Went Wrong', type: 'danger', closable: true });
                });
        }
    }

    onSaveProfessionalDetails(): void {
        //   this.showMessage('Wait', true);
        this.convertCheckboxesValues();
        if (this.params) {
            this._blacklistedProfilesService.editCandidateProfessionalDetails(this.profile)
                .subscribe(
                results => {
                    this.alerts.push({ msg: 'Details Saved Sucessfully!', type: 'success', closable: true });
                    this.getCandidateProfileById(this.params);
                },
                error => {
                    this.errorMessage = <any>error;
                    this.alerts.push({ msg: 'Oops! Somthing Went Wrong', type: 'danger', closable: true });
                });
        }
    }

    onSaveQualificationDetails(): void {
        //   this.showMessage('Wait', true);
        if (this.params) {
            this._blacklistedProfilesService.editCandidateQualificationDetails(this.profile)
                .subscribe(
                results => {

                    this.getCandidateProfileById(this.params);
                },
                error => {
                    this.errorMessage = <any>error;
                    this.alerts.push({ msg: 'Oops! Somthing Went Wrong', type: 'danger', closable: true });
                });
        }
    }

    onSaveSkillsDetails(): void {
        //   this.showMessage('Wait', true);
        if (this.params) {
            this._blacklistedProfilesService.editCandidateSkillsDetails(this.profile)
                .subscribe(
                results => {
                    this.alerts.push({ msg: 'Details Saved Sucessfully!', type: 'success', closable: true });
                    this.getCandidateProfileById(this.params);
                },
                error => {
                    this.errorMessage = <any>error;
                    this.alerts.push({ msg: 'Oops! Somthing Went Wrong', type: 'danger', closable: true });
                });
        }
    }

    onSaveTeamManagementDetails(): void {
        //   this.showMessage('Wait', true);
        this.convertCheckboxesValues();
        if (this.params) {
            this._blacklistedProfilesService.editCandidateTeamManagementDetails(this.profile)
                .subscribe(
                results => {
                    this.alerts.push({ msg: 'Details Saved Sucessfully!', type: 'success', closable: true });
                    this.getCandidateProfileById(this.params);
                },
                error => {
                    this.errorMessage = <any>error;
                    this.alerts.push({ msg: 'Oops! Somthing Went Wrong', type: 'danger', closable: true });
                });
        }
    }

    onSaveCareerProfileDetails(): void {
        //   this.showMessage('Wait', true);
        if (this.params) {
            this._blacklistedProfilesService.editCandidateCareerDetails(this.profile)
                .subscribe(
                results => {
                    this.alerts.push({ msg: 'Details Saved Sucessfully!', type: 'success', closable: true });
                    this.getCandidateProfileById(this.params);
                },
                error => {
                    this.errorMessage = <any>error;
                    this.alerts.push({ msg: 'Oops! Somthing Went Wrong', type: 'danger', closable: true });
                }
                );
        }
    }

    onSaveSalaryDetails(): void {
        //   this.showMessage('Wait', true);
        this.convertCheckboxesValues();
        if (this.params) {
            this._blacklistedProfilesService.editCandidateSalaryDetails(this.profile)
                .subscribe(
                results => {
                    this.alerts.push({ msg: 'Details Saved Sucessfully!', type: 'success', closable: true });
                    this.getCandidateProfileById(this.params);
                },
                error => {
                    this.errorMessage = <any>error;
                    this.alerts.push({ msg: 'Oops! Somthing Went Wrong', type: 'danger', closable: true });
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
                this._blacklistedProfilesService.addCandidateQualification(this.qualification)
                    .subscribe(
                    results => {
                        this.createQualification();
                        this.getCandidateQualifications();
                        this.alerts.push({ msg: 'Qualification Added Sucessfully!', type: 'success', closable: true });
                    },
                    error => {
                        this.createQualification();
                        this.errorMessage = <any>error;
                        this.alerts.push({ msg: 'Oops! Somthing Went Wrong', type: 'danger', closable: true });
                    });
            }
        } else {
            //update
            if (this.selectedQualification !== undefined) {
                this.qualification.Qualification = new Masters;
                this.qualification.Qualification = this.selectedQualification;
            } else {
                this.qualification.Qualification = this.qualification.Qualification.Id;
            }

            if (this.selectedGrade !== undefined) {
                this.qualification.Grade = new Masters;
                this.qualification.Grade = this.selectedGrade;
            } else {
                this.qualification.Grade = this.qualification.Grade.Id;
            }
            if (this.selectedYear !== undefined) {
                this.qualification.YearOfPassing = new Masters;
                this.qualification.YearOfPassing = this.selectedYear;
            } else {
                this.qualification.YearOfPassing = this.qualification.YearOfPassing.Id;
            }

            if (this.params) {
                this._blacklistedProfilesService.editCandidateQualification(this.qualification)
                    .subscribe(
                    results => {
                        this.createQualification();
                        this.IsHidden = true;
                        this.getCandidateQualifications();
                        this.alerts.push({ msg: 'Details Updated Sucessfully!', type: 'success', closable: true });
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.createQualification();
                        this.alerts.push({ msg: 'Oops! Somthing Went Wrong', type: 'danger', closable: true });

                    });
            }
        }
    }

    getCandidateQualifications() {
        if (this.params) {
            this._blacklistedProfilesService.getCandidateQualifications(this.params)
                .subscribe(
                results => {
                    this.profile.Qualifications = new Array<Qualification>();
                    this.profile.Qualifications = <any>results;
                },
                error => {
                    this.errorMessage = <any>error;
                });
        }
    }

    editQualidficationData(QID: number) {
        var index = _.findIndex(this.profile.Qualifications, { QualificationID: QID });
        this.qualification = this.profile.Qualifications[index];
        this.IsHidden = false;
    }
}
