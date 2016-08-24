import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CandidateProfile} from '../../shared/model/myProfilesInfo';
import { MasterData, Resume } from  '../../../shared/model/index';
import { ProfileBankService } from '../../shared/services/profileBank.service';

@Component({
    moduleId: module.id,
    selector: 'detail-profile',
    templateUrl: 'detailProfile.component.html',
    styleUrls: ['../../myProfiles/components/myProfiles.component.css'],
    providers: [ToastsManager, ProfileBankService]
})
export class DetailProfileComponent implements OnInit {
    profile: CandidateProfile;
    binaryResume: Resume;
    errorMessage: string;
    //Get profiles data
    @Input() selectedProfile: CandidateProfile;
    // @Input() profilePic: any;
    @Output() updatedProfile: EventEmitter<CandidateProfile> = new EventEmitter<CandidateProfile>();
    constructor(private toastr: ToastsManager, private _profileBankService: ProfileBankService) {
        //console.log('In Contructor...');
    }
    ngOnInit() {
        /** */
        this.profile = this.selectedProfile;
        //console.log(this.profilePic);
    }
    /**Get resume by candidate code */
    getResume(candidateID: MasterData) {
        this._profileBankService.getResume(candidateID)
            .subscribe(
            results => {
                this.binaryResume = <any>results;
                if (this.binaryResume) {
                    this.Download(this.binaryResume.BinaryResume, this.binaryResume.ResumeName);
                } else { alert('Resume not available!'); }
            },
            error => this.errorMessage = <any>error);
    }
    /** Download crate file form binary and download in given fyle type */
    Download(binaryResume: string, ResumeName: string) {
        var link = document.createElement('a');
        link.download = ResumeName;
        link.href = 'data:application/octet-stream;charset=utf-8;base64,' + binaryResume;
        link.click();
    }
}
