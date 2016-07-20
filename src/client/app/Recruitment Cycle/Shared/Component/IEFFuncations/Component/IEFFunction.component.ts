import { Component, Input, Output, EventEmitter} from '@angular/core';
import { OnActivate } from '@angular/router';
import { IEFFunction} from '../../../../Shared/model/ief';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
    moduleId: module.id,
    selector: 'ief-function',
    templateUrl: 'IEFFunction.component.html',
    providers: [ToastsManager]
})
export class IEFFunctionComponent implements OnActivate {
    @Input() recordCount: number;
    @Input() functionsCollection: IEFFunction[];
    @Output() functionUpdate: EventEmitter<Array<IEFFunction>> = new EventEmitter<Array<IEFFunction>>();
    ratings: Array<number> = new Array<number>();
    constructor(public toastr: ToastsManager) {
        for (var index = 1; index <= 5; index++) {
            this.ratings.push(index);
        }
    }
    routerOnActivate() {
        /** */
    }
    onUpdate() {
        //console.log(this.functionsCollection[this.recordCount]);
        this.functionUpdate.emit(this.functionsCollection);
    }
}
