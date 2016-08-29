import {Injectable} from '@angular/core';

@Injectable()
export class CommonService {
    userPermissions: Array<string> = [];

    getLoggedInUserPermission() {
        this.userPermissions = JSON.parse(sessionStorage.getItem('UserPermissions'));
        return this.userPermissions;
    }

    setLoggedInUserPermission(permissions: Array<string>) {
        //this.userPermissions = permissions;
        sessionStorage.setItem('UserPermissions',JSON.stringify(permissions));
    }
}
