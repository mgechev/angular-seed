import {Injectable} from '@angular/core';
import {VatType, CostCharacter, CostType} from "./import-list.service";
import {Http} from '@angular/http';
import {contentHeaders} from "../../common/headers";

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
  constructor(private http: Http) {}

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
    this.http.get('http://localhost:8080/auth/costmatches', { headers: contentHeaders })
      .subscribe(
        response => {
          console.log('hoi');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }
}
