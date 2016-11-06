import {CostType} from "./import-list.service";
import {Http} from "@angular/http";
import {contentHeaders} from "../../common/headers";
import {LabelService} from "./label.service";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import * as moment from "moment/moment";
import Collection = _.Collection;

export class Cost {
  description: string;
  costType: CostType;
  date: moment.Moment;
  amount: number;
  vat: number;
}

@Injectable()
export class CostService {

  constructor(private http: Http, private labelService: LabelService) {}

  addCost(cost: Cost) {
    console.log(cost);
    let body = JSON.stringify(cost);
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.post('http://localhost:8080/auth/cost', body, { headers: contentHeaders })
      .subscribe(
        response => {
          // localStorage.setItem('jwt', response.json().id_token);
          // this.router.parent.navigateByUrl('/vat');
        },
        error => {
          alert(error);
          console.log(error);
        }
      );
  }

  getCosts(): Observable<Cost> {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    return this.http.get('http://localhost:8080/auth/costs', { headers: contentHeaders })
      .map(res => <Cost> res.json())
      .catch(this.handleError);
  }

  /**
   * Handle HTTP error
   */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
