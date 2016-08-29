import { Component, Input} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Interview} from '../../model/interview';

@Component({
    moduleId: module.id,
    selector: 'intwDetailsRow',
    templateUrl: 'InterviewDetailsRow.component.html',
    directives: [ROUTER_DIRECTIVES],
      styleUrls: ['InterviewDetails.component.css'],
})

export class InterviewDetailsRowComponent {
     @Input() InterviewRecord: Interview = new Interview();
     
}
