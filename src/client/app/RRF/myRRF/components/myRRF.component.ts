import { Component} from '@angular/core';
import { Routes} from '@angular/router';
import { MyRRFAddComponent } from './myRRFAdd.component';
import { MyRRFService } from '../services/myRRF.service';
import { MastersService } from '../../../shared/services/masters.service';

@Component({
    selector: 'rrf-myrrf',
    template: '<router-outlet></router-outlet>',
    // directives: [ROUTER_DIRECTIVES],
    providers: [MyRRFService, MastersService]
})
/**
 * angular 2.0 changes
@Routes([
    { path: '/Add', component: MyRRFAddComponent },
    { path: '/Edit/:id', component: MyRRFAddComponent }
])
 */
export class MyRRFComponent {
}
