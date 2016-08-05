import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate } from '@angular/router';
import { TreeViewComponent } from '../../shared/components/treeview/treeview.component';
import { TreeviewData, TreeviewNode } from '../../shared/components/treeview/models/treeviewData';

@Component({
    moduleId: module.id,
    selector: 'push-notification',
    templateUrl: 'pushNotification.component.html',
    directives: [ROUTER_DIRECTIVES, TreeViewComponent]
})

export class PushNotificationComponent implements OnActivate {
    RRFData: TreeviewData = new TreeviewData();
    ProfileBankData: TreeviewData = new TreeviewData();
    RecruitmentCycleData: TreeviewData = new TreeviewData();

    notificationStatus: boolean = false;

    constructor() {
        this.createRRFObject();
        this.createProfileBankObject();
        this.createRecCycleObject();
    }

    routerOnActivate() {
        (<any>($(".make-switch"))).bootstrapSwitch();
    }

    createRRFObject() {
        this.RRFData.mainNodeName = 'RRF';
        this.RRFData.mainNodeChecked = false;
        let RRFsubObj1 = new TreeviewNode();
        RRFsubObj1.name = 'RRF Raise';
        RRFsubObj1.description = 'Get notification when RRF raise';
        RRFsubObj1.checked = false;

        let RRFsubObj2 = new TreeviewNode();
        RRFsubObj2.name = 'RRF Approval';
        RRFsubObj2.description = 'Get notification when RRF raise';
        RRFsubObj2.checked = true;

        this.RRFData.nodes.push(RRFsubObj1);
        this.RRFData.nodes.push(RRFsubObj2);
    }

    createProfileBankObject() {

        let RRFsubObj1 = new TreeviewNode();
        RRFsubObj1.name = 'RRF Raise';
        RRFsubObj1.description = 'Get notification when RRF raise';

        let RRFsubObj2 = new TreeviewNode();
        RRFsubObj2.name = 'RRF Approval';
        RRFsubObj2.description = 'Get notification when RRF raise';
        RRFsubObj2.checked = true;

        this.ProfileBankData.nodes.push(RRFsubObj1);
        this.ProfileBankData.nodes.push(RRFsubObj2);
    }

    createRecCycleObject() {
        let RRFsubObj1 = new TreeviewNode();
        RRFsubObj1.name = 'RRF Raise';
        RRFsubObj1.description = 'Get notification when RRF raise';

        let RRFsubObj2 = new TreeviewNode();
        RRFsubObj2.name = 'RRF Approval';
        RRFsubObj2.description = 'Get notification when RRF raise';
        RRFsubObj2.checked = true;

        this.RecruitmentCycleData.nodes.push(RRFsubObj1);
        this.RecruitmentCycleData.nodes.push(RRFsubObj2);
    }
    
    onSaveSettings(){
        
    }

}
