import { Component } from "angular2/core";
import {Router} from "angular2/router";

import { CORE_DIRECTIVES, FORM_DIRECTIVES } from "angular2/common";
import {
    BUTTON_DIRECTIVES,
    TAB_DIRECTIVES,
    DROPDOWN_DIRECTIVES,
    TYPEAHEAD_DIRECTIVES,
    Collapse,
    PAGINATION_DIRECTIVES,
    Rating }
from "ng2-bootstrap/ng2-bootstrap";


@Component({
    selector: "buttons-demo",
    templateUrl: "/pages/component/components/component.html",
    directives: [
        BUTTON_DIRECTIVES,
        CORE_DIRECTIVES,
        TAB_DIRECTIVES,
        TYPEAHEAD_DIRECTIVES,
        FORM_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        Rating,
        Collapse,
        PAGINATION_DIRECTIVES
    ]
})
export class ComponentCmp {
    constructor(private _router: Router) { }
    singleModel: string = "1";
    radioModel: string = "Middle";
    isCollapsed: boolean = false;
    checkModel: any = {left: false, middle: true, right: false};
    totalItems: number = 64;
    currentPage: number = 4;
    x: number = 5;
    y: number = 2;
    max: number = 10;
    rate: number = 7;
    isReadonly: boolean = false;

    overStar: number;
    percent: number;

    ratingStates: any = [
        { stateOn: "fa fa-check", stateOff: "fa fa-check-circle" },
        { stateOn: "fa fa-star", stateOff: "fa fa-star-o" },
        { stateOn: "fa fa-heart", stateOff: "fa fa-times-circle" },
        { stateOn: "fa fa-heart" },
        { stateOff: "fa fa-toggle-off" }
    ];
  	maxSize: number = 5;
  	bigTotalItems: number = 175;
  	bigCurrentPage: number = 1;


  	disabled: boolean = false;
   	status: {isopen: boolean} = {isopen: false};
   	items: Array<string> = ["The first choice!", "And another choice for you.", "but wait! A third!"];
   	tabs: Array<any> = [
   	    {title: "Dynamic Title 1", content: "Dynamic content 1"},
   	    {title: "Dynamic Title 2", content: "Dynamic content 2", disabled: true}
   	];

    selected: string = "";
    asyncSelected: string = "";
    typeaheadLoading: boolean = false;
    typeaheadNoResults: boolean = false;
    states: Array<string> = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"];
    statesComplex: Array<any> = [
       {id: 1, name: "Alabama"}, {id: 2, name: "Alaska"}, {id: 3, name: "Arizona"},
       {id: 4, name: "Arkansas"}, {id: 5, name: "California"},
       {id: 6, name: "Colorado"}, {id: 7, name: "Connecticut"},
       {id: 8, name: "Delaware"}, {id: 9, name: "Florida"},
       {id: 10, name: "Georgia"}, {id: 11, name: "Hawaii"},
       {id: 12, name: "Idaho"}, {id: 13, name: "Illinois"},
       {id: 14, name: "Indiana"}, {id: 15, name: "Iowa"},
       {id: 16, name: "Kansas"}, {id: 17, name: "Kentucky"},
       {id: 18, name: "Louisiana"}, {id: 19, name: "Maine"},
       {id: 21, name: "Maryland"}, {id: 22, name: "Massachusetts"},
       {id: 23, name: "Michigan"}, {id: 24, name: "Minnesota"},
       {id: 25, name: "Mississippi"}, {id: 26, name: "Missouri"},
       {id: 27, name: "Montana"}, {id: 28, name: "Nebraska"},
       {id: 29, name: "Nevada"}, {id: 30, name: "New Hampshire"},
       {id: 31, name: "New Jersey"}, {id: 32, name: "New Mexico"},
       {id: 33, name: "New York"}, {id: 34, name: "North Dakota"},
       {id: 35, name: "North Carolina"}, {id: 36, name: "Ohio"},
       {id: 37, name: "Oklahoma"}, {id: 38, name: "Oregon"},
       {id: 39, name: "Pennsylvania"}, {id: 40, name: "Rhode Island"},
       {id: 41, name: "South Carolina"}, {id: 42, name: "South Dakota"},
       {id: 43, name: "Tennessee"}, {id: 44, name: "Texas"},
       {id: 45, name: "Utah"}, {id: 46, name: "Vermont"},
       {id: 47, name: "Virginia"}, {id: 48, name: "Washington"},
       {id: 49, name: "West Virginia"}, {id: 50, name: "Wisconsin"},
       { id: 51, name: "Wyoming" }
    ];
    _cache: any;
    _prevContext: any;

    toggled(open: boolean): void {
        console.log("Dropdown is now: ", open);
    }

    toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }
    setPage(pageNo: number): void {
        this.currentPage = pageNo;
    };

    pageChanged(event: any): void {
        console.log("Page changed to: " + event.page);
        console.log("Number items per page: " + event.itemsPerPage);
    };

    hoveringOver(value: number): void {
        this.overStar = value;
        this.percent = 100 * (value / this.max);
    };

    resetStar() {
        this.overStar = null;
    }

    alertMe() {
        setTimeout(function () {
        alert("You\"ve selected the alert tab!");
        });
    };

    setActiveTab(index: number) {
        this.tabs[index].active = true;
    }
    getContext() {
        return this;
    }
    getAsyncData(context: any): Function {
        if (this._prevContext === context) {
            return this._cache;
        }

        this._prevContext = context;
        let f: Function = function (): Promise<string[]> {
            let p: Promise<string[]> = new Promise((resolve: Function) => {
            setTimeout(() => {
                let query = new RegExp(context.asyncSelected, "ig");
                return resolve(context.states.filter((state: any) => {
                return query.test(state);
                }));
            }, 200);
            });
            return p;
        };
        this._cache = f;
        return this._cache;
    }

    changeTypeaheadLoading(e: boolean) {
        this.typeaheadLoading = e;
    }

    changeTypeaheadNoResults(e: boolean) {
        this.typeaheadNoResults = e;
    }

    typeaheadOnSelect(e: any) {
        console.log(`Selected value: ${e.item}`);
    }
    gotoDashboard() {
        this._router.navigate(["Home"]);
    }
}
