import {VatType, CostCharacter, CostType, Transaction} from "./import-list.service";
import {Http} from '@angular/http';
import {contentHeaders} from "../../common/headers";
import Collection = _.Collection;
import {LabelService} from "./label.service";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";

export class CostMatch {
  matchString: string;
  costType: CostType;
  costCharacter: CostCharacter;
  vatType: VatType;
  percentage: number;
  fixedAmount: number;
}

@Injectable()
export class CostMatchService {

  constructor(private http: Http, private labelService: LabelService) {}

  addMatch(costMatch: CostMatch) {
    let body = JSON.stringify(costMatch);
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));

    this.http.post('http://localhost:8080/auth/match', body, { headers: contentHeaders })
      .subscribe(
        response => {
          // localStorage.setItem('jwt', response.json().id_token);
          // this.router.parent.navigateByUrl('/vat');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  getMatches(): Observable<CostMatch> {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    return this.http.get('http://localhost:8080/auth/costmatches', { headers: contentHeaders })
      .map(res => <CostMatch> res.json())
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

  match(transactions: Array<Transaction>, costMatches: Collection<CostMatch>) {
    transactions.forEach(transaction => {
      for (let costMatch of costMatches) {
        if (transaction.description.toLowerCase().indexOf(costMatch.matchString.toLowerCase()) > -1) {
          transaction.costType = CostType[costMatch.costType.id];
          transaction.costTypeDescription = this.labelService.get(CostType[costMatch.costType.id]);
          transaction.costCharacter = CostCharacter[costMatch.costCharacter];
          transaction.costCharacterDescription = this.labelService.get(CostCharacter[costMatch.costCharacter]);
          transaction.costMatch = costMatch;
        }
      }
    });
    return transactions;
  }
}
