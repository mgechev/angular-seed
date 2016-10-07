import {Component} from '@angular/core';
//import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
//import {BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
//import {SELECT_DIRECTIVES} from 'ng2-select/ng2-select';

// webpack html imports
//let template = require('./MultipleDrodown.Component.html');

@Component({
    moduleId: module.id,
    selector: 'multiple-demo',
    //template: template,
    templateUrl: 'MultipleDrodown.Component.html',
    //directives: [SELECT_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES, BUTTON_DIRECTIVES]
})
export class MultipleDemoComponent {
    public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
        'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
        'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Düsseldorf',
        'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
        'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
        'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
        'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
        'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
        'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza'];

    private value: any = ['Athens'];
    private _disabledV: string = '0';
    private disabled: boolean = false;

    private get disabledV(): string {
        return this._disabledV;
    }

    private set disabledV(value: string) {
        this._disabledV = value;
        this.disabled = this._disabledV === '1';
    }

    public selected(value: any): void {
        /** */
    }

    public removed(value: any): void {
        /** */
    }

    public refreshValue(value: any): void {
        this.value = value;
    }

    public itemsToString(value: Array<any> = []): string {
        return value
            .map((item: any) => {
                return item.text;
            }).join(',');
    }
}