import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IfAuthorizeDirective, MastersService } from '../shared/index';
import { IEFGridRowComponent } from '../recruitmentCycle/index';
import {
  AllProfilesAddComponent,
  AllProfilesViewComponent,
  TransferOwnershipComponent,
  AllProfilesListComponent } from './allProfiles/index';
import {
  BlackListedProfilesAddComponent,
  BlackListedProfilesListComponent,
  BlackListedProfilesViewComponent } from './blackListedProfiles/index';
import { AdvanceSearchListComponent } from './advanceSearch/index';
import {
  //TransferOwnershipComponent,//Need to check Error
  CompanyProfilesAddComponent,
  CompanyProfilesListComponent,
  CompanyProfilesViewComponent } from './companyProfiles/index';
import { IncompleteProfilesListComponent } from './incompleteProfiles/index';
import {
  MyProfilesService,
  MyProfilesAddComponent,
  MyProfilesListComponent,
  MyProfilesViewComponent } from './myProfiles/index';
import { ProfileEsplHistoryListComponent } from './profilesEsplHistory/index';
import {
  RecentProfilesAddComponent,
  RecentProfilesListComponent,
  RecentProfilesViewComponent } from './recentProfiles/index';
import {ProfileBankService, DetailProfileComponent, ProfileBankAssignRRFComponent } from './shared/index';
import {ViewRRFComponent} from '../RRF/shared/index';
import { CollapseDirective, TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';


@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    ProfileBankAssignRRFComponent,
    DetailProfileComponent,
    AllProfilesAddComponent,
    TransferOwnershipComponent,
    AllProfilesListComponent,
    AllProfilesViewComponent,
    AdvanceSearchListComponent,
    BlackListedProfilesAddComponent,
    BlackListedProfilesListComponent,
    BlackListedProfilesViewComponent,
    CompanyProfilesAddComponent,
    CompanyProfilesListComponent,
    CompanyProfilesViewComponent,
    IncompleteProfilesListComponent,
    MyProfilesAddComponent,
    MyProfilesListComponent,
    MyProfilesViewComponent,
    ProfileEsplHistoryListComponent,
    RecentProfilesAddComponent,
    RecentProfilesListComponent,
    RecentProfilesViewComponent,
    CollapseDirective,
    IEFGridRowComponent,
    IfAuthorizeDirective,
    ViewRRFComponent,
    TOOLTIP_DIRECTIVES
  ],
  exports: [
    ProfileBankAssignRRFComponent,
    DetailProfileComponent,
    AllProfilesAddComponent,
    TransferOwnershipComponent,
    AllProfilesListComponent,
    AllProfilesViewComponent,
    AdvanceSearchListComponent,
    BlackListedProfilesAddComponent,
    BlackListedProfilesListComponent,
    BlackListedProfilesViewComponent,
    CompanyProfilesAddComponent,
    CompanyProfilesListComponent,
    CompanyProfilesViewComponent,
    MyProfilesAddComponent,
    MyProfilesListComponent,
    MyProfilesViewComponent,
    ProfileEsplHistoryListComponent,
    RecentProfilesAddComponent,
    RecentProfilesListComponent,
    RecentProfilesViewComponent,
    ViewRRFComponent
  ],
  providers: [MyProfilesService, MastersService, ToastsManager, ProfileBankService]
})
export class ProfileBankModule { }
