import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {Collapse} from 'ng2-bootstrap/ng2-bootstrap';
import { NgFor, NgIf } from 'angular2/common';

@Component({
  selector: 'navigation',
  directives: [NgFor,NgIf,Collapse],
  template: `
    <div [ngClass]="{ 'pull-xs-right' : align==='right' }" *ngIf="toggable">
     <button (click)="isOpened = !isOpened" class="navbar-toggler hidden-lg-up" type="button">&#9776;</button>
    </div>

    <div [ngClass]="{ 'pull-xs-right' : align==='right' }">
      <ul [collapse]="!isOpened && toggable" class="nav navbar-nav" [ngClass]="{ 'navbar-toggleable-md' : toggable }">
        <li *ngFor="#item of items" class="nav-item" [ngClass]="{ active : activeItemKey === item.key }">
          <a class="nav-link" href="#" (click)="itemClicked.emit(item.key)">{{ item.label }}</a>
        </li>
      </ul>
    </div>
    `
})
export class Navigation {

  @Input() align:string;
  @Input() toggable:boolean;
  @Input() items:Array<Object>;
  @Input() activeItemKey:string;

  @Output() itemClicked:EventEmitter<any> = new EventEmitter<any>();

}
