import {
	Component
} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import * as moment from "moment";
import {DATEPICKER_DIRECTIVES, Timepicker} from "ng2-bootstrap/ng2-bootstrap";

@Component({
	selector: "charts",
	templateUrl: "/pages/date-time/components/date-time.html",
	directives: [DATEPICKER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, Timepicker]
})

export class DateTimeCmp {
	/*Variables for date*/
	dt: Date = new Date();
	minDate: Date = null;
	events: Array<any>;
	tomorrow: Date;
	afterTomorrow: Date;
	formats: Array<string> = ["DD-MM-YYYY", "YYYY/MM/DD", "DD.MM.YYYY", "shortDate"];
	format = this.formats[0];
	dateOptions: any = {
		formatYear: "YY",
		startingDay: 1
	};
	opened: boolean = false;
	/*END*/

	/*Variable for time*/
	hstep: number = 1;
	mstep: number = 15;
	ismeridian: boolean = true;

	mytime: Date = new Date();
	options: any = {
		hstep: [1, 2, 3],
		mstep: [1, 5, 10, 15, 25, 30]
	};
	/*END*/
	constructor() {
		(this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
		(this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
		(this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
		this.events = [
			{ date: this.tomorrow, status: "full" },
			{ date: this.afterTomorrow, status: "partially" }
		];
	}
	getDate(): number {
		return this.dt && this.dt.getTime() || new Date().getTime();
	}
	today() {
		this.dt = new Date();
	}

	d20090824() {
		this.dt = moment("2009-08-24", "YYYY-MM-DD").toDate();
	}

	// todo: implement custom class cases
	getDayClass(date: any, mode: string) {
		if (mode === "day") {
			let dayToCheck = new Date(date).setHours(0, 0, 0, 0);

			for (let i = 0; i < this.events.length; i++) {
				let currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);

				if (dayToCheck === currentDay) {
					return this.events[i].status;
				}
			}
		}

		return "";
	}

	disabled(date: Date, mode: string): boolean {
		return (mode === "day" && (date.getDay() === 0 || date.getDay() === 6));
	}

	open() {
		this.opened = !this.opened;
	}

	clear() {
		this.dt = null;
		this.mytime = null;
	}

	toggleMin() {
		this.dt = this.minDate;
	}
	/*Method for date*/
	toggleMode(): void {
		this.ismeridian = !this.ismeridian;
	};

	update(): void {
		let d = new Date();
		d.setHours(14);
		d.setMinutes(0);
		this.mytime = d;
	};

	changed(): void {
		console.log("Time changed to: " + this.mytime);
	};
	/*END*/
}
