import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';
import {Pipe, PipeTransform} from '@angular/core';
import any = jasmine.any;
import {timeInterval} from "rxjs/operator/timeInterval";
/*
Stores one date with selected times for one email/'person'.

 */
export class selectedDateTimes{
  date: string
  listTimes: string[]
}

export class dateTimes{
  email: string
  availableTimes:selectedDateTimes[]
}

@Component({
  moduleId: module.id,
  selector: 'timetable-schedule',
  templateUrl: 'timetable-schedule.component.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['timetable-schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  dates:string[] = ["10/10/2015", "1/04/2016", "2/09/2016", "20/09/2016", "01/01/2001","01/01/2001","01/01/2001"]
  minTimeMaxTime:string[] = ["9:00","18:00"];
  availableTimes:string[] = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]
  timeBlock:string[] =[]
  personalData: dateTimes = {email:"Fake Email",availableTimes:[]}
  trueFlag:boolean = false

  private clickCell = (date:string, time:string) => {
    if(this.personalData.availableTimes[this.personalData.availableTimes.map(x => x.date).indexOf(date)].listTimes.includes(time)) {
      this.personalData.availableTimes[this.personalData.availableTimes.map(x => x.date).indexOf(date)].listTimes.splice
      (this.personalData.availableTimes[this.personalData.availableTimes.map(x => x.date).indexOf(date)].listTimes.indexOf(time),1);
    } else {
      this.personalData.availableTimes[this.personalData.availableTimes.map(x => x.date).indexOf(date)].listTimes.push(time)
    }
  }

  private isSelected = (date:string, time:string) => {
      let _data = this.personalData.availableTimes.filter(x => x.date === date)
      if (_data.find(x => x.listTimes.includes(time))) {
        return true
      } else {
        return false
      }
  }
  ngOnInit() {
    this.dates.forEach(x => {
      this.personalData.availableTimes.push({date:x,listTimes:[]})
    })
  }
}

