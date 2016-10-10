import { Route } from '@angular/router';
import { HomeComponent } from './index';

import { DashboardComponent} from '../Dashboard/component/dashboard.component';
import { SpinnerComponent, SpinnerService } from '../shared/components/spinner/spinner';
/**Layout */
import { FooterComponent, TopNavigationBarComponent, PageActionsComponent, SideBarComponent,
  QuickSidebarComponent} from '../layout/index';
/**Admin */
import { FeatureComponent, PracticeComponent, SkillComponent, RoleComponent, UserComponent, TechnologyComponent,
  QualificationComponent, InterviewRoundComponent, DesignationComponent, OwnerTypeComponent} from '../admin/index';
/**ProfileBank */
import {//CompanyProfilesComponent, 
  AllProfilesComponent, BlackListedProfilesComponent, MyProfilesComponent, RecentProfilesComponent, IncompleteProfilesComponent,
  AdvanceSearchComponent} from '../profileBank/index';
/**RRF */
import { MyRRFComponent, RRFApprovalComponent, RRFDashboardComponent, FeedbackPendingComponent,
  InterviewerAvalabilityComponent} from '../RRF/index';
/**Recruitment Cycle */
import { ShowScheduleInterviewsComponent, ScheduleInterviewComponent, InterviewrsComponent,
  RecruitmentInterviewerCalenderComponent} from '../recruitmentCycle/index';
/**Settings */
import { PushNotificationComponent } from '../settings/index';


export const HomeRoutes: Route[] = [
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
  ////{ path: '/ProfileBank/CompanyProfiles', component: CompanyProfilesComponent },
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
];
