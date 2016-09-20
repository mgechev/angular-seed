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

export class ScheduleComponent implements AfterViewInit {

  dates:any = ["10/10/2015", "1/04/2016", "2/09/2016", "20/09/2016", "01/01/2001","01/01/2001","01/01/2001"]
  minTimeMaxTime:any = ["9:00","18:00"];
  availableTimes:string[] = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]
  timeBlock:string[] =[]
  personalData: dateTimes = {email:"Fake Email",availableTimes:[]}
  trueFlag:boolean = false

  private clickCell = (date:string, time:string) => {

    this.personalData.availableTimes.forEach(x => {
      this.trueFlag = false

      this.personalData.availableTimes.forEach(z => {
        if(z.date === date) this.trueFlag = true
        else this.trueFlag = false
      })


      if(this.trueFlag) {
        if(x.listTimes.includes(time) && (x.date === date)) {
          x.listTimes.splice(x.listTimes.indexOf(time),1)
        } else {
          x.listTimes.push(time)
        }
      } else{
        this.personalData.availableTimes.push({date:date,listTimes:[time]})
      }
      }
    );
    if(this.personalData.availableTimes.length == 0) {
      this.personalData.availableTimes.push({date:date,listTimes:[time]})
    }

  }


  private isSelected = (date:string, time:string) =>{
    // this.personalData.availableTimes.find(, function(o) {return o.date === date})
    this.personalData.availableTimes.forEach(x =>{
      if(x.listTimes.includes(time) && (x.date === date)) {
        console.log("Called selected")
        console.log()
        return true
      }
      })
    //console.log("Called deselect")
    return false

  }


  ngAfterViewInit(){
  }

}

