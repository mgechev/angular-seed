import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  public constructor(private _router: Router) {
    this.lang = localStorage.getItem('lang') || 'en-US';
  }
  public selectLanguage = (lang: string): void => {
    localStorage.setItem('lang', lang);
    window.location.href = '/';
  }
}
