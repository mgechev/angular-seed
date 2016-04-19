import {Component} from "angular2/core";
import {Router} from "angular2/router";
@Component({
	selector: "form",
	templateUrl: "/pages/forms/components/forms.html"
})

export class FormCmp {
	constructor(private _router: Router) { }
	gotoDashboard() {
		this._router.navigate(["Home"]);
	}
}
