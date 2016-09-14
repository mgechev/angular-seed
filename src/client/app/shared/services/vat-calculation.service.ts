import {Transaction, CostCharacter, CostType, VatType} from "./import-list.service";
import {Injectable} from "@angular/core";

export class VatReport {
  totalVatIn: number;
  totalVatOut: number;
}

@Injectable()
export class VatCalculationService {

  applyVat(transaction:Transaction, vatType:VatType) {
    transaction.amountVat = transaction.amount / (1 + (vatType / 100));
    transaction.amountNet = transaction.amount - transaction.amountVat;
    return transaction.amountVat;
  }

  calculateTotalVat(transactions:Array<Transaction>): VatReport {
    let totalVatIn, totalVatOut = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (CostCharacter[transactions[i].costCharacter] === CostCharacter.IGNORE) {
        // transactions.splice(i,1);
      } else {
        let vatIn, vatOut = 0;
        switch (CostType[transactions[i].costType]) {
          case CostType.BUSINESS_CAR:
            vatOut = this.applyVat(transactions[i], 21);
            break;
          case CostType.BUSINESS_FOOD:
            vatOut = this.applyVat(transactions[i], 0);
            break;
          default:
            if (transactions[i].costMatch != null && transactions[i].costMatch.vatType != null) {
              if (transactions[i].costMatch.vatType == VatType.HIGH) {
                vatOut = this.applyVat(transactions[i], 21);
              } else if (transactions[i].costMatch.vatType == VatType.LOW) {
                vatOut = this.applyVat(transactions[i], 6);
              }
            }
            break;
        }
        totalVatOut += vatOut;
      }
    }
    let vatReport = new VatReport();
    vatReport.totalVatIn = totalVatIn;
    vatReport.totalVatOut = totalVatOut;
    return vatReport;
  }
}
