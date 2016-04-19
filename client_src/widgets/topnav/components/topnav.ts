import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Dropdown, DropdownToggle} from "ng2-bootstrap/ng2-bootstrap";
import {DROPDOWN_DIRECTIVES, ACCORDION_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {RouteConfig, ROUTER_DIRECTIVES, Router} from "angular2/router";

import {HomeCmp} from "../../../pages/home/components/home";


@Component({
	selector: "topnav",
	templateUrl: "/widgets/topnav/components/topnav.html",
	directives: [Dropdown, DropdownToggle, ROUTER_DIRECTIVES, CORE_DIRECTIVES, ACCORDION_DIRECTIVES],
	viewProviders: [Dropdown, DropdownToggle, DROPDOWN_DIRECTIVES]
})
@RouteConfig([
	{ path: "/home", component: HomeCmp, as: "Home" }
])
export class TopNavCmp {
	public oneAtATime: boolean = true;
	public items: Array<any> = [{name: "google", link: "www.google.com"}, {name: "facebook", link: "www.facebook.com"}];
	public status: Object = {
	    isFirstOpen: true,
	    isFirstDisabled: false
	};
	constructor(private _router: Router) { }
	gotoDashboard() {
		this._router.navigate(["Home"]);
	}
	gotoLogin() {
		this._router.navigate(["Login"]);
	}
}
