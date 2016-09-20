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
  numbers: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
  dateNames: any = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  dates: string[] = []

  // Current day/month/day
  date:any = new Date()
  currentDay:string = this.date.getDate()
  currentMonth:string = this.months[this.date.getMonth()]
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
    var current = this.months.indexOf(this.currentMonth)
    current++
    if (current > 11) {
      current = 0
      this.nextYear()
    }
    this.currentMonth = (this.months[current])
    console.log(current)
    console.log(this.months[current])
  }

  private prevMonth = () => {
    var current = this.months.indexOf(this.currentMonth)
    current--
    if (current < 0) {
      current = 11
      this.prevYear()
    }
    this.currentMonth = (this.months[current])
    console.log(current)
    console.log(this.months[current])
  }

  private nextYear = () => {
    this.currentYear++
  }

  private prevYear = () => {
    this.currentYear--
  }

  private updateDays = () => {

  }
}
