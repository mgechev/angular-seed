import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, OnActivate } from '@angular/router';
import { TreeViewComponent } from '../../shared/components/treeview/treeview.component';
import { TreeviewData, TreeviewNode } from '../../shared/components/treeview/models/treeviewData';
// import { UiSwitchComponent } from 'angular2-ui-switch';

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
        (<any>($('.make-switch'))).bootstrapSwitch();
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
        RRFsubObj2.description = 'Get notification when RRF come for Approval';
        RRFsubObj2.checked = true;

        let RRFsubObj4 = new TreeviewNode();
        RRFsubObj4.name = 'RRF Approved/Rejected';
        RRFsubObj4.description = 'Get notification when Approved/Rejected';

        let RRFsubObj3 = new TreeviewNode();
        RRFsubObj3.name = 'RRF Assigned';
        RRFsubObj3.description = 'Get notification when RRF assigned to me';

        this.RRFData.nodes.push(RRFsubObj1);
        this.RRFData.nodes.push(RRFsubObj2);
    }

    createProfileBankObject() {
        this.ProfileBankData.mainNodeName = 'Profile Bank';
        this.ProfileBankData.mainNodeChecked = false;

        let RRFsubObj1 = new TreeviewNode();
        RRFsubObj1.name = 'Owership changed';
        RRFsubObj1.description = 'Get notification when ownership of profile changed';

        this.ProfileBankData.nodes.push(RRFsubObj1);
    }

    createRecCycleObject() {
        this.RecruitmentCycleData.mainNodeName = 'Recruitment Cycle';
        this.RecruitmentCycleData.mainNodeChecked = false;

        let RRFsubObj1 = new TreeviewNode();
        RRFsubObj1.name = 'IEF submited';
        RRFsubObj1.description = 'Get notification when IEF submited by Interviewer';

        let RRFsubObj2 = new TreeviewNode();
        RRFsubObj2.name = 'Interview Schedule';
        RRFsubObj2.description = 'Get notification when Interview Schedule';
        RRFsubObj2.checked = true;

        this.RecruitmentCycleData.nodes.push(RRFsubObj1);
        this.RecruitmentCycleData.nodes.push(RRFsubObj2);
    }

    onSaveSettings() {

    }

}
