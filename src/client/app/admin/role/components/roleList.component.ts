import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { RoleInfo } from '../models/roleInfo';
import { RoleService } from '../services/role.service';

@Component({
    selector: 'admin-role-list',
    templateUrl: 'app/admin/role/components/roleList.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class RoleListComponent implements OnInit {
    roleList: Array<RoleInfo>;
    errorMessage: string;
    constructor(private _roleService: RoleService) {
    }

    ngOnInit() {
        this.getRoles();
    }

    getRoles() {
        this._roleService.getRoles()
            .subscribe(
            results=> {
                this.roleList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onDelete(role:RoleInfo) {
        this._roleService.deleteRole(role)
            .subscribe(
            results=> {
                this.getRoles();
            },
            error => this.errorMessage = <any>error);
    }
}
