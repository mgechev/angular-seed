import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnerTypeInfo } from '../models/ownerTypeInfo';
import { OwnerTypeService } from '../services/ownerType.service';

@Component({
    moduleId: module.id,
    selector: 'admin-ownertype-add',
    templateUrl: 'ownerTypeAdd.component.html'
    //,directives: [ROUTER_DIRECTIVES]
})

export class OwnerTypeAddComponent implements OnInit {
    ownerType: OwnerTypeInfo;
    errorMessage: string;
    params: number;
    constructor(private _ownerTypeService: OwnerTypeService,
        private activatedRoute: ActivatedRoute,
        private _router: Router) {
        this.ownerType = new OwnerTypeInfo(0, '');
    }

    ngOnInit() {
        this.params = this.activatedRoute.snapshot.params['Id'];
        // this.params = Number(segment.getParam('Id'));
        if (this.params) {
            this._ownerTypeService.getOwnerTypeById(this.params)
                .subscribe(
                (results: any) => {
                    this.ownerType = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._ownerTypeService.editOwnerType(this.ownerType)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/OwnerType']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._ownerTypeService.addOwnerType(this.ownerType)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/OwnerType']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
