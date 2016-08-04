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
import { IncompleteProfilesComponent } from '../../profileBank/incompleteProfiles/index';
import { MyRRFComponent } from '../../RRF/myRRF/index';
import { RRFApprovalComponent } from '../../RRF/RRFApproval/index';
import { RRFDashboardComponent } from '../../RRF/RRFDashboard/index';
import { SpinnerComponent, SpinnerService } from '../../shared/components/spinner/spinner';
import { InterviewrsComponent, RecruitmentInterviewerCalenderComponent } from '../../recruitmentCycle/interviewersTab/index';
import {ScheduleInterviewComponent} from '../../recruitmentCycle/scheduleInterview/index';
import {DashboardComponent} from '../../Dashboard/component/dashboard.component';
import {ShowScheduleInterviewsComponent} from '../../recruitmentCycle/recruitersTab/components/interviews.component';

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
    { path: '/ProfileBank/IncompleteProfiles', component: IncompleteProfilesComponent },
    { path: '/RRF/MyRRF', component: MyRRFComponent },
    { path: '/RRF/RRFApproval', component: RRFApprovalComponent },
    { path: '/RRF/RRFDashboard', component: RRFDashboardComponent },
    { path: '/AllInterviews/showInterviews', component: ShowScheduleInterviewsComponent },
    { path: '/Recruitment Cycle/Interviewers', component: InterviewrsComponent },
    { path: '/Recruitment Cycle/Schedule', component: ScheduleInterviewComponent },
    { path: '/Recruitment Cycle/mycalendar', component: RecruitmentInterviewerCalenderComponent },


])
export class HomeComponent implements OnInit {
    ngOnInit(): void {
        App.init();
        Layout.init();
        Demo.init();

        if (propelClient) {
            //TODO : propelClient.subscribe() should be call when user clicks on enable notification
            propelClient.subscribe();
            propelClient.addEventListener('statuschange', function (event) {
                if (event.permissionStatus === 'denied') {
                    // Disable UI
                } else if (event.currentSubscription) {
                    if (!localStorage.getItem('currentSubscription')) {
                        let registrationID = event.currentSubscription.endpoint.split('https://android.googleapis.com/gcm/send/')[1];
                        console.log(registrationID);
                        localStorage.setItem("currentSubscription", event.currentSubscription);
                    }
                } else {
                    // Enable UI
                    // Show that user is not subscribed
                }
            });
        }
    }
    routerOnActivate(segment: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        console.log(segment);
    }
}
