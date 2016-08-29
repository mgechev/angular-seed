import { Injectable } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from '../../../shared/services/authHttp.service';
import { Config } from '../../../shared/config/config';
import { SpinnerService } from '../../../shared/components/spinner/spinner';
import {TODOList} from './model/ToDoList';


@Injectable()
export class ToDoListService {

    constructor(private authHttp: AuthHttp, private http: Http, private _spinnerService: SpinnerService) { }

    GetMyToDoList() {
        let url = Config.GetURL('/api/ToDoList/GetMyToDoList');
        //let url = Config.GetURL('/api/RecruitmentCycle/GetCandidatesForRRF');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    UpdateToDoTask(Task: TODOList) {
        let url = Config.GetURL('/api/ToDoList/UpdateItem');
        //let url = Config.GetURL('/api/RecruitmentCycle/GetCandidatesForRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, Task )
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());

    }

    AddToDoTask(Task: TODOList) {
        let url = Config.GetURL('/api/ToDoList/AddItem');
        //let url = Config.GetURL('/api/RecruitmentCycle/GetCandidatesForRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, Task)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());

    }
    RemoveToDoTask(ID: string) {
        let url = Config.GetURL('/api/ToDoList/ToDoListDeleteItem');
        //let url = Config.GetURL('/api/RecruitmentCycle/GetCandidatesForRRF');
        this._spinnerService.show();
        return this.authHttp.post(url, { ID })
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());

    }
    extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
