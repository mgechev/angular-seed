import {Component} from 'angular2/core';

import {NameList} from '../../services/name_list';

@Component({
  selector: 'about',
  templateUrl: './components/about/about.html'
})
export class AboutCmp {
  constructor(public list: NameList) {}
 /*
 * @param newname  any text as input.
 * @returns return false to prevent default form submit behavior to refresh the page.
 */
  addName(newname): boolean {
    this.list.add(newname.value);
    newname.value = '';
    return false;
  }
}
