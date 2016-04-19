import {Component} from "angular2/core";
import {Alert} from "ng2-bootstrap/ng2-bootstrap";
import { CORE_DIRECTIVES} from "angular2/common";
import { DROPDOWN_DIRECTIVES, CAROUSEL_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";

@Component({
  selector: "timeline",
  templateUrl: "/pages/home/components/timeline.html",
  styleUrls: ["/pages/home/components/timeline.css"],
  directives: [CORE_DIRECTIVES]
})
class TimelineCmp {}

@Component({
  selector: "chat",
  templateUrl: "./pages/home/components/chat.html",
  directives: [CORE_DIRECTIVES, DROPDOWN_DIRECTIVES]
})
class ChatCmp {
	status: { isopen: boolean } = { isopen: false };
}

@Component({
  selector: "notifications",
  templateUrl: "./pages/home/components/notifications.html",
  styleUrls: ["./pages/home/components/home.css"],
  directives: [CORE_DIRECTIVES]
})
class NotificationCmp {}


@Component({
  selector: "home",
  templateUrl: "./pages/home/components/home.html",
  styleUrls: ["./pages/home/components/home.css"],
  directives: [Alert, TimelineCmp, ChatCmp, NotificationCmp, CAROUSEL_DIRECTIVES]
})

export class HomeCmp {

	/* Carousel Variable */
	myInterval: number = 5000;
	index: number = 0;
	slides: Array<any> = [];
	imgUrl: Array<any> = [
		`assets/img/slider1.jpg`,
		`assets/img/slider2.jpg`,
		`assets/img/slider3.jpg`,
		`assets/img/slider0.jpg`
	];
	/* END */

	constructor() {
		for (let i = 0; i < 4; i++) {
			this.addSlide();
		}
	}

	/* Alert component */
	alerts: Array<Object> = [
		{
			type: "info",
			msg: "Well done! You successfully read this important alert message.",
			closable: true
		}
	];

	closeAlert(i: number) {
		this.alerts.splice(i, 1);
	}
	/* END*/

	/* Carousel */
	addSlide() {
		let i = this.slides.length;
		this.slides.push({
			image: this.imgUrl[i],
			text: `${["Dummy ", "Dummy ", "Dummy ", "Dummy "][this.slides.length % 4]}
      			${["text 0", "text 1", "text 2", "text 3"][this.slides.length % 4]}`
		});
	}
	/* END */
}
