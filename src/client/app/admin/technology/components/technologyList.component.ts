import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TechnologyInfo } from '../models/technologyInfo';
import { TechnologyService } from '../services/technology.service';

@Component({
    moduleId: module.id,
    selector: 'admin-technology-list',
    templateUrl: 'technologyList.component.html'
    //,directives: [ROUTER_DIRECTIVES]
})

export class TechnologyListComponent implements OnInit {
    technologyList: Array<TechnologyInfo>;
    errorMessage: string;
    constructor(private _technologyService: TechnologyService,
        private _router: Router) {
    }

    ngOnInit() {
        this.getTechnology();
    }

    getTechnology() {
        this._technologyService.getTechnologies()
            .subscribe(
            (results: any) => {
                this.technologyList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onDelete(technology: TechnologyInfo) {
        this._technologyService.deleteTechnology(technology)
            .subscribe(
            results => {
                this.getTechnology();
            },
            error => this.errorMessage = <any>error);
    }
}
