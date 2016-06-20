import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'myProfilesFilter'
})

export class MyProfilesFilterPipe implements PipeTransform {
  transform(value: any, fields: any[], searchString: string) {
    if (!searchString || searchString === '') {
      return value;
    }
    return value.filter((item: any) =>
      fields.some((field) =>
          (item[field]).toLowerCase().includes(searchString.toLowerCase())
      ));
  }
}
