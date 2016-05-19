import {Component } from '@angular/core';
import { Router, OnActivate, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { SkillInfo } from '../models/skillInfo';
import { SkillService } from '../services/skill.service';

@Component({
    moduleId: module.id,
    selector: 'admin-skill-add',
    templateUrl: 'skillAdd.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class SkillAddComponent implements OnActivate {
    skill: SkillInfo;
    errorMessage: string;
    params: string;
    constructor(private _skillService: SkillService,
        private _router: Router) {
        this.skill = new SkillInfo(0, '');
    }

    routerOnActivate(segment: RouteSegment) {
        this.params = segment.getParam('id');
        if (this.params) {
            this._skillService.getSkillById(this.params)
                .subscribe(
                results=> {
                    this.skill = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._skillService.editSkill(this.skill)
                .subscribe(
                results=> {
                    this._router.navigate(['/App/Admin/Skill']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._skillService.addSkill(this.skill)
                .subscribe(
                results=> {
                    this._router.navigate(['/App/Admin/Skill']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
