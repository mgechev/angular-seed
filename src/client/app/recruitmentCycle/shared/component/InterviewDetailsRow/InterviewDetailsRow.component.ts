import { Component, Input} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate } from '@angular/router';
import { Interview} from '../../model/interview';

@Component({
  moduleId: module.id,
  selector: 'intwDetailsRow',
  templateUrl: 'InterviewDetailsRow.component.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['InterviewDetails.component.css'],
})

export class InterviewDetailsRowComponent implements OnActivate {
  @Input() InterviewRecord: Interview = new Interview();

  routerOnActivate() {

  }
  getTime(time: string[]) {
    //time:string = interviewTime;
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join('');
  }
}
