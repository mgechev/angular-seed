import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SkillInfo } from '../models/skillInfo';
import { SkillService } from '../services/skill.service';

@Component({
    moduleId: module.id,
    selector: 'admin-skill-add',
    templateUrl: 'skillAdd.component.html'
    //,directives: [ROUTER_DIRECTIVES]
})

export class SkillAddComponent implements OnInit {
    skill: SkillInfo;
    errorMessage: string;
    params: number;
    constructor(private _skillService: SkillService,
        private activatedRoute: ActivatedRoute,
        private _router: Router) {
        this.skill = new SkillInfo(0, '');
    }

    ngOnInit() {
        this.params = this.activatedRoute.snapshot.params['Id'];
        //this.params = Number(segment.getParam('Id'));
        if (this.params) {
            this._skillService.getSkillById(this.params)
                .subscribe(
                (results: any) => {
                    this.skill = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._skillService.editSkill(this.skill)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/Skill']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._skillService.addSkill(this.skill)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/Skill']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
