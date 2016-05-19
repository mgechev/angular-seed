import {Directive, ElementRef, OnInit, Input} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
@Directive({
    selector: '[ifAuthorize]'
})
export class IfAuthorizeDirective implements OnInit {

    @Input() ifAuthorize:Array<string>;
    private _element: HTMLElement;

    constructor(_element: ElementRef, private commonService: CommonService) {
        this._element = _element.nativeElement;
    }

    ngOnInit() {

        let userHasPermissions = false;
        let loggedInUserPermission = this.commonService.getLoggedInUserPermission();
        if (loggedInUserPermission.length > 0) {
            for (var i = 0; i < this.ifAuthorize.length; i++) {
                if (loggedInUserPermission.indexOf(this.ifAuthorize[i]) === -1) {
                    userHasPermissions = false;
                } else {
                    userHasPermissions = true;
                }
            }
            if (!userHasPermissions) {
                this._element.style.display = 'none';
            }
        }else {
            this._element.style.display = 'none';
        }
    }
}
