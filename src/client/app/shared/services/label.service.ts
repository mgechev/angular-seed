import {Injectable} from "@angular/core";

@Injectable()
export class LabelService {
  labels = {
    NONE: 'Geen',
    LOW: 'Laag',
    HIGH: 'Hoog',

    UNKNOWN: 'Onbekend',
    BUSINESS: 'Zakelijk',
    PRIVATE: 'Prive',
    BOTH: 'Beide',

    GENERAL_EXPENSE: 'Algemene uitgave',
    GENERAL_INCOME: 'Algemene inkomst',
    INVOICE_PAID: 'Betaalde factuur',
    IGNORE: 'Negeren',
    VAT: 'Omzetbelasting',
    BUSINESS_FOOD: 'Eten & drinken',
    BUSINESS_CAR: 'Auto',
    FROM_SAVINGS_ACCOUNT: 'Van spaarrekening',
    TO_SAVINGS_ACCOUNT: 'Naar spaarrekening',
    TO_PRIVATE_ACCOUNT: 'Opname naar prive',
    TRAVEL_WITH_PUBLIC_TRANSPORT_OTHER_ACCOUNT: 'Reiskosten',
    FROM_PRIVATE_ACCOUNT: 'Inleg vanuit prive',
    INCOME_TAX: 'Inkomstenbelasting',
    INCOME_TAX_PAID_BACK: 'Inkomstenbelasting terugbetaald',
    ROAD_TAX: 'Wegenbelasting',
    INTEREST: 'Rente',
    SETTLEMENT: 'Bedrijfsruimte',
    SETTLEMENT_DISCOUNT: 'Bedrijfsruimte korting'
  };

  get(key: string): string {
    return this.labels[key];
  };
}
