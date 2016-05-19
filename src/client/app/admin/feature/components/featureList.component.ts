import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { FeatureInfo } from '../models/featureInfo';
import { FeatureService } from '../services/feature.service';
import { RMSGridComponent } from '../../../shared/components/rmsGrid/rmsGrid.component';
import {GridOptions} from '../../../shared/components/rmsGrid/models/gridOptions';
import {GridMeta} from '../../../shared/components/rmsGrid/models/gridMeta';

@Component({
    moduleId: module.id,
    selector: 'admin-feature-list',
    templateUrl: 'featureList.component.html',
    directives: [ROUTER_DIRECTIVES, RMSGridComponent]
})

export class FeatureListComponent implements OnInit {
    featureList: Array<FeatureInfo>;
    errorMessage: string;
    public meta: GridMeta;
    constructor(private _featureService: FeatureService, private _router: Router) {
    }

    ngOnInit() {
        this.meta = {
            headerTitle: ['Feature Name'],
            properties: ['FeatureName'],
            dataList: this.featureList,
            itemActions: [{ label: 'Edit', callback: this.onEdit.bind(this), icon: 'fa fa-edit' },
                { label: 'Delete', callback: this.onDelete.bind(this), icon: 'fa fa-trash' }],
            searchCallback: this.getFeatures.bind(this),
            gridOptions: new GridOptions(0, 10, 1, '', '', ''),
            rowClickCallback:this.onEdit.bind(this)
        };
        this.getFeatures();
    }

    getFeatures() {
        this._featureService.getFeatures(this.meta.gridOptions)
            .subscribe(
            results=> {
                this.meta.dataList = results.list;
                this.meta.gridOptions = results.gridOptions;
            },
            error => this.errorMessage = <any>error);
    }

    onDelete(feature:FeatureInfo) {
        this._featureService.deleteFeature(feature)
            .subscribe(
            results=> {
                this.getFeatures();
            },
            error => this.errorMessage = <any>error);
    }

    onEdit(item:FeatureInfo) {
        this._router.navigate(['/Admin/Feature/Edit/' + item.Id]);
    }
}
