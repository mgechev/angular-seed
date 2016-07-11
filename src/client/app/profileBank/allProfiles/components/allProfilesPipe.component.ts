import {PipeTransform, Pipe} from '@angular/core';
import {CandidateProfile } from '../../shared/model/myProfilesInfo';

@Pipe({
    name: 'statusFilter'
})

export class ProfileStatusFilterPipe implements PipeTransform {
    transform(value: CandidateProfile[],
        args: string): CandidateProfile[] {
        if (args !== undefined) {
            return args ? value.filter((profile: CandidateProfile) =>
                profile.Status.Value.toLocaleLowerCase().indexOf(args) !== -1) : value;
        }
        return value;
    }
    // transform(value: any, fields: any[], searchString: string) {
    //     if (!searchString || searchString === '') {
    //         return value;
    //     }
    //     return value.filter((item: any) =>
    //         fields.some((field) =>
    //             item[field] ?(item[field]).toLowerCase().includes(searchString.toLowerCase()) : value
    //      ));
    // }
}

@Pipe({
    name: 'nameFilter'
})
export class ProfileFilterPipe implements PipeTransform {
    transform(value: any, fields: any[], searchString: string) {
        if (!searchString || searchString === '') {
            return value;
        }
        return value.filter((item: any) =>
            fields.some((field) =>
                item[field] ? (item[field]).toLowerCase().includes(searchString.toLowerCase()) : value
         ));
    }
}

@Pipe({
    name: 'salaryFilter'
})

export class ProfileSalaryFilterPipe implements PipeTransform {
    transform(value: CandidateProfile[],
        args: string): CandidateProfile[] {
        if (args !== undefined && args !== null) {
            return args
                ? value.filter(
                    (profile: CandidateProfile) =>
                        String(profile.CandidateSalaryDetails.CurrentSalary).toLowerCase().indexOf(args) !== -1)
                : value;
        }
        return value;
    }
}


@Pipe({
    name: 'expSalaryFilter'
})

export class ProfileExpectedSalaryFilterPipe implements PipeTransform {
    transform(value: CandidateProfile[],
        args: string): CandidateProfile[] {
        if (args !== undefined && args !== null) {
            return args
                ? value.filter(
                    (profile: CandidateProfile) =>
                        String(profile.CandidateSalaryDetails.ExpectedSalary).toLowerCase().indexOf(args) !== -1)
                : value;
        }
        return value;
    }
}
@Pipe({
    name: 'noticePeriodFilter'
})

export class ProfileNoticePeriodFilterPipe implements PipeTransform {
    transform(value: CandidateProfile[],
        args: string): CandidateProfile[] {
        if (args !== undefined && args !== null) {
            return args
                ? value.filter(
                    (profile: CandidateProfile) =>
                        String(profile.CandidateOtherDetails.NoticePeriod).toLowerCase().indexOf(args) !== -1)
                : value;
        }
        return value;
    }
}

