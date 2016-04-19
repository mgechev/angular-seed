import {Component} from "angular2/core";
import {Router} from "angular2/router";
@Component({
    selector: "grid",
    templateUrl: "/pages/grid/components/grid.html"
})

export class GridCmp {
	constructor(private _router: Router) { }
	gotoDashboard() {
		this._router.navigate(["Home"]);
	}
}
