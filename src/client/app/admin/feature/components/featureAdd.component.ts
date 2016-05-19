import {Component } from '@angular/core';
import { Router, OnActivate, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import { FeatureInfo } from '../models/featureInfo';
import { FeatureService } from '../services/feature.service';

@Component({
    selector: 'admin-feature-add',
    templateUrl: 'app/admin/feature/components/featureAdd.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class FeatureAddComponent implements OnActivate {
    feature: FeatureInfo;
    errorMessage: string;
    params: number;
    constructor(private _featureService: FeatureService,
        private _router: Router) {
        this.feature = new FeatureInfo(0, '');
    }

    routerOnActivate(segment: RouteSegment) {
        this.params = Number(segment.getParam('id'));
        if (this.params) {
            this._featureService.getFeatureById(this.params)
                .subscribe(
                results=> {
                    this.feature = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._featureService.editFeature(this.feature)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/Feature/']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._featureService.addFeature(this.feature)
                .subscribe(
                results=> {
                    this._router.navigate(['/Admin/Feature/']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
