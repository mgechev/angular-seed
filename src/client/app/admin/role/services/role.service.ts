import { Injectable } from '@angular/core';
import {  Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RoleInfo } from '../models/roleInfo';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';

@Injectable()
export class RoleService {

    constructor( private authHttp: AuthHttp, private _spinnerService: SpinnerService) { }

    addRole(role: RoleInfo) {
        let url = Config.GetURL('api/Role/Add');
        this._spinnerService.show();
        return this.authHttp.post(url, { role })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getRoles() {
        let url = Config.GetURL('api/Role/GetRoles');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getRoleById(id:number) {
        let url = Config.GetURL('api/Role/GetRoleById');
        this._spinnerService.show();
        return this.authHttp.post(url, { role: { Id: id } })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    deleteRole(role: RoleInfo) {
        let url = Config.GetURL('api/Role/Delete');
        this._spinnerService.show();
        return this.authHttp.post(url, { role })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    editRole(role: RoleInfo) {
        let url = Config.GetURL('api/Role/Edit');
        this._spinnerService.show();
        return this.authHttp.post(url, { role })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    getAllPermissions() {
        let url = Config.GetURL('api/permission/GetAllPermissions');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    addPermissionToRole(permission:any) {
        let url = Config.GetURL('api/Role/AddPermissionToRole');
        this._spinnerService.show();
        return this.authHttp.post(url, { permission })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getPermissionsByRole(roleId:number) {
        let url = Config.GetURL('api/Role/GetPermissionsByRole');
        this._spinnerService.show();
        return this.authHttp.post(url, { roleId: roleId })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    revokePermissionFromRole(permission:any) {
        let url = Config.GetURL('api/Role/RevokePermissionFromRole');
        this._spinnerService.show();
        return this.authHttp.post(url, { permission })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
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
