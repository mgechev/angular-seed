import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';
import Any = jasmine.Any;


@Component({
  moduleId: module.id,
  selector: 'timetable-schedule',
  templateUrl: 'timetable-schedule.component.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['timetable-schedule.component.css']
})

export class ScheduleComponent implements AfterViewInit {

  dates:any = ["10/10/2015", "1/04/2016", "2/09/2016", "20/09/2016"]
  times: any = ["9:00","18:00"];
  timesBlock:string[] = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]
  // strArray:string[] = []

  ngAfterViewInit(){

  }

  // exampleMethod = () =>{
  //   timeBlock:String[""] = this.timesBlock
  //   while(!{
  //
  //
  //   }
  // }
  /* example:string = "yanan";
   //Day/Month/Year
   */


  /*
   Take in times array.
   Create new array based on the times array.
   Push the new array to time module left of the selected dates module.
   */


}

