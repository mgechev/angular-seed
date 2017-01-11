import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/index';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-lazy-about',
  templateUrl: 'lazy-about.component.html',
  styleUrls: ['lazy-about.component.css']
})
export class LazyAboutComponent implements OnInit {

  names: any[] = [];

  constructor(public nameListService: NameListService) {}

  ngOnInit() {
    this.nameListService.get()
      .subscribe(names => this.names = names );
  }



}
