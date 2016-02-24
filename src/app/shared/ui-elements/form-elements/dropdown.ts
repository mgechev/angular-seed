import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';


@Component({
  selector: 'dropdown',
  directives: [DROPDOWN_DIRECTIVES],
  template: `
     <fieldset class="form-group">

       <label>{{ label }}:</label>
       <p class="form-control-static" *ngIf="!options">
          <small class="text-muted">{{ emptyMessage }}</small>
       </p>
       <div *ngIf="options" dropdown keyboardNav="true" (onToggle)="toggled($event)" class="form-control-static">

          <a href dropdownToggle>{{ options ? options[0].name : '' }}</a>

          <ul class="dropdown-menu" aria-labelledby="simple-dropdown">
            <li *ngFor="#option of options">
              <a class="dropdown-item" href (click)="optionSelected.emit(option)">{{option.name}}</a>
            </li>
          </ul>
       </div>

     </fieldset>
  `
})

export class Dropdown {

  @Input() label:string;
  @Input() options:Array<Object>;
  @Input() emptyMessage:string;
//  @Output() public toggled:EventEmitter<any> = new EventEmitter<any>();
  @Output() public optionSelected:EventEmitter<any> = new EventEmitter<any>();

  public toggled(open:boolean):void {
    console.log('Dropdown is now open: ', open);
  }

  public itemSelected(option):void {
    console.log('item selected: ', option);
  }


}
