import {Component} from '@angular/core';
import { Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { RoleInfo } from '../models/roleInfo';
import { RoleService } from '../services/role.service';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'admin-role-add',
    templateUrl: 'roleAddEdit.component.html',
    directives: [ROUTER_DIRECTIVES, TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class RoleAddEditComponent {
    role: RoleInfo;
    errorMessage: string;
    params: number;
    permissionList: Array<any>;
    rolePermissionList: Array<any>;
    selectedPermission: any;
    constructor(private _roleService: RoleService,
        private _router: Router) {
        this.role = new RoleInfo(0, '');
    }

    routerOnActivate(segment: RouteSegment) {
        this.params = Number(segment.getParam('id'));
        if (this.params) {
            this._roleService.getRoleById(this.params)
                .subscribe(
                results => {
                    this.role = results;
                },
                error => this.errorMessage = <any>error);
            this.getAllPermissions();
            this.getPermissionsByRole();
        }
    }

    onSave(): void {
        if (this.params) {
            this._roleService.editRole(this.role)
                .subscribe(
                results => {
                    this._router.navigate(['/Admin/Role/']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._roleService.addRole(this.role)
                .subscribe(
                results => {
                    this._router.navigate(['/Admin/Role/']);
                },
                error => this.errorMessage = <any>error);
        }
    }

    getAllPermissions() {
        this._roleService.getAllPermissions()
            .subscribe(
            results => {
                this.permissionList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onSelectPermission(event: any) {
        this.selectedPermission = event.item;
        this.selectedPermission.roleId = this.params;
    }

    getPermissionsByRole() {
        this._roleService.getPermissionsByRole(this.params)
            .subscribe(
            results => {
                this.rolePermissionList = results;
            },
            error => this.errorMessage = <any>error);
    }

    onAddPermission() {
        this._roleService.addPermissionToRole(this.selectedPermission)
            .subscribe(
            results => {
                this.getPermissionsByRole();
                this.selectedPermission = {};
            },
            error => this.errorMessage = <any>error);
    }
    revokePermission(permission: any) {
        permission.roleId = this.params;
        this._roleService.revokePermissionFromRole(permission)
            .subscribe(
            results => {
                this.getPermissionsByRole();
            },
            error => this.errorMessage = <any>error);
    }
}
