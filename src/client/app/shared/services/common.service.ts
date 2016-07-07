import {Injectable} from '@angular/core';

@Injectable()
export class CommonService {
    userPermissions: Array<string> = [];

    getLoggedInUserPermission() {
        if (this.userPermissions.length > 0) {
            return this.userPermissions;
        } else {
            window.location.assign('index.html');
            return new Array<string>();
        }
    }

    setLoggedInUserPermission(permissions: Array<string>) {
        this.userPermissions = permissions;
    }
}
