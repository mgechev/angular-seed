import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Location } from '../../models/location';

@Injectable()
export class LocationsService {
    private getUrl = 'http://www.climbontheway.com/api/get.php';
    private postUrl = 'http://www.climbontheway.com/api/post.php';

    constructor(private http: Http) { }

    getLocations(): Observable<Location[]> {
        return this.http.get(this.getUrl)
                    .map((res:Response) => res.json())
                    .catch(this.handleError);
    }

    addLocation(crag: string, lat: number, long: number, name: string, loc: string): Observable<Location> {

        let obj = { name: crag, lat: lat, long: long, submitter: name, home: loc };
        let body = 'data=' + JSON.stringify(obj);
        console.log('body: ' + body);

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postUrl, body, options)
                        .map((res:Response) => console.log('post response: ' + res.json()))
                        .catch(this.handleError);
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
  }
}
