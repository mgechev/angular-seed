import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'timetable',
  templateUrl: 'timetable.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class TimetableComponent {
    example:boolean = true;

}
