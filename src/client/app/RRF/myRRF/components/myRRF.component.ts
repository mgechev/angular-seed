import { Component} from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { MyRRFAddComponent } from './myRRFAdd.component';
import { MyRRFService } from '../services/myRRF.service';
import { MastersService } from '../../../shared/services/masters.service';

@Component({
    selector: 'rrf-myrrf',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers:[MyRRFService ,MastersService]
})

@Routes([
    { path: '/Add', component: MyRRFAddComponent },
    { path: '/Edit/:id', component: MyRRFAddComponent }
])
export class MyRRFComponent {
}
