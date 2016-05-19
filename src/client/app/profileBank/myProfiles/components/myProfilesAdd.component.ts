import {Component} from '@angular/core';
import { Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment } from '@angular/router';
import { MyProfilesInfo, Qualification, Masters } from '../model/myProfilesInfo';
import { MyProfilesService } from '../services/myProfiles.service';
import { MastersService } from '../../../shared/services/masters.service';
import * as  _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'rrf-myprofiles-add',
    templateUrl: 'myProfilesAdd.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['myProfiles.component.css']
})

export class MyProfilesAddComponent implements OnActivate {
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
    selectedQualification: Masters;
    selectedYear: Masters;
    selectedGrade: Masters;
    Marks: number;
    CurrentQualification: number;
    CurrentYear: number;
    CurrentGrade: number;

    IsCurrentAddressSameAsPermanentChecked: boolean = false;
    IsOutstationedCandidateChecked: boolean = false;
    IsReadyToRelocateChecked: boolean = false;

    IsHidden: boolean = true;
    constructor(private _myProfilesService: MyProfilesService,
        private _masterService: MastersService,
        private _router: Router) {
        this.profile = new MyProfilesInfo();
        this.qualification = new Qualification();
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
        this._myProfilesService.getCandidateProfile(profileId)
            .subscribe(
            results => {
                this.profile = results;
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
        this.qualification.Qualification = new Array<Masters>();
        this.qualification.Grade = new Array<Masters>();
        this.qualification.YearOfPassing = new Array<Masters>();

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

    onSelectQualification(candidateQualification: number) {
        for (var i = 0; i < this.qualifications.length; i++) {
            if (this.qualifications[i].Id === candidateQualification) {
                this.selectedQualification = this.qualifications[i];
            }
        }
    }

    onSelectGrade(grade: number) {
        for (var i = 0; i < this.grades.length; i++) {
            if (this.grades[i].Id === grade) {
                this.selectedGrade = this.grades[i];
            }
        }
    }

    onSelectYear(year: number) {
        for (var i = 0; i < this.years.length; i++) {
            if (this.years[i].Id === year) {
                this.selectedYear = this.years[i];
            }
        }
    }

    onSameAddressChecked(value: string) {
        if (value !== undefined) {
            this.profile.PermanentAddress = this.profile.CurrentAddress;
        }else {
            this.profile.PermanentAddress = '';
        }
    }

    onSavePrimaryInfo(): void {
     //   this.showMessage('Wait', true);
        if (this.params) {
            this._myProfilesService.editCandidateProfile(this.profile)
                .subscribe(
                results => {
                    //   this.showMessage('Details Saved Sucessfully', false);
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSavePersonalDetails(): void {
     //   this.showMessage('Wait', true);
        if (this.params) {
            this._myProfilesService.editCandidatePersonalDetails(this.profile)
                .subscribe(
                results => {
                    //   this.showMessage('Details Saved Sucessfully', false);
                },
                error => {
                    this.errorMessage = <any>error;
                    //this.showMessage(this.errorMessage, false);
                });
        }
    }

    onSaveProfessionalDetails(): void {
     //   this.showMessage('Wait', true);
        if (this.params) {
            this._myProfilesService.editCandidateProfessionalDetails(this.profile)
                .subscribe(
                results => {
                    //   this.showMessage('Details Saved Sucessfully', false);
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSaveQualificationDetails(): void {
     //   this.showMessage('Wait', true);
        if (this.params) {
            this._myProfilesService.editCandidateQualificationDetails(this.profile)
                .subscribe(
                results => {
                    //   this.showMessage('Details Saved Sucessfully', false);
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSaveSkillsDetails(): void {
     //   this.showMessage('Wait', true);
        if (this.params) {
            this._myProfilesService.editCandidateSkillsDetails(this.profile)
                .subscribe(
                results => {
                    //   this.showMessage('Details Saved Sucessfully', false);
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSaveTeamManagementDetails(): void {
     //   this.showMessage('Wait', true);
        if (this.params) {
            this._myProfilesService.editCandidateTeamManagementDetails(this.profile)
                .subscribe(
                results => {
                    //   this.showMessage('Details Saved Sucessfully', false);
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSaveCareerProfileDetails(): void {
     //   this.showMessage('Wait', true);
        if (this.params) {
            this._myProfilesService.editCandidateCareerDetails(this.profile)
                .subscribe(
                results => {
                    //   this.showMessage('Details Saved Sucessfully', false);
                },
                error => this.errorMessage = <any>error);
        }
    }
    onSaveSalaryDetails(): void {
     //   this.showMessage('Wait', true);

        if (this.params) {
            this._myProfilesService.editCandidateSalaryDetails(this.profile)
                .subscribe(
                results => {
                    //   this.showMessage('Details Saved Sucessfully', false);
                },
                error => {
                    this.errorMessage = <any>error;
                    //this.showMessage(this.errorMessage, false);
                });
        }
    }

    onAddQualification(): void {
     //   this.showMessage('Wait', true);

        if (this.qualification.QualificationID === undefined) {
            this.qualification.Qualification = new Array<Masters>();
            this.qualification.Grade = new Array<Masters>();
            this.qualification.YearOfPassing = new Array<Masters>();

            this.qualification.CandidateID = this.profile.CandidateID;
            this.qualification.Qualification.push(this.selectedQualification);
            this.qualification.Grade.push(this.selectedGrade);
            this.qualification.YearOfPassing.push(this.selectedYear);

            if (this.params) {
                this._myProfilesService.addCandidateQualification(this.qualification)
                    .subscribe(
                    results => {
                        this.qualification = new Qualification();
                        this.getCandidateQualifications();
                    },
                    error => {
                        this.errorMessage = <any>error;
                        //this.showMessage(this.errorMessage, false);
                    });
            }
        } else {
            //update
            if (this.selectedQualification !== undefined) {
                this.qualification.Qualification = new Array<Masters>();
                this.qualification.Qualification.push(this.selectedQualification);
            }
            if (this.selectedGrade !== undefined) {
                this.qualification.Grade = new Array<Masters>();
                this.qualification.Grade.push(this.selectedGrade);
            }
            if (this.selectedYear !== undefined) {
                this.qualification.YearOfPassing = new Array<Masters>();
                this.qualification.YearOfPassing.push(this.selectedYear);
            }

            if (this.params) {
                this._myProfilesService.editCandidateQualification(this.qualification)
                    .subscribe(
                    results => {
                        this.qualification = new Qualification();
                        this.IsHidden = true;
                        this.getCandidateQualifications();
                    },
                    error => {
                        this.errorMessage = <any>error;
                        //this.showMessage(this.errorMessage, false);
                    });
            }
        }
    }

    getCandidateQualifications() {
        if (this.params) {
            this._myProfilesService.getCandidateQualifications(this.params)
                .subscribe(
                results => {
                    this.profile.Qualifications = new Array<Qualification>();
                    this.profile.Qualifications = results;
                    //   this.showMessage('Details Saved Sucessfully', false);
                },
                error => {
                    this.errorMessage = <any>error;
                    //this.showMessage(this.errorMessage, false);
                });
        }
    }

    editQualidficationData(QID: number) {
        var index = _.findIndex(this.profile.Qualifications, { QualificationID: QID });
        this.qualification = this.profile.Qualifications[index];
        this.qualification.CandidateID = this.profile.CandidateID;
        this.qualification.CurrentQualification = this.profile.Qualifications[index].Qualification[0].Id;
        this.qualification.CurrentGrade = this.profile.Qualifications[index].Grade[0].Id;
        this.qualification.CurrentYear = this.profile.Qualifications[index].YearOfPassing[0].Id;
        this.IsHidden = false;
    }

    showMessage(msg: string, isWait: boolean) {
        var obj = $('.Loader');
        if (isWait) {
            obj = obj.show().html(
                '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>');
        } else {
            obj = $('.Loader').html(msg).fadeIn(400).delay(1500)
                .fadeOut(400);
        }
    }

}
