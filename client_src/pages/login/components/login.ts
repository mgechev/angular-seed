import {Component} from "angular2/core";
import {Router} from "angular2/router";
@Component({
	selector : "login",
	templateUrl : "/pages/login/components/login.html"
})

export class LoginCmp {
	constructor( private _router: Router) {}
	gotoDashboard() {
		this._router.navigate(["Dashboard"]);
	}
	gotoSignup() {
		this._router.navigate(["Signup"]);
	}
}
