import { Component } from '@angular/core';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})

export class NavbarComponent {
  public lang: string;
  public constructor() {
    this.lang = localStorage.getItem('lang') || 'en-US';
  }
  public selectLanguage = (lang: string): void => {
    localStorage.setItem('lang', lang);
    window.location.href = '/';
  }
}
