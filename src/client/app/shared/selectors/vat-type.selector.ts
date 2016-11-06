import {Component, Output, EventEmitter} from '@angular/core'
import {VatType} from "../services/import-list.service";
import {KeysPipe} from "./cost-type.selector";

@Component({
  moduleId: module.id,
  selector: 'vat-type-selector',
  pipes: [KeysPipe],
  template: `<div>
    <select #sel (change)="select.emit(sel.value)">
      <option *ngFor="let item of vatTypes | keys" [value]="item.key">{{item.value}}
      </option>
    </select>
  </div>`
})
export class VatTypeSelector {
  vatTypes = VatType;
  @Output() select = new EventEmitter();
}
