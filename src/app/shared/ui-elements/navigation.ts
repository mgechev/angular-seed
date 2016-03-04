import {Component,Input,Output,EventEmitter,OnInit} from 'angular2/core';
import {Collapse} from 'ng2-bootstrap/ng2-bootstrap';
import {Dropdown} from '../../shared/ui-elements/form-elements/dropdown';
import {NavigationItem} from '../../store/stores/ui/app.store';
import {NgFor,NgIf} from 'angular2/common';

@Component({
  selector: 'navigation',
  directives: [NgFor, NgIf, Collapse, Dropdown],
  template: `
    <div [ngClass]="{ 'pull-xs-right' : align==='right' }" *ngIf="toggable">
     <button (click)="isOpened = !isOpened" class="navbar-toggler hidden-lg-up" type="button">&#9776;</button>
    </div>

    <div [ngClass]="{ 'pull-xs-right' : align==='right' }">
      <ul [collapse]="!isOpened && toggable" class="nav navbar-nav" [ngClass]="{ 'navbar-toggleable-md' : toggable }">
        <li *ngFor="#item of items" class="nav-item" [ngClass]="{ active : activeItem?.key === item.key }">
          <a *ngIf="item.key && !item.children" class="nav-link" href="#" (click)="itemClicked.emit(item)">{{ item.label }}</a>
          <span *ngIf="!item.key" class="nav-link">{{ item.label }}</span>

          <dropdown *ngIf="item.children" inline="true"
          [options]="item.children"
          [defaultOption]="item.label"
          [labelProperty]="'label'"
          (optionSelected)="itemClicked.emit($event)"></dropdown>
        </li>

      </ul>
    </div>
    `
})
export class Navigation implements OnInit {
  @Input() align:string;
  @Input() toggable:boolean;
  @Input() items:Array<NavigationItem>;
  @Input() activeItem:NavigationItem;

  @Output() itemClicked:EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    console.log('on init navigation');
    console.log(this.items);
  }
}
