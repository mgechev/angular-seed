import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RoleService, RoleInfo } from '../../role/index';

@Component({
    moduleId: module.id,
    selector: 'admin-user-role',
    templateUrl: 'userRole.component.html',
    //directives: [ROUTER_DIRECTIVES],
    providers: [RoleService]
})

export class UserRoleComponent implements OnInit {
    errorMessage: string;
    params: number;
    userRole: any;
    userName: string = '';
    roleList: Array<RoleInfo>;
    roleDropdown: Array<RoleInfo>;
    selectedRole: any;
    constructor(private _userService: UserService,
        private _router: Router,
        private activatedRoute: ActivatedRoute,
        private _roleService: RoleService
    ) { }

    ngOnInit() {
        this.params = this.activatedRoute.snapshot.params['Id'];
        //this.params = Number(segment.getParam('id'));
        this.getAllRoles();
    }

    getUserRole() {
        this._userService.getUserRole(this.params)
            .subscribe(
            (results: any) => {
                this.userName = results.UserName;
                this.userRole = results.Roles;
                this.setRoleDropdown();
            },
            error => this.errorMessage = <any>error);
    }
    getAllRoles() {
        this._roleService.getRoles()
            .subscribe(
            results => {
                this.roleList = <any>results;
                this.getUserRole();
            },
            error => this.errorMessage = <any>error);
    }
    onAssignRole() {
        if (this.selectedRole !== '') {
            this.selectedRole.UserId = this.params;
            this._userService.addUserRole(this.selectedRole)
                .subscribe(
                results => {
                    this.selectedRole = {};
                    this.getUserRole();
                },
                error => this.errorMessage = <any>error);
        }
    }

    onRevokeRole(role: any) {
        role.userId = this.params;
        this._userService.revokeRole(role)
            .subscribe(
            results => {
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
                this.roleDropdown.push(this.roleList[i]);
            }
            flag = false;
        }
    }
}
