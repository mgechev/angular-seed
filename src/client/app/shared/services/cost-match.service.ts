import {Injectable} from '@angular/core';
import {VatType, CostCharacter, CostType, Transaction} from "./import-list.service";
import {Http} from '@angular/http';
import {contentHeaders} from "../../common/headers";
import Collection = _.Collection;
import {LabelService} from "./label.service";

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

  getMatches() {
    contentHeaders.set('Authorization', localStorage.getItem('jwt'));
    return this.http.get('http://localhost:8080/auth/costmatches', { headers: contentHeaders })
      .map(res => <CostMatch> res.json());
  }

  match(transactions: Array<Transaction>, costMatches: Collection<CostMatch>) {
    transactions.forEach(transaction => {
      for (let costMatch of costMatches) {
        if (transaction.description.toLowerCase().indexOf(costMatch.matchString.toLowerCase()) > -1) {
          transaction.costType = CostType[costMatch.costType.id];
          transaction.costTypeDescription = this.labelService.get(CostType[costMatch.costType.id]);
          transaction.costCharacter = CostCharacter[costMatch.costCharacter];
          transaction.costCharacterDescription = this.labelService.get(CostCharacter[costMatch.costCharacter]);
        }
      }
    });
    return transactions;
  }
}
