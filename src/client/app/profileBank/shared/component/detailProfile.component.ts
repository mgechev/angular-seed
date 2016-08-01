import { Component, Input, Output, EventEmitter} from '@angular/core';
import { OnActivate } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'detail-profile',
    templateUrl: 'detailProfile.component.html',
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    providers: [ToastsManager]
})
export class DetailProfileComponent implements OnActivate {
    constructor(private toastr: ToastsManager) {
        /** */
        console.log('contructor...');
    }
    routerOnActivate() {
        /** */
        console.log('From the detail profile');
    }
}
