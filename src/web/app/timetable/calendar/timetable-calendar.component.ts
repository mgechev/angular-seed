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
  months:any= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  days: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  dateNames: any = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  dates: string[] = []
  write:any = 0

  // Current day/month/day
  date:any = new Date()
  currentDay:string = this.date.getDate()
  currentMonth:string = this.date.getMonth()
  currentMonthString:string = this.months[this.date.getMonth()]
  currentYear:any = this.date.getFullYear()


  private dateSelect = (date: string) => {
    if (this.dates.includes(date)) {
      this.dates.splice(this.dates.indexOf(date), 1)
      console.log(this.dates);
    }
    else {
      this.dates.push(date)
      console.log(this.dates);
    }
  }

  private dateSelected = (date: string) => {
    if (this.dates.includes(date)) {
      return true
    }else{
      return false
    }
  }

  private nextMonth = () => {
    var current = parseInt(this.currentMonth)
    current++
    if (current > 11) {
      current = 0
      this.nextYear()
    }
    this.currentMonthString = (this.months[current])
    this.currentMonth = current.toString()
    //console.log(current)
    //console.log(this.months[current])
  }

  private prevMonth = () => {
    var current =  parseInt(this.currentMonth)
    current--
    if (current < 0) {
      current = 11
      this.prevYear()
    }
    this.currentMonthString = (this.months[current])
    this.currentMonth = current.toString()
    //console.log(current)
    //console.log(this.months[current])
  }

  private nextYear = () => {
    this.currentYear++
  }

  private prevYear = () => {
    this.currentYear--
  }

  private getDays = (month:any) => {
    var days = 0
    switch (parseInt(month)) { // Yes this code is extremely ugly but I can't do it in one line because javascript sucks
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11: // 31 days months
            days = 31
            break
      case 3:
      case 5:
      case 8:
      case 10: // 30 days months
            days = 30
            break
      case 1: // Feb
            if ((parseInt(this.currentYear)%4 == 0) && (parseInt(this.currentYear)%100 != 0) || (parseInt(this.currentYear)%400 == 0)){
              days = 29
            }else {
              days = 28
            }
            break
    }
    return days;

  }

  private getStartDay = (day:any, month:any, year:any) => {
    var startDay = new Date(day, month, year)
    return startDay
  }

  private displayDay = (row:any, col:any) => {
    //console.log(this.write)
    this.write++
    var currentDay = this.days[(row-1)+((col-1)*7)];
    if (currentDay <= this.getDays(this.currentMonth))
      return currentDay
    else
      return (((row)+((col-1)*7)) - this.getDays(this.currentMonth))
}
}
