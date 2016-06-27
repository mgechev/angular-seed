import {PipeTransform, Pipe} from '@angular/core';
import { MyProfilesInfo, ResumeMeta, AddCandidateResponse } from '../../shared/model/myProfilesInfo';

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

  // transform(value: MyProfilesInfo[],
  //   args: string[]): MyProfilesInfo[] {
  //   if (args.length !== undefined) {
  //     let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
  //     return filter ? value.filter((product: MyProfilesInfo) =>
  //       product.FirstName.toLocaleLowerCase().indexOf(filter) !== -1) : value;
  //   }
  //   return value;
  // }

  transform(value: MyProfilesInfo[],
    args: string[]): MyProfilesInfo[] {
    if (args.length !== undefined) {
      return value;
    }
    return value;
  }
}
