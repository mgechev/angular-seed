import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'top-navigation-bar',
    templateUrl: 'app/layout/topNavigationBar/topNavigationBar.component.html',
    directives: [ROUTER_DIRECTIVES],
})

export class TopNavigationBarComponent {
    constructor(private _router: Router) {
    }
}
