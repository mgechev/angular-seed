import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'timetable-calendar',
  templateUrl: 'timetable-calendar.component.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['timetable-calendar.component.css']
})

export class CalendarComponent {
  example:string = "yanan";
  numbers: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
  dateNames: any = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  dates: string[] = []

  private dateSelect = (date: String) => {
    if (this.dates.includes(date)) {
      this.dates.splice(this.dates.indexOf(date), 1)
      console.log(this.dates);
    }
    else {
      this.dates.push(date)
      console.log(this.dates);
    }
  }

  private dateSelected = (date: String) => {
    if (this.dates.includes(date)){
      return true;
    }
    else {
      return false;
    }
  }
}
