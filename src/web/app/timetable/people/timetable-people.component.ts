import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {ROUTER_DIRECTIVES } from '@angular/router';

export class data{
  id: number;
  email: string;
  completed: boolean;
};


  //TEST DATA SET FOR PEOPLE
const datas: data[] = [
  {id: 1, email: "phazeblade@hotmail.com", completed:false},
  {id: 2, email: "Patrick@no.this.is.patrick.com", completed:true},
  {id: 3, email: "praveal.lal@live.com", completed:true},
  {id: 4, email: "shoar@ShoarAgainstWar.com", completed:true}
];



@Component({
  moduleId: module.id,
  selector: 'timetable-people',
  templateUrl: 'timetable-people.component.html',
  directives: [ROUTER_DIRECTIVES],
  //styleUrls: ['file name of CSS']
})

export class PeopleComponent {
  data = datas

  //emails: any = [["phazeblade@hotmail.com"], ["Patrick@no.this.is.patrick.com"], ["Praveal.lal@live.com"], ["Shoar@ShoarAgainstWar.com"]]

  private isCompleted = (completed:boolean) =>  {
    return completed;
  };
}
