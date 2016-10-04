import { Route } from '@angular/router';

import {ProfileEsplHistoryListComponent } from './profilesEsplHistory/index';
import {ProfileBankAssignRRFComponent } from './shared/index';
import { AllProfilesViewComponent, AllProfilesListComponent, TransferOwnershipComponent } from './AllProfiles/index';
import {
    MyProfilesListComponent,
    MyProfilesAddComponent,
    MyProfilesViewComponent} from './myProfiles/index';
import {
    BlackListedProfilesListComponent,
    BlackListedProfilesAddComponent,
    BlackListedProfilesViewComponent } from './blackListedProfiles/index';
import {
    CompanyProfilesListComponent,
    CompanyProfilesAddComponent,
    CompanyProfilesViewComponent } from './companyProfiles/index';
import {
    RecentProfilesListComponent,
    RecentProfilesAddComponent,
    RecentProfilesViewComponent } from './recentProfiles/index';
import {
    //ProfileBankAssignRRFComponent,
    DetailProfileComponent } from './shared/index';
import { IncompleteProfilesListComponent } from './incompleteProfiles/index';

export const ProfileBankRoutes: Route[] = [
    /**My Profiles */
    { path: 'MyProfiles', component: MyProfilesListComponent },
    { path: 'MyProfiles/Edit/:id', component: MyProfilesAddComponent },
    { path: 'MyProfiles/View/:id', component: MyProfilesViewComponent },
    { path: 'MyProfiles/Assign', component: ProfileBankAssignRRFComponent },
    { path: 'MyProfiles/History', component: ProfileEsplHistoryListComponent },

    /**All Profiles */
    { path: 'ProfileBank/', component: AllProfilesListComponent },
    { path: 'ProfileBank/Edit/:id', component: MyProfilesAddComponent },
    { path: 'ProfileBank/View/:id', component: AllProfilesViewComponent },
    { path: 'ProfileBank/Transfer', component: TransferOwnershipComponent },
    { path: 'ProfileBank/History', component: ProfileEsplHistoryListComponent },

    /**Blacklisted Profiles */
    { path: '/', component: BlackListedProfilesListComponent },
    { path: '/Edit/:id', component: BlackListedProfilesAddComponent },
    { path: '/View/:id', component: BlackListedProfilesViewComponent },
    { path: '/History', component: ProfileEsplHistoryListComponent },

    /**Company Profiles */
    { path: '/', component: CompanyProfilesListComponent },
    { path: '/Edit/:id', component: CompanyProfilesAddComponent },
    { path: '/View/:id', component: CompanyProfilesViewComponent },
    { path: '/Transfer', component: TransferOwnershipComponent },
    { path: '/Assign', component: ProfileBankAssignRRFComponent },
    { path: '/History', component: ProfileEsplHistoryListComponent },

    /**Incomplete Profiles */
    { path: '/', component: IncompleteProfilesListComponent },
    { path: '/Edit/:id', component: MyProfilesAddComponent },

    /**Profiles Espl Histoy */
    /**NA */

    /**Recent Profiles */
    { path: '/', component: RecentProfilesListComponent },
    { path: '/Edit/:id', component: RecentProfilesAddComponent },
    { path: '/View/:id', component: RecentProfilesViewComponent },
    { path: '/History', component: ProfileEsplHistoryListComponent },

    /**Adavance search */
    { path: '/:searchString', component: AdvanceSearchListComponent }
];
