"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
/**
 * This class represents the lazy loaded HomeComponent.
 */
var HomeComponent = (function () {
    /**
     * Creates an instance of the HomeComponent with the injected
     * NameListService.
     *
     * @param {NameListService} nameListService - The injected NameListService.
     */
    function HomeComponent(nameListService) {
        this.nameListService = nameListService;
        this.newName = '';
        this.names = [];
    }
    /**
     * Get the names OnInit
     */
    HomeComponent.prototype.ngOnInit = function () {
        this.getNames();
    };
    /**
     * Handle the nameListService observable
     */
    HomeComponent.prototype.getNames = function () {
        var _this = this;
        this.nameListService.get()
            .subscribe(function (names) { return _this.names = names; }, function (error) { return _this.errorMessage = error; });
    };
    /**
     * Pushes a new name onto the names array
     * @return {boolean} false to prevent default form submit behavior to refresh the page.
     */
    HomeComponent.prototype.addName = function () {
        // TODO: implement nameListService.post
        this.names.push(this.newName);
        this.newName = '';
        return false;
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sd-home',
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css'],
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map