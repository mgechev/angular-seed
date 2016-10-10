import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
/**Layout */
import { FooterComponent } from '../../layout/footer/footer.component';
import { TopNavigationBarComponent } from '../../layout/topNavigationBar/topNavigationBar.component';
import { PageActionsComponent } from '../../layout/pageActions/pageActions.component';
import { SideBarComponent } from '../../layout/sideBar/sideBar.component';
import { QuickSidebarComponent } from '../../layout/quickSidebar/quickSidebar.component';
/** admin */
import { FeatureComponent } from '../../admin/feature/index';
import { PracticeComponent } from '../../admin/practice/index';
import { SkillComponent } from '../../admin/skill/index';
import { RoleComponent } from '../../admin/role/index';
import { UserComponent } from '../../admin/user/index';
import { TechnologyComponent } from '../../admin/technology/index';
import { QualificationComponent } from '../../admin/qualification/index';
import { InterviewRoundComponent } from '../../admin/interviewRound/index';
import { DesignationComponent } from '../../admin/designation/index';
import { OwnerTypeComponent } from '../../admin/ownerType/index';
/** profileBank */
import { AllProfilesComponent } from '../../profileBank/index';
import { BlackListedProfilesComponent } from '../../profileBank/blackListedProfiles/index';
import { MyProfilesComponent } from '../../profileBank/myProfiles/index';
import { CompanyProfilesComponent } from '../../profileBank/companyProfiles/index';
import { RecentProfilesComponent } from '../../profileBank/recentProfiles/index';
import { IncompleteProfilesComponent } from '../../profileBank/incompleteProfiles/index';
import { AdvanceSearchComponent } from '../../profileBank/advanceSearch/index';
/** RRF */
import { MyRRFComponent } from '../../RRF/myRRF/index';
import { RRFApprovalComponent } from '../../RRF/RRFApproval/index';
import { RRFDashboardComponent } from '../../RRF/RRFDashboard/index';
import { FeedbackPendingComponent } from '../../RRF/FeedBackPending/index';
import {InterviewerAvalabilityComponent } from '../../RRF/index';
//import { PendingRequestComponent } from '../../RRF/PendingRequest/index';
/** Recruitment Cycle */
import {ShowScheduleInterviewsComponent} from '../../recruitmentCycle/index';
import {ScheduleInterviewComponent} from '../../recruitmentCycle/scheduleInterview/index';
import { InterviewrsComponent, RecruitmentInterviewerCalenderComponent } from '../../recruitmentCycle/interviewersTab/index';

import { SpinnerComponent, SpinnerService } from '../../shared/components/spinner/spinner';
import {DashboardComponent} from '../../Dashboard/component/dashboard.component';
import { PushNotificationComponent } from '../../settings/index';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    // directives: [ROUTER_DIRECTIVES, FooterComponent, PageActionsComponent, TopNavigationBarComponent,
    //     SideBarComponent, QuickSidebarComponent, SpinnerComponent, DashboardComponent],
    providers: [SpinnerService],
})
/**
 * angular 2.0 changes
@Routes([
    //{ path: '/', component: DashboardComponent },
    { path: '/Admin/Feature', component: FeatureComponent },
    { path: '/Admin/Practice', component: PracticeComponent },
    { path: '/Admin/Skill', component: SkillComponent },
    { path: '/Admin/Role', component: RoleComponent },
    { path: '/Admin/User', component: UserComponent },
    { path: '/Admin/Technology', component: TechnologyComponent },
    { path: '/Admin/Qualification', component: QualificationComponent },
    { path: '/Admin/InterviewRounds', component: InterviewRoundComponent },
    { path: '/Admin/Designation', component: DesignationComponent },
    { path: '/Admin/OwnerType', component: OwnerTypeComponent },
    { path: '/ProfileBank/AllProfiles', component: AllProfilesComponent },
    { path: '/ProfileBank/BlackListedProfiles', component: BlackListedProfilesComponent },
    { path: '/ProfileBank/MyProfiles', component: MyProfilesComponent },
    { path: '/ProfileBank/CompanyProfiles', component: CompanyProfilesComponent },
    { path: '/ProfileBank/RecentProfiles', component: RecentProfilesComponent },
    { path: '/ProfileBank/IncompleteProfiles', component: IncompleteProfilesComponent },
    { path: '/ProfileBank/AdvanceSearch', component: AdvanceSearchComponent },
    { path: '/RRF/MyRRF', component: MyRRFComponent },
    { path: '/RRF/RRFApproval', component: RRFApprovalComponent },
    { path: '/RRF/RRFDashboard', component: RRFDashboardComponent },
    //{ path: '/RRF/PendingRequest', component: PendingRequestComponent },
    { path: '/AllInterviews/showInterviews', component: ShowScheduleInterviewsComponent },
    { path: '/Recruitment Cycle/Interviewers', component: InterviewrsComponent },
    { path: '/Recruitment Cycle/Schedule', component: ScheduleInterviewComponent },
    { path: '/Recruitment Cycle/mycalendar', component: RecruitmentInterviewerCalenderComponent },
    { path: '/NotificationSetting', component: PushNotificationComponent },
    { path: '/RRF/InterviewsAvailability', component: InterviewerAvalabilityComponent },
    { path: '/RRF/FeedbackPending', component: FeedbackPendingComponent }
])
 */
export class HomeComponent implements OnInit {
    ngOnInit(): void {
        App.init();
        Layout.init();
        Demo.init();
    }
    routerOnActivate(segment: ActivatedRoute, prev?: ActivatedRoute) {
        console.log(segment);
    }
}
