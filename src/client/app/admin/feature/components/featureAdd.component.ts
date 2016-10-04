import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeatureInfo } from '../models/featureInfo';
import { FeatureService } from '../services/feature.service';

@Component({
    moduleId: module.id,
    selector: 'admin-feature-add',
    templateUrl: 'featureAdd.component.html'
    //,directives: [ROUTER_DIRECTIVES]
})

export class FeatureAddComponent implements OnInit {
    feature: FeatureInfo;
    errorMessage: string;
    params: number;
    constructor(
        private _featureService: FeatureService,
        private _router: Router,
        private activatedRoute: ActivatedRoute) {
        this.feature = new FeatureInfo(0, '');
    }

    ngOnInit() {
        this.params = this.activatedRoute.snapshot.params['Id'];
        //this.params = Number(segment.getParam('id'));
        if (this.params) {
            this._featureService.getFeatureById(this.params)
                .subscribe(
                (results: FeatureInfo) => {
                    this.feature = results;
                },
                error => this.errorMessage = <any>error);
        }
    }

    onSave(): void {
        if (this.params) {
            this._featureService.editFeature(this.feature)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/Feature/']);
                },
                error => this.errorMessage = <any>error);
        } else {
            this._featureService.addFeature(this.feature)
                .subscribe(
                results => {
                    this._router.navigate(['/App/Admin/Feature/']);
                },
                error => this.errorMessage = <any>error);
        }
    }
}
