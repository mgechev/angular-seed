import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { OwnerTypeInfo } from '../models/ownerTypeInfo';
import { OwnerTypeService } from '../services/ownerType.service';

@Component({
    moduleId: module.id,
    selector: 'admin-ownertype-list',
    templateUrl: 'ownerTypeList.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class OwnerTypeListComponent implements OnInit {
    ownerTypeList: Array<OwnerTypeInfo>;
    errorMessage: string;
    constructor(private _ownerTypeService: OwnerTypeService,
        private _router: Router) {
    }

    ngOnInit() {
        this.getOwnerTypes();
    }

    getOwnerTypes() {
        this._ownerTypeService.getOwnerTypes()
            .subscribe(
            (results:any)=> {
                this.ownerTypeList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onDelete(ownerType: OwnerTypeInfo) {
        this._ownerTypeService.deleteOwnerType(ownerType)
            .subscribe(
            results=> {
                this.getOwnerTypes();
            },
            error => this.errorMessage = <any>error);
    }
}
