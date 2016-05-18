import {Injectable} from '@angular/core';

@Injectable()
export class CommonService {
    userPermissions: Array<string> = [];

    getLoggedInUserPermission() {
        return this.userPermissions;
    }

    setLoggedInUserPermission(permissions: Array<string>) {
        this.userPermissions = permissions;
    }
}
