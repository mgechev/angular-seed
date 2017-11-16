import { Component } from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';

@Component({
  moduleId: module.id,
  selector: 'cotw-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  constructor() {
    console.log('Environment config', Config);
  }
}
