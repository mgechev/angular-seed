import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {CandidateProfile} from '../../shared/model/myProfilesInfo';

@Component({
    moduleId: module.id,
    selector: 'detail-profile',
    templateUrl: 'detailProfile.component.html',
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    providers: [ToastsManager]
})
export class DetailProfileComponent implements OnInit {
    profile: CandidateProfile;
    //Get profiles data
    @Input() selectedProfile: CandidateProfile;
    @Output() updatedProfile: EventEmitter<CandidateProfile> = new EventEmitter<CandidateProfile>();
    constructor(private toastr: ToastsManager) {
        //console.log('In Contructor...');
    }
    ngOnInit() {
        /** */
        this.profile = this.selectedProfile;
        //console.log(this.profile);
    }
}
