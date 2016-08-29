import { Pipe, PipeTransform } from '@angular/core';
import { Interview} from '../../shared/model/interview';

@Pipe({ name: 'AllScheduleInterviewPipe' })
export class AllScheduleInterviewPipe implements PipeTransform {
    transform(value: Interview[], stringToSearh: string): Interview[] {
        return stringToSearh ? value.filter(interview =>
            (
                interview.Status.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.InterviewDate.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                //   interview.Interviewer.values.search(new RegExp(stringToSearh, 'i'))!== -1 ||
                interview.InterviewToTime.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.InterviewFromTime.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.CandidateDetails.Email.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.CandidateDetails.Contact.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.CandidateDetails.FullName.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.CandidateDetails.FirstName.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.CandidateDetails.LastName.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.RRFID.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                interview.Round.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                // interview.CandidateSalaryDetails.ExpectedSalary.search(new RegExp(stringToSearh, 'i'))!== -1 ||
                // interview.CandidateSalaryDetails.CurrentSalary.search(new RegExp(stringToSearh, 'i')) !== -1
                this.checkForInterviewers(interview, stringToSearh)
            )
        ) : value;
    }

    checkForInterviewers(value: Interview, stringToSearh: string) {
        var result: boolean = false;
        for (var i = 0; i < value.InterviewerAvailability.length; i++) {
            if (value.Interviewer[i].Value.includes(stringToSearh)) {
                result = true;
                return result;
            }
        }
        return result;
    }
}

