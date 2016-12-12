import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {

  @Input() title: string;



}
