export class RBACService {
    public static canAccess(permissions: Array<string>) : boolean {
        let userHasPermissions = false;
        if (localStorage.getItem('loggedInUserPermission') !== null) {
            let loggedInUserPermission = JSON.parse(localStorage.getItem('loggedInUserPermission'))
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
