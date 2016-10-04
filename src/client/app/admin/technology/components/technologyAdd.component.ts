import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { TechnologyInfo } from '../models/technologyInfo';
import { TechnologyService } from '../services/technology.service';

@Component({
    moduleId: module.id,
    selector: 'admin-technology-add',
    templateUrl: 'technologyAdd.component.html'
    //,directives: [ROUTER_DIRECTIVES]
})

export class TechnologyAddComponent implements OnInit {
    technology: TechnologyInfo;
    errorMessage: string;
    params: number;
    constructor(private _technologyService: TechnologyService,
        private activatedRoute: ActivatedRoute,
        private _router: Router) {
        this.technology = new TechnologyInfo(0, '');
    }

    ngOnInit() {
        this.params = this.activatedRoute.snapshot.params['Id'];
        //this.params = Number(segment.getParam('Id'));
        if (this.params) {
            this._technologyService.getTechnologyById(this.params)
                .subscribe(
                (results: any) => {
                    this.technology = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._technologyService.editTechnology(this.technology)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/Technology']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._technologyService.addTechnology(this.technology)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/Technology']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
