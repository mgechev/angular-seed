import {Component } from '@angular/core';
import { Router, OnActivate, ROUTER_DIRECTIVES, RouteSegment } from '@angular/router';
import {RRFDetails, Panel } from '../models/rrfDetails';
import { MyRRFService } from '../services/myRRF.service';
import { MastersService } from '../../../shared/services/masters.service';
import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { APIResult, RRFPriority } from  '../../../shared/constantValue/index';
import { MasterData, ResponseFromAPI } from '../../../shared/model/common.model';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { DropdownMultiSelectComponent } from '../../../shared/components/dropdownMultiSelect/dropdownMultiSelect.component';

//MultipleDrodown
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';


@Component({
    moduleId: module.id,
    selector: 'rrf-myrrf-add',
    templateUrl: 'myRRFAdd.component.html',
    directives: [ROUTER_DIRECTIVES, SELECT_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES,
    BUTTON_DIRECTIVES, TOOLTIP_DIRECTIVES,DropdownMultiSelectComponent],
    providers: [ToastsManager]
})

export class MyRRFAddComponent implements OnActivate {
    newRRF: RRFDetails = new RRFDetails();
    panel: Panel = new Panel();
    errorMessage: string = '';
    designations: MasterData[];
    practices: MasterData[];
    technologies: MasterData[];
    skills: MasterData[];
    interviewRound: MasterData[];
    interviewers: MasterData[];
    isNewRRF: boolean = true; //TODO
    comment: string;
    IntwRound: number = 0;
    priorities: MasterData[];
    updatePanel: boolean = false;
    editPanelData: Panel = new Panel();
    RRFId: MasterData = new MasterData();
    ExpDateOfJoining: any;
    params: string;
    mindate : Date;


    constructor(private _myRRFService: MyRRFService,
        private _router: Router,
        private _mastersService: MastersService,
        public toastr: ToastsManager) {
        // this.newRRF.Panel.push(this.panel);
        this.getDesignation();
        this.getPractice();
        this.getTechnologies();
        this.getSkills();
        this.getInterviewRound();
        this.getInterviewers();
        this.GetPriority();
    }

    routerOnActivate(segment: RouteSegment): void {
        //TO display Date picker
        // $('#expectedDateOfJoining').datepicker();

        //To display up and down arrow for number selection
        // $('input[name="demo_vertica"]').TouchSpin({
        //     verticalbuttons: true,
        //     stepinterval: 0.5
        // });

        this.setMinDateToCalender();
        
        //dropdown with multi selector and search
        $('#cmbInterviewer').select2();
        $('#cmbSkillsReq').select2();


        if (segment.getParam('id') !== undefined) {
            this.params = segment.getParam('id');
            if (this.params) {
                this.RRFId.Id = parseInt(this.params.split('ID')[1]);
                this.RRFId.Value = this.params.split('ID')[0];
            }
            //this.RRFId = segment.getParam('id');
            this.isNewRRF = false;
            this.getRRFByID(this.RRFId);
        }

        if (this.isNewRRF) {
            this.newRRF.NoOfOpenings = 1;

            this.newRRF.MinExp = 0;
            this.newRRF.MaxExp = 0;

            this.newRRF.Practice.Id = 0;
            this.newRRF.Technology.Id = 0;
            //this.newRRF.SkillsRequired.Id = 0;
            this.newRRF.Priority.Id = 0;
            this.newRRF.Designation.Id = 0;
            $('#cmbInterviewer').val = ['0'];
        }
    }

    addPanel(): void {
        var addPanel: Panel = new Panel();
        this.newRRF.Panel.push(addPanel);
    }

