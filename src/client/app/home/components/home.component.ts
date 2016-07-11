import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, RouteSegment, RouteTree } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { TopNavigationBarComponent } from '../../layout/topNavigationBar/topNavigationBar.component';
import { PageActionsComponent } from '../../layout/pageActions/pageActions.component';
import { SideBarComponent } from '../../layout/sideBar/sideBar.component';
import { QuickSidebarComponent } from '../../layout/quickSidebar/quickSidebar.component';
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
import { AllProfilesComponent } from '../../profileBank/allProfiles/index';
import { BlackListedProfilesComponent } from '../../profileBank/blackListedProfiles/index';
import { MyProfilesComponent } from '../../profileBank/myProfiles/index';
import { CompanyProfilesComponent } from '../../profileBank/companyProfiles/index';
import { RecentProfilesComponent } from '../../profileBank/recentProfiles/index';
import { MyRRFComponent } from '../../RRF/myRRF/index';
import { RRFApprovalComponent } from '../../RRF/RRFApproval/index';
import { RRFDashboardComponent } from '../../RRF/RRFDashboard/index';
import { SpinnerComponent, SpinnerService } from '../../shared/components/spinner/spinner';
import { InterviewrsComponent } from '../../Recruitment Cycle/InterviewersTab/index';
import {ScheduleInterviewComponent} from '../../Recruitment Cycle/ScheduleInterview/index';
import {DashboardComponent} from '../../Dashboard/component/dashboard.component';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    directives: [ROUTER_DIRECTIVES, FooterComponent, PageActionsComponent, TopNavigationBarComponent,
        SideBarComponent, QuickSidebarComponent, SpinnerComponent, DashboardComponent],
    providers: [SpinnerService],
})
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
    { path: '/RRF/MyRRF', component: MyRRFComponent },
    { path: '/RRF/RRFApproval', component: RRFApprovalComponent },
    { path: '/RRF/RRFDashboard', component: RRFDashboardComponent },
    { path: '/Recruitment Cycle/Interviewers', component: InterviewrsComponent },
    { path: '/Recruitment Cycle/Schedule', component: ScheduleInterviewComponent },

])
export class HomeComponent implements OnInit {
    ngOnInit(): void {
        App.init();
        Layout.init();
        Demo.init();
    }
    routerOnActivate(segment: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        console.log(segment);
    }
}
