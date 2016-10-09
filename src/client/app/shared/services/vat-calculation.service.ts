import {Transaction, CostCharacter, CostType, VatType} from "./import-list.service";
import {Injectable} from "@angular/core";

export class VatReport {
  totalVatIn: number;
  totalVatOut: number;
}

@Injectable()
export class VatCalculationService {

  static applyVat(transaction:Transaction, vatType:number): number {
    transaction.amountNet = Math.round((transaction.amount / (1 + (vatType / 100))) * 100) / 100;
    transaction.amountVat = Math.round((transaction.amount - transaction.amountNet) * 100 ) / 100;
    return transaction.amountVat;
  }

  static applyPercentage(transaction:Transaction, percentage:number): number {
    transaction.amountNet = Math.round(transaction.amountNet * percentage) / 100;
    transaction.amountVat = Math.round(transaction.amountVat * percentage) / 100;
    return transaction.amountVat;
  }

  static applyFixedAmount(transaction:Transaction, fixedAmount:number): number {
    transaction.amountNet = fixedAmount;
    if (transaction.costMatch.vatType === VatType[VatType.HIGH]) {
      transaction.amountVat = Math.round(fixedAmount * 21) / 100;
    } else if (transaction.costMatch.vatType === VatType[VatType.LOW]) {
      transaction.amountVat = Math.round(fixedAmount * 6) / 100;
    }
    return transaction.amountVat;
  }

  static calculateTotalVat(transactions:Array<Transaction>): VatReport {
    let totalVatIn:number = 0, totalVatOut:number = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (CostCharacter[transactions[i].costCharacter] === CostCharacter.IGNORE) {
        // transactions.splice(i,1);
      } else {
        let vatIn = 0, vatOut = 0;
        switch (CostType[transactions[i].costType]) {
          case CostType.BUSINESS_FOOD:
            vatOut = VatCalculationService.applyVat(transactions[i], 0);
            break;
          case CostType.INVOICE_PAID:
            vatIn = VatCalculationService.applyVat(transactions[i], 21);
            break;
          default:
            if (transactions[i].costMatch != null && transactions[i].costMatch.vatType != null) {
              if (transactions[i].costMatch.fixedAmount > 0) {
                vatOut = VatCalculationService.applyFixedAmount(transactions[i], transactions[i].costMatch.fixedAmount);
              } else {
                if (transactions[i].costMatch.vatType === VatType[VatType.HIGH]) {
                  vatOut = VatCalculationService.applyVat(transactions[i], 21);
                } else if (transactions[i].costMatch.vatType === VatType[VatType.LOW]) {
                  vatOut = VatCalculationService.applyVat(transactions[i], 6);
                } else {
                  VatCalculationService.applyVat(transactions[i], 0);
                }
                if (transactions[i].costMatch.percentage > 0) {
                  vatOut = VatCalculationService.applyPercentage(transactions[i], transactions[i].costMatch.percentage);
                }
              }
            }
            break;
        }
        totalVatOut += vatOut;
        totalVatIn += vatIn;
      }
    }
    let vatReport = new VatReport();
    vatReport.totalVatIn = Math.round(totalVatIn * 100) / 100;
    vatReport.totalVatOut = Math.round(totalVatOut * 100) / 100;
    return vatReport;
  }
}
