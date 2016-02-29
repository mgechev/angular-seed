import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';


@Component({
  selector: 'dropdown',
  directives: [DROPDOWN_DIRECTIVES],
  styles: [`
    :host .nav-link {
      padding-top: 0;
      padding-bottom: 0;
    }
  `],
  template: `
     <fieldset [ngClass]="{ 'form-group-inline': inline, 'form-group': !inline }" (click)="preventPropagation($event)">

       <label *ngIf="label">{{ label }}:</label>

       <p class="form-control-static" *ngIf="!options"> <small class="text-muted">{{ noDataMessage }}</small></p>
       <p class="form-control-static" *ngIf="options && options.length===0"> <small class="text-muted">{{ emptyOptionsMessage }}</small></p>

       <div *ngIf="options && options.length>0" dropdown keyboardNav="true" class="form-control-static">

          <a href dropdownToggle [ngClass]="{ 'nav-link': inline }">{{ defaultOption }}</a>

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

  @Input() inline:boolean;
  @Input() label:string;
  @Input() options:Array<Object>;
  @Input() defaultOption:string;
  @Input() noDataMessage:string;
  @Input() emptyOptionsMessage:string;
  @Output() public optionSelected:EventEmitter<any> = new EventEmitter<any>();

  /* following is a hack:
     since the keyboardNav functionality needs to work, there must be the empty "href" attribute
     on the links inside "dropdown-menu".
     But clicking that links triggers a browser reload. So to prevent that, the default event
     behaviour must be prevented.. TBD

   */
  preventPropagation($event:MouseEvent) {
    $event.preventDefault();
  }


}
