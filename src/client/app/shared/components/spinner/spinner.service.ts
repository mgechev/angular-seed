import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SpinnerService {
  private _spinnerSubject: EventEmitter<boolean> = new EventEmitter<boolean>();;

  show() {
    this._spinnerSubject.emit(true);
  }

  hide() {
    this._spinnerSubject.emit(false);
  }

  getSpinnerEmitter() {
    return this._spinnerSubject;
  }
}
