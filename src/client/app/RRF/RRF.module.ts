import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { IfAuthorizeDirective, MastersService } from '../shared/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
    RRFGridRowComponent,
    PanelsAvailablityComponent,
    FeedbackDataComponent,
    ViewRRFComponent } from './shared/index';
import { InterviewApprovalComponent } from '../recruitmentCycle/index';
@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        IfAuthorizeDirective
        , MastersService
        , RRFGridRowComponent
        , FeedbackDataComponent
        , PanelsAvailablityComponent
        , InterviewApprovalComponent
        , ViewRRFComponent
    ],
    exports: [
        RRFGridRowComponent
        , FeedbackDataComponent
        , PanelsAvailablityComponent
    ],
    providers: [ToastsManager]
})
export class RRFModule { }
