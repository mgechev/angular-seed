import {Component, OnDestroy, OnInit,EventEmitter} from '@angular/core';

import { SpinnerService } from './spinner.service';

@Component({
  selector: 'story-spinner',
  template: `
    <div class="spinner" *ngIf="visible"> <i class="fa fa-spinner fa-spin" style="font-size:50px"></i></div>`,
  styles: ['.spinner {position: absolute;left: 46%;top: 50%'],
})

export class SpinnerComponent implements OnDestroy, OnInit {
  visible:boolean = false;
  subscription: EventEmitter<boolean> = new EventEmitter<boolean>();;
  constructor(private _spinnerService: SpinnerService) { }

  ngOnInit() {
        this.subscription = this._spinnerService.getSpinnerEmitter()
            .subscribe((value: boolean) => { this.visible = value; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
