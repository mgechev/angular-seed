import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { SkillInfo } from '../models/skillInfo';
import { SkillService } from '../services/skill.service';

@Component({
    selector: 'admin-skill-list',
    templateUrl: 'app/admin/skill/components/skillList.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class SkillListComponent implements OnInit {
    skillList: Array<SkillInfo>;
    errorMessage: string;
    constructor(private _skillService: SkillService,
        private _router: Router) {
    }

    ngOnInit() {
        this.getSkills();
    }

    getSkills() {
        this._skillService.getSkills()
            .subscribe(
            results=> {
                this.skillList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onDelete(skill: SkillInfo) {
        this._skillService.deleteSkill(skill)
            .subscribe(
            results=> {
                this.getSkills();
            },
            error => this.errorMessage = <any>error);
    }
}
