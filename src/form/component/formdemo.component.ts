/**
 * Created by pyan on 3/13/2016.
 */
import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {CheckBoxDirective} from '../../app/directives/checkbox.directive';


@Component({
  selector: 'form-demo',
  templateUrl: './form/component/formdemo.component.html',
  directives: [FORM_DIRECTIVES, CheckBoxDirective]
})
export class Formdemo {
  onSubmit(form: any): void {
    console.log('form value is: ', form);
  }

  test(data: any): void {
    console.log('this is data: ', data);
  }
}
