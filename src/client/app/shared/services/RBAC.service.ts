import {CommonService} from '../../shared/services/common.service';

export class RBACService {
    public static canAccess(permissions: Array<string>): boolean {
        let userHasPermissions = false;
        let loggedInUserPermission = new CommonService().getLoggedInUserPermission();
        if (loggedInUserPermission.length > 0) {
            for (var i = 0; i < permissions.length; i++) {
                if (loggedInUserPermission.indexOf(permissions[i]) === -1) {
                    return false;
                } else {
                    userHasPermissions = true;
                }
            }
            return userHasPermissions;
        }
        return false;
    }
}
