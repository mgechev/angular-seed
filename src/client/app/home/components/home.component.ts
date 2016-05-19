import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
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
import { RecentProfilesComponent } from '../../profileBank/recentProfiles/index';
import { MyRRFComponent } from '../../RRF/myRRF/index';
import { RRFApprovalComponent } from '../../RRF/RRFApproval/index';
import { RRFDashboardComponent } from '../../RRF/RRFDashboard/index';


@Component({
    templateUrl: 'app/home/components/home.component.html',
    styleUrls: ['app/home/components/home.component.css'],
    directives: [ROUTER_DIRECTIVES, FooterComponent, PageActionsComponent, TopNavigationBarComponent,
        SideBarComponent, QuickSidebarComponent],
})
@Routes([
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
    { path: '/ProfileBank/RecentProfiles', component: RecentProfilesComponent },
    { path: '/RRF/MyRRF', component: MyRRFComponent },
    { path: '/RRF/RRFApproval', component: RRFApprovalComponent },
    { path: '/RRF/RRFDashboard', component: RRFDashboardComponent }
])
export class HomeComponent {
}
