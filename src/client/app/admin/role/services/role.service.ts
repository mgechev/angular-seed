import { Injectable } from '@angular/core';
import {  Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RoleInfo } from '../models/roleInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';

@Injectable()
export class RoleService {

    constructor( private authHttp: AuthHttp) { }

    addRole(role: RoleInfo) {
        let url = Config.GetURL('api/Role/Add');
        return this.authHttp.post(url, { role })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRoles() {
        let url = Config.GetURL('api/Role/GetRoles');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRoleById(id:number) {
        let url = Config.GetURL('api/Role/GetRoleById');
        return this.authHttp.post(url, { role: { Id: id } })
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteRole(role: RoleInfo) {
        let url = Config.GetURL('api/Role/Delete');
        return this.authHttp.post(url, { role })
            .map(this.extractData)
            .catch(this.handleError);
    }

    editRole(role: RoleInfo) {
        let url = Config.GetURL('api/Role/Edit');
        return this.authHttp.post(url, { role })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAllPermissions() {
        let url = Config.GetURL('api/permission/GetAllPermissions');
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    addPermissionToRole(permission:any) {
        let url = Config.GetURL('api/Role/AddPermissionToRole');
        return this.authHttp.post(url, { permission })
            .map(this.extractData)
            .catch(this.handleError);
    }
    getPermissionsByRole(roleId:number) {
        let url = Config.GetURL('api/Role/GetPermissionsByRole');
        return this.authHttp.post(url, { roleId: roleId })
            .map(this.extractData)
            .catch(this.handleError);
    }
    revokePermissionFromRole(permission:any) {
        let url = Config.GetURL('api/Role/RevokePermissionFromRole');
        return this.authHttp.post(url, { permission })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}