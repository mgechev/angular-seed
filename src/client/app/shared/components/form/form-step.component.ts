import { Component, Input, ContentChildren, QueryList } from '@angular/core';

@Component({
  selector: 'cotw-form-step',
  template:
  `
    <div [hidden]="!isActive">
      <ng-content></ng-content>
    </div>
  `
})
export class FormStepComponent {
  @Input() isValid: boolean = false;

  private _isActive: boolean = false;

  constructor() { }

  ngAfterContentInit() {
    
  }

  set isActive(val: boolean) {
    this._isActive = val;
  }

  get isActive(): boolean {
    return this._isActive;
  }

}
