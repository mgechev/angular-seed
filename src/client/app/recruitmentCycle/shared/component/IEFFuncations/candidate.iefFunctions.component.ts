import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IEFFunction} from '../../../shared/model/ief';
import { MasterData } from  '../../../../shared/model/index';

@Component({
    moduleId: module.id,
    selector: 'ief-function',
    templateUrl: 'candidate.iefFunctions.component.html',
})
export class IEFFunctionComponent {
    //@Input() iefFunction: IEFFunction;
   // @Output() updatedFunction: EventEmitter<IEFFunction> = new EventEmitter<IEFFunction>();
    _localFunction: IEFFunction;
    ratings: Array<MasterData>;
    constructor(parameters: string) {
        /** */
        // this._localFunction = this.iefFunction;
        // /**add ratings in dropdown */
        // for (var index = 0; index < 4; index++) {
        //     var mstData: MasterData = new MasterDat  a();
        //     mstData.Id = index;
        //     mstData.Value = index.toString();
        //     this.ratings.push(mstData);
        // }
        console.log('From Component..!');


    }
}
