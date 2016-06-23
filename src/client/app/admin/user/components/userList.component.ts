import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { UserInfo } from '../models/userInfo';
import { UserService } from '../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'admin-user-list',
    templateUrl: 'userList.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class UserListComponent implements OnInit {
    userList: Array<UserInfo>;
    errorMessage: string;
    constructor(private _userService: UserService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this._userService.getUsers()
            .subscribe(
            results=> {
             this.userList = <any>results;
            },
            error => this.errorMessage = <any>error);
    }
}
