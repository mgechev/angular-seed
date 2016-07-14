import {Component, Input,Output, AfterViewInit, EventEmitter ,OnChanges } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, OnActivate } from '@angular/router';
import {CalenderSlot} from '../Model/interviewSlot';
import {InterviewSlotService } from '../Service/InterviewSlot.service';
import { ResponseFromAPI, MasterData} from '../../../../../shared/model/common.model';
import { APIResult} from  '../../../../../shared/constantValue/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'interview-slot',
    templateUrl: 'Interviewslot.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ToastsManager, InterviewSlotService]
})

export class InterviewSlotComponent implements OnActivate, AfterViewInit, OnChanges {
    //@Input() test :string;
    @Input() RRFID: MasterData = new MasterData();
    @Input() RRFCode: string;
    //@Output() HideSlot = new EventEmitter();
    meta: CalenderSlot[] = [];
    errorMessage: string = '';


    constructor(private _router: Router,
        private _interviewSlotService: InterviewSlotService,
        public toastr: ToastsManager) {
        // this.getRRFSlot();
        //this.HideSlot.emit('hideit');
    }

    routerOnActivate() {
        //console.write();
        if (this.meta.length == 0) {
            this.addNewSlot();
        }
    }

    ngAfterViewInit() {
        // this.getRRFSlot();
    }


    onSaveClick() {
        var newAddedCalenderSlot: CalenderSlot[] = [];
        for (var index = 0; index < this.meta.length; index++) {
            if (this.meta[index].ID == undefined) {
                newAddedCalenderSlot.push(this.meta[index]);
            }
        }
        if (newAddedCalenderSlot.length > 0) {
            this._interviewSlotService.SaveCalenderSlot(newAddedCalenderSlot)
                .subscribe(
                results => {
                    if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                        this.toastr.success((<ResponseFromAPI>results).Message);
                    } else {
                        this.toastr.error((<ResponseFromAPI>results).Message);
                    }
                },
                error => this.errorMessage = <any>error);
        }
    }

    getRRFSlot() {
        this._interviewSlotService.getSlotForRRF(this.RRFID)
            .subscribe(
            (results: any) => {
                //this.meta = <any>results;
                this.addNewSlot();
                if (this.meta.length == 0) {
                    this.addNewSlot(); //TODO 
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.toastr.error(<any>error);
            });

    }

    addNewSlot() {
        var calenderSlot: CalenderSlot = new CalenderSlot();
        this.meta.push(calenderSlot);
    }
    removeSlot(slotTobeRemove: number) {
        for (var index = 0; index < this.meta.length; index++) {
            if (this.meta[index].ID == slotTobeRemove) {
                if (this.meta[index].ID == undefined) {
                    this.meta.splice(index, 1);
                } else {
                    this.removeSlotFromDB(this.meta[index]);
                    this.meta.splice(slotTobeRemove, 1);
                }
            }
        }
    }

    removeSlotFromDB(calenderSlot: CalenderSlot) {
        this._interviewSlotService.deleteCalenderSlot(calenderSlot)
            .subscribe(
            results => {
                if ((<ResponseFromAPI>results).StatusCode === APIResult.Success) {
                    this.toastr.success((<ResponseFromAPI>results).Message);
                } else {
                    this.toastr.error((<ResponseFromAPI>results).Message);
                }
            },
            error => this.errorMessage = <any>error);
    }

    ngOnChanges(changes: any) {
        if (changes.RRFCode != undefined && changes.RRFID != undefined) {
            this.getRRFSlot();
        }

    }


}
