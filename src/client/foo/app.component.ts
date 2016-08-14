import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Config, NameListService } from '../shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {

  names: string[];

  constructor(private nameListService: NameListService) {
    console.log('Environment config', Config);
  }

  ngOnInit() {
    this.nameListService.get()
      .subscribe((names: string[]) => this.names = names);
  }
}
