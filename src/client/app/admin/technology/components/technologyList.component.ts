import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { TechnologyInfo } from '../models/technologyInfo';
import { TechnologyService } from '../services/technology.service';

@Component({
    selector: 'admin-technology-list',
    templateUrl: 'app/admin/technology/components/technologyList.component.html',
    directives: [ROUTER_DIRECTIVES]
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
            results=> {
                this.technologyList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onDelete(technology: TechnologyInfo) {
        this._technologyService.deleteTechnology(technology)
            .subscribe(
            results=> {
                this.getTechnology();
            },
            error => this.errorMessage = <any>error);
    }
}
