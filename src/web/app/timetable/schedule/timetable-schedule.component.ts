import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';
import any = jasmine.any;


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

  /*
    The string array of dates holds dummy data of plausible dates.
    minTimeMaxTime holds two times representing a min and max time which should be implemented in the settings component.
    The availableTimes string array holds the current default times that are rendered when this componenet is run.
   */
  dates:string[] = ["10/10/2015", "1/04/2016", "2/09/2016", "20/09/2016", "01/01/2016","01/12/2016","01/11/2016"]
  minTimeMaxTime:string[] = ["9:00","18:00"];
  availableTimes:string[] = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]
  timeBlock:string[] =[]
  personalData: dateTimes = {email:"Fake Email",availableTimes:[]}
  trueFlag:boolean = false


  /*
    ClickCell takes in a date and time argument
    The if condition checks if a time element already belongs to a date element. The if condition is met if the time selected already belongs to the corresponding date element.
    The following two lines splice the selected cell if the if condition is met.
    The else statement is used when the user clicks a cell which is not currently in the array of selected items.
   */
  private clickCell = (date:string, time:string) => {
    if(this.personalData.availableTimes[this.personalData.availableTimes.map(x => x.date).indexOf(date)].listTimes.includes(time)) {
      this.personalData.availableTimes[this.personalData.availableTimes.map(x => x.date).indexOf(date)].listTimes.splice
        (this.personalData.availableTimes[this.personalData.availableTimes.map(x => x.date).indexOf(date)].listTimes.indexOf(time),1);
    } else {
      this.personalData.availableTimes[this.personalData.availableTimes.map(x => x.date).indexOf(date)].listTimes.push(time)
    }
  }
    /*
      This function takes in the same arguements as the clickCell function :date and time.
      isSelected returns true if a time is selected by the user.
      else it will return false.
     */
  private isSelected = (date:string, time:string) => {
      let _data = this.personalData.availableTimes.filter(x => x.date === date)
      if (_data.find(x => x.listTimes.includes(time))) {
        return true
      } else {
        return false
      }
  }
  /*
    on runtime available times are pushed to the far left cell grid.
   */
  ngOnInit() {
    this.dates.forEach(x => {
      this.personalData.availableTimes.push({date:x,listTimes:[]})
    })
  }
}

