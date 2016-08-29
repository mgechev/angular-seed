import { Pipe, PipeTransform } from '@angular/core';
import { CandidateProfile } from '../model/myProfilesInfo';

@Pipe({ name: 'ProfileBankPipe' })
export class ProfileBankPipe implements PipeTransform {
    transform(value: CandidateProfile[], stringToSearh: string): CandidateProfile[] {
        return stringToSearh ? value.filter(profile =>
            (
                profile.Candidate.search(new RegExp(stringToSearh, 'i')) !== -1||
                profile.Status.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                profile.Tag.search(new RegExp(stringToSearh, 'i')) !== -1||
                profile.Email.search(new RegExp(stringToSearh, 'i'))!== -1 ||
                profile.PrimaryContact.search(new RegExp(stringToSearh, 'i')) !== -1||
                profile.CandidateOtherDetails.NoticePeriod.search(new RegExp(stringToSearh, 'i'))!== -1 ||
                profile.CandidateSalaryDetails.ExpectedSalary.search(new RegExp(stringToSearh, 'i'))!== -1 ||
                profile.CandidateSalaryDetails.CurrentSalary.search(new RegExp(stringToSearh, 'i')) !== -1
               // this.checkForSkill(profile, stringToSearh)
            )
        ) : value;
    }

    // checkForSkill(value: RRFDetails, stringToSearh: string) {
    //     var result: boolean = false;
    //     for (var i = 0; i < value.SkillsRequired.length; i++) {
    //         if (value.SkillsRequired[i].Value.includes(stringToSearh)) {
    //             result = true;
    //             return result;
    //         }
    //     }
    //     return result;
    // }
}

