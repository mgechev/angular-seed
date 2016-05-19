import {Component } from '@angular/core';
import { Router, OnActivate, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { TechnologyInfo } from '../models/technologyInfo';
import { TechnologyService } from '../services/technology.service';

@Component({
    selector: 'admin-technology-add',
    templateUrl: 'app/admin/technology/components/technologyAdd.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class TechnologyAddComponent implements OnActivate {
    technology: TechnologyInfo;
    errorMessage: string;
    params: number;
    constructor(private _technologyService: TechnologyService,
        private _router: Router) {
        this.technology = new TechnologyInfo(0, '');
    }

    routerOnActivate(segment: RouteSegment) {
        this.params = Number(segment.getParam('id'));
        if (this.params) {
            this._technologyService.getTechnologyById(this.params)
                .subscribe(
                results=> {
                    this.technology = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._technologyService.editTechnology(this.technology)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/Technology']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._technologyService.addTechnology(this.technology)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/Technology']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
