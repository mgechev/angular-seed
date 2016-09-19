import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';
import {Pipe, PipeTransform} from '@angular/core';
import any = jasmine.any;
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

  dates:any = ["10/10/2015", "1/04/2016", "2/09/2016", "20/09/2016", "69/69/69","69/69/69","69/69/69"]
  minTimeMaxTime:any = ["9:00","18:00"];
  availableTimes:string[] = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]
  timeBlock:string[] =[]
  fakeSelectedDateTimes: selectedDateTimes = {date:"",listTimes:[]}
  personalData: dateTimes = {email:"Fake Email",availableTimes:[this.fakeSelectedDateTimes]}
  storedTimes:string[] = []
  happened:boolean = false

  private clickCell = (date:string, time:string) => {

    //The ugliest line of code in the world

    for (var i = 0; i < this.personalData.availableTimes.length; i++) {

      this.happened = false
      this.storedTimes = []
      var doesContain = this.personalData.availableTimes.filter(x => this.personalData.availableTimes[i].date === date);
      if (doesContain.length > 0) {
        console.log("Occured1")
        if (this.storedTimes.includes(time)) {
          this.storedTimes.splice(this.storedTimes.indexOf(time), 1)
        } else {
          this.storedTimes.push(time)
        }
      }else{
        console.log("Occured2")
        this.happened = true
        // this.personalData.availableTimes[i].date = date

        if (this.storedTimes.includes(time)) {

          this.storedTimes.splice(this.storedTimes.indexOf(time), 1)
        } else {
          this.storedTimes.push(time)
        }
      }
      // console.log(this.storedTimes)
      if(this.happened) {
        this.personalData.availableTimes.push({date:date,listTimes:this.storedTimes})
        console.log(this.personalData.availableTimes)
      }else{
        this.personalData.availableTimes[i].listTimes = this.storedTimes
      }
    }
    console.log(this.personalData.availableTimes)



  }
  private isSelected = (time:string) =>{
    return this.personalData.availableTimes.includes(time)
    // if(this.personalData.availableTimes.includes(time)){
    //
    // }
  }

  // arraySplit = (dateCan: String) =>{
  //   while(this.timesBlock.length > 0){
  //     console.log(this.timesBlock);
  //     this.timesBlock.pop();
  //   }
  //
  // }
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

