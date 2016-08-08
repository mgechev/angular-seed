import {PipeTransform, Pipe} from '@angular/core';
import { CandidateProfile } from '../../shared/model/myProfilesInfo';

@Pipe({
  name: 'myProfilesFilter'
})

export class MyProfilesFilterPipe implements PipeTransform {
  // transform(value: any, fields: any[], searchString: string) {
  //   if (!searchString || searchString === '') {
  //     return value;
  //   }
  //   return value.filter((item :any) =>
  //     fields.some((field) =>
  //         (item[field]).toLowerCase().includes(searchString.toLowerCase())
  //     ));
  // }

  // transform(value: CandidateProfile[],
  //   args: string[]): CandidateProfile[] {
  //   if (args.length !== undefined) {
  //     let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
  //     return filter ? value.filter((product: CandidateProfile) =>
  //       product.FirstName.toLocaleLowerCase().indexOf(filter) !== -1) : value;
  //   }
  //   return value;
  // }

  transform(value: CandidateProfile[],
    args: string[]): CandidateProfile[] {
    if (args.length !== undefined) {
      return value;
    }
    return value;
  }
}