    raiseRRF(): void {
        if(this.newRRF.Panel.length == 0){
            this.toastr.error('Please select interview panel Details');
            return ;
        }
         if(this.newRRF.SkillsRequired.length == 0){
            this.toastr.error('Please select Required skills');
            return ;
        }
        if (this.isNewRRF) {
            this.setSkillToObject();
            if (this.newRRF.MinExp <= this.newRRF.MaxExp) {
                this._myRRFService.raiseRRF(this.newRRF)
                    .subscribe(
                    results => {
                        if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                            this.toastr.success((<ResponseFromAPI>results).Message);
                            this._router.navigate(['/App/RRF/RRFDashboard/']);
                        } else {
                            this.toastr.error((<ResponseFromAPI>results).Message);
                        }
                    },
                    error => this.errorMessage = <any>error);
            } else {
                this.toastr.error('MinExp should be less than MaxExp');
            }
        }
    }

    onCancelClick(): void {
        this._router.navigate(['/App/RRF/RRFDashboard/']);
    }

    getDesignation(): void {
        this._mastersService.GetDesignations()
            .subscribe(
            results => {
                this.designations = results;
            },
            error => this.errorMessage = <any>error);
    }

    GetPriority(): void {
        this._mastersService.GetPriority()
            .subscribe(
            results => {
                this.priorities = results;
            },
            error => this.errorMessage = <any>error);
    }

    getPractice(): void {
        this._mastersService.getPractices()
            .subscribe(
            results => {
                this.practices = results;
            },
            error => this.errorMessage = <any>error);
    }

    getTechnologies(): void {
        this._mastersService.getTechnologies()
            .subscribe(
            results => {
                this.technologies = results;
            },
            error => this.errorMessage = <any>error);
    }

    getSkills(): void {
        this._mastersService.getSkills()
            .subscribe(
            results => {
                this.skills = results;
            },
            error => this.errorMessage = <any>error);
    }

    getInterviewRound(): void {
        this._mastersService.getRounds()
            .subscribe(
            results => {
                this.interviewRound = results;
            },
            error => this.errorMessage = <any>error);
    }

    getInterviewers(): void {
        this._mastersService.getInterviewers()
            .subscribe(
            results => {
                this.interviewers = results;
            },
            error => this.errorMessage = <any>error);
    }

    onAddPanel(): void {
        for (var i = 0; i < this.newRRF.Panel.length; i++) {
            if (+this.newRRF.Panel[0].RoundNumber.Id === +this.IntwRound) {
                alert('This interview round is all ready exist.');
                return;
            }
        }

        var panel: Panel = new Panel();
        //panel.Comments = this.comment; //As per request from Backend
        panel.RoundNumber = this.getStringValue(this.IntwRound, this.interviewRound);

        if ($('#cmbInterviewer').val() !== null) {
            var selectedInterviewer: number[] = $('#cmbInterviewer').val();
        }
        for (var index = 0; index < selectedInterviewer.length; index++) {
            panel.Interviewers.push(this.getStringValue(selectedInterviewer[index], this.interviewers));
        }
        this.newRRF.Panel.push(panel);
        this.clearIntwPanel();

    }

    clearIntwPanel() {
        this.IntwRound = 0;
        $('#cmbInterviewer').select2('val', '');
    }
    getStringValue(roundID: number, list: MasterData[]): MasterData {
        for (var index = 0; index < list.length; index++) {
            if (+(list[index].Id) === +(roundID)) {
                return list[index];
            }
        }
        return new MasterData;
    }

    onDropDownValueChanged(Value: number, Id: string) {
        switch (Id) {
            case 'cmbIntwRound':
                break;
            default:
        }
    }

    onPanelEdit(panelData: Panel) {
        this.IntwRound = panelData.RoundNumber.Id;
        var panelId: string[] = new Array();
        for (var index = 0; index < panelData.Interviewers.length; index++) {
            panelId.push((panelData.Interviewers[index].Id).toString());
        }
        $('#cmbInterviewer').select2('val', panelId);

        this.IntwRound = panelData.RoundNumber.Id;
        this.updatePanel = true;
        this.editPanelData = panelData;
    }

    onPanelCancel() {
        this.updatePanel = false;
        this.clearIntwPanel();
    }

    onUpdatePanelClick() {
        this.editPanelData.RoundNumber = this.getStringValue(this.IntwRound, this.interviewRound);
        if ($('#cmbInterviewer').val() !== null) {
            var selectedInterviewer: number[] = $('#cmbInterviewer').val();
        }
        this.editPanelData.Interviewers = new Array();
        for (var index = 0; index < selectedInterviewer.length; index++) {
            this.editPanelData.Interviewers.push(this.getStringValue(selectedInterviewer[index], this.interviewers));
        }

        this.updatePanel = false;
        this.clearIntwPanel();
    }

    onPanelDelete(panelData: Panel) {
        for (var i = 0; i < this.newRRF.Panel.length; i++) {
            if (+this.newRRF.Panel[i].RoundNumber.Id === +panelData.RoundNumber.Id) {
                this.newRRF.Panel.splice(i, 1);
            }
        }
        this.updatePanel = false;
        this.clearIntwPanel();

    }

    getRRFByID(rrfId: MasterData) {
        this._myRRFService.getRRFByID(rrfId.Value)
            .subscribe(
            (results: RRFDetails) => {
                this.newRRF = results;
                this.ExpDateOfJoining = this.formatDate(results.ExpDateOfJoining);
                this.setSkillDropdown();
            },
            error => this.errorMessage = <any>error);
    }

    setSkillDropdown() {
        // var panelId: string[] = new Array();
        // for (var index = 0; index < this.newRRF.SkillsRequired.length; index++) {
        //     panelId.push((this.newRRF.SkillsRequired[index].Id).toString());
        // }
        // $('#cmbSkillsReq').select2('val', panelId);
    }

    setSkillToObject() {

        // if ($('#cmbSkillsReq').val() !== null) {
        //     var selectedSkill: number[] = $('#cmbSkillsReq').val();
        // }
        // this.newRRF.SkillsRequired = new Array();
        // for (var j = 0; j < selectedSkill.length; j++) {
        //     this.newRRF.SkillsRequired.push(this.getStringValue(selectedSkill[j], this.skills));
        // }
    }

    onUpdateClick() {
        this.setSkillToObject();
        this._myRRFService.UpdateRRF(this.newRRF)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                    this._router.navigate(['/App/RRF/RRFDashboard/']);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).ErrorMsg);
                }
            },
            error => this.errorMessage = <any>error);
    }

    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    setMinDateToCalender() {
        var todayDate = new Date();
        this.mindate = (<any>this.formatDate(todayDate));
    }
}
