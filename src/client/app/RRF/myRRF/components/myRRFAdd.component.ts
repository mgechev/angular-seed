import {Component} from '@angular/core';
import { Router, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';
import {RRFDetails, Panel, MasterData } from '../models/rrfDetails';
import { MyRRFService } from '../services/myRRF.service';
import { MastersService } from '../../../shared/services/masters.service';

@Component({
    moduleId: module.id,
    selector: 'rrf-myrrf-add',
    templateUrl: 'myRRFAdd.component.html',
    directives: [ROUTER_DIRECTIVES]
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

    constructor(private _myRRFService: MyRRFService,
        private _router: Router,
        private _mastersService: MastersService) {
        this.newRRF.Panel.push(this.panel);
        this.getDesignation();
        this.getPractice();
        this.getTechnologies();
        this.getSkills();
        this.getInterviewRound();
        this.getInterviewers();
    }

    routerOnActivate(): void {
        //TO display Date picker
        $('#expectedDateOfJoining').datepicker();

        //To display up and down arrow for number selection
        $('input[name="demo_vertica"]').TouchSpin({
            verticalbuttons: true,
            stepinterval: 0.5
        });

        //dropdown with multi selector and search
        $('#cmbInterviewer').select2();
    }

    addPanel(): void {
        var addPanel: Panel = new Panel();
        this.newRRF.Panel.push(addPanel);
    }

    raiseRRF(): void {
        this._myRRFService.raiseRRF(this.newRRF)
            .subscribe(
            results => {
                this._router.navigate(['/RRF/RRFDashboard/']);
            },
            error => this.errorMessage = <any>error);
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
}
