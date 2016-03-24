import {Directive} from 'angular2/core';
import {OnInit} from 'angular2/core';
/**
 * Created by pyan on 3/23/2016.
 */
@Directive({
  selector: 'input[checkboxaction]',
  events: ['triggerAction'],
  host: {
    '(change)': 'callBackendService($event)'
  }
})
export class CheckBoxDirective implements OnInit {

  ngOnInit() {
    console.log('test');
  }


  callBackendService($event) {
    // Do some calls to get data
    // console.log('call service');
    // OR
    // Emit some events


  }
}
