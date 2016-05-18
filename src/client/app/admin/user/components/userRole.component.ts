import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate, RouteSegment, Router } from '@angular/router';
import { UserInfo } from '../models/userInfo';
import { UserService } from '../services/user.service';
import { RoleService, RoleInfo } from '../../role/index';

@Component({
    selector: 'admin-user-role',
    templateUrl: 'app/admin/user/components/userRole.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [RoleService]
})

export class UserRoleComponent implements OnInit {
    errorMessage: string
    params: number
    userRole: any
    userName: string = ''
    roleList: Array<RoleInfo>
    roleDropdown: Array<RoleInfo>
    selectedRole: any
    constructor(private _userService: UserService,
        private _router: Router,
        private _roleService: RoleService
    ) {
    }

    ngOnInit() {
    }

    routerOnActivate(segment: RouteSegment) {
        this.params = Number(segment.getParam('id'));
        this.getAllRoles();
    }

    getUserRole() {
        this._userService.getUserRole(this.params)
            .subscribe(
            results=> {
                this.userName = results.UserName
                this.userRole = results.Roles;
                this.setRoleDropdown()
            },
            error => this.errorMessage = <any>error);
    }
    getAllRoles() {
        this._roleService.getRoles()
            .subscribe(
            results=> {
                this.roleList = results;
                this.getUserRole()
            },
            error => this.errorMessage = <any>error);
    }
    onAssignRole() {
        console.log(this.selectedRole)
        if (this.selectedRole !== "") {
            this.selectedRole.UserId = this.params
            this._userService.addUserRole(this.selectedRole)
                .subscribe(
                results=> {
                    this.selectedRole = {};
                    this.getUserRole();
                },
                error => this.errorMessage = <any>error);
        }
    }

    onRevokeRole(role:any) {
        role.userId = this.params
        this._userService.revokeRole(role)
            .subscribe(
            results=> {
                this.getUserRole();
            },
            error => this.errorMessage = <any>error);
    }

    private setRoleDropdown() {
        var flag = false;
        this.roleDropdown = [];
        for (var i = 0; i < this.roleList.length; i++) {
            for (var j = 0; j < this.userRole.length; j++) {
                if (this.roleList[i].RoleName === this.userRole[j].RoleName) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.roleDropdown.push(this.roleList[i])
            }
            flag = false;
        }
    }

}
