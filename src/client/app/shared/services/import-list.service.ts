import * as moment from 'moment/moment'
import {CsvParseService} from "./csv-parse.service";
import any = jasmine.any;
import {LabelService} from "./label.service";
import {CostMatch} from "./cost-match.service";
import {Injectable} from "@angular/core";

export enum CostType {
  GENERAL_EXPENSE = 2,
  GENERAL_INCOME = 1,
  INVOICE_PAID = 38,
  IGNORE = 0,
  VAT = 12,
  BUSINESS_FOOD = 13,
  BUSINESS_CAR = 14,
  FROM_SAVINGS_ACCOUNT = 15,
  TO_SAVINGS_ACCOUNT = 10,
  TO_PRIVATE_ACCOUNT = 17,
  TRAVEL_WITH_PUBLIC_TRANSPORT_OTHER_ACCOUNT = 8,
  FROM_PRIVATE_ACCOUNT = 18,
  INCOME_TAX = 29,
  INCOME_TAX_PAID_BACK = 30,
  ROAD_TAX = 31,
  INTEREST = 33,
  SETTLEMENT = 41,
  SETTLEMENT_DISCOUNT = 45
}

enum CsvType {
  ING,
  ABN_AMRO,
  KNAB,
  OV_CHIPKAART
}

export enum CostCharacter {
  UNKNOWN = 0,
  BUSINESS = 1,
  PRIVATE = 2,
  BOTH = 3,
  IGNORE = 4
}

export enum VatType {
  NONE,
  LOW,
  HIGH
}

export class Transaction {
  dateFormatted: string;
  date: moment.Moment;
  amount: number;
  amountVat: number;
  amountNet: number;
  amountFormatted: string;
  description: string;
  costMatch: CostMatch;
  costType: CostType;
  costTypeDescription: string;
  costCharacter: CostCharacter;
  costCharacterDescription: string;

  get dateFormatted(): string {
    return this.date.format('YYYY-MM-DD');
  }

  get amountFormatted(): string {
    return new Intl.NumberFormat("nl", {
      style: "currency",
      currency: "EUR"
    }).format(this.amount);
  }
}

@Injectable()
export class ImportListService {
  transactions: Transaction[] = [];

  constructor(public csvParseService: CsvParseService, private labelService: LabelService) {}

  get(): Object[] {
    return this.transactions;
  }

  convert(csvFile: String): Transaction[] {
    var transaction: Transaction;
    var csvLines: String[][];
    csvLines = this.csvParseService.csvToArray(csvFile, ',');
    var csvType: CsvType;

    this.transactions = [];
    if (csvLines[0][1] !== undefined && csvLines[0][1].indexOf("Naam / Omschrijving") == 0) {
      csvType = CsvType.ING;
    } else {
      csvLines = this.csvParseService.csvToArray(csvFile, ';');
      if (csvLines[0][1].indexOf("Check") == 0) {
        csvType = CsvType.OV_CHIPKAART;
      }
    }

    csvLines.shift(); // Skip the first line
    csvLines.forEach(line => {
      if (line.length > 1) {
        transaction = new Transaction();

        var dateFormat: String;
        switch (csvType) {
          case CsvType.ING: dateFormat = 'YYYYMMDD'; break;
          case CsvType.OV_CHIPKAART: dateFormat = 'DD-MM-YYYY'; break;
        }
        transaction.date = moment(line[0], dateFormat);

        if (csvType === CsvType.ING) {
          transaction.amount = Number.parseFloat(line[6].replace(',', '.'));
          if (line[5] === 'Af') {
            transaction.costType = CostType.GENERAL_EXPENSE;
          } else {
            transaction.costType = CostType.GENERAL_INCOME;
          }
          var description: String = line[1];
          if (line[8]) {
            description = description.concat(' ', line[8]);
          }
        } else if (csvType === CsvType.OV_CHIPKAART) {
          transaction.amount = Number.parseFloat(line[5].replace(',', '.'));
          description = "Van " + line[2] + " naar " + line[4] + " (" + line[3] + ") " + line[6] + " " + line[7] + " " + line[8];
        }
        transaction.description = description;

        transaction.costCharacter = CostCharacter.UNKNOWN;
        if (transaction.costType === CostType.GENERAL_INCOME) { //income
          if ( transaction.description.toLowerCase().indexOf('factuur') > -1) {  // Invoice
            transaction.costType = CostType.INVOICE_PAID;
            transaction.costCharacter = CostCharacter.BUSINESS;
          }
        } else { // expenses

          if (transaction.description.toLowerCase().indexOf('parking') > -1) { // Business car
            transaction.costType = CostType.BUSINESS_CAR;
            transaction.costCharacter = CostCharacter.BUSINESS;
          }
        }
        transaction.costTypeDescription = this.labelService.get(CostType[transaction.costType]);
        transaction.costCharacterDescription = this.labelService.get(CostCharacter[transaction.costCharacter]);
        this.transactions.push(transaction);
      }
    });
    return this.transactions;
  }
}
