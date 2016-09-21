import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';


export class CalendarDate {
  day: number
  month: number
  year: number
};





@Component({
  moduleId: module.id,
  selector: 'timetable-calendar',
  templateUrl: 'timetable-calendar.component.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['timetable-calendar.component.css']
})

export class CalendarComponent implements OnInit{
  example:string = "yanan";
  months:any= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  days: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  dateNames: any = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  calendar:CalendarDate[][] = [[],[],[],[],[],[]]
  calendarDates:CalendarDate[]
  dates: string[] = []
  write:any = 0

  // Current day/month/day
  date:any = new Date()
  currentDay:string = this.date.getDate()
  currentMonth:string = this.date.getMonth()
  currentMonthString:string = this.months[this.date.getMonth()]
  currentYear:any = this.date.getFullYear()


  private dateSelect = (row, col) => {
    console.log(this.calendar[row-1][col-1])
    let date = this.calendar[row-1][col-1]
    //this.calendarDates.push({day:date.day, month:date.month, year:date.year})
    //this.calendarDates.push(this.calendar[row-1][col-1])
    /*
    if (this.calendarDates.includes(this.calendar[row-1][col-1])) {
      this.calendarDates.splice(this.calendarDates.indexOf(this.calendar[row-1][col-1]), 1)
      console.log(this.calendarDates);
    }
    else {
      this.calendarDates.push(this.calendar[row-1][col-1])
      console.log(this.calendarDates);
    }
    */
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
    this.updateCalendar(current, this.currentYear)
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
    this.updateCalendar(current, this.currentYear)
    //console.log(current)
    //console.log(this.months[current])
  }

  private updateCalendar = (month:any, year:any) => {
    let startDay = this.dateNames.indexOf(new Date(parseInt(year), parseInt(month), 1).toDateString().substr(0,3))
    let lastMonthTotalDays = this.getTotalDays((month==0?11:month-1));
    let skipped = false;
    let day = 1;
    for (var row = 0; row < 6; row++) {
      for (var col = 0; col < 7; col++) {
        if (!skipped) {
          col = startDay;
          skipped = true;
        }
        this.calendar[row][col] = {day:day, month:(month+1), year:year}
        day++
        if (day > this.getTotalDays(month)) {
          day = 1
          if (month >= 11) {
            month = 0
            year++
          } else {
            month++
          }
        }
      }
    }

    if (month == 1)
    {
      month = 12
      year--
    } else {
      month--
    }
    for (var col = 0; col < startDay; col++) {
      this.calendar[0][col] = {day:((lastMonthTotalDays - startDay) + (col+1)), month:(month), year:year}
    }


    //console.log(this.calendar)
  }

  private nextYear = () => {
    this.currentYear++
  }

  private prevYear = () => {
    this.currentYear--
  }

  private getTotalDays = (month:any) => {
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
    var startDay = new Date(parseInt(year), parseInt(month), parseInt(day)).toDateString().substr(0,3);
    return startDay
  }

  private displayDay = (row:any, col:any) => {
    return this.calendar[col-1][row-1].day
  }

  ngOnInit(){
    //console.log(this.calendar)
    this.updateCalendar(this.currentMonth, this.currentYear)

    //console.log(this.calendar)
  }


}
