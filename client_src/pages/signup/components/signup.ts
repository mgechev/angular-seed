import {Component} from "angular2/core";
import {Router} from "angular2/router";

@Component({
	selector: "login",
	templateUrl: "/pages/signup/components/signup.html"
})

export class SignupCmp {
	constructor( private _router: Router) {}
	gotoLogin() {
		this._router.navigate(["Login"]);
	}
	gotoDashboard() {
		this._router.navigate(["Dashboard"]);
	}
}
