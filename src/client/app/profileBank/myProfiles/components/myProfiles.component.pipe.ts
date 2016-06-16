import {PipeTransform, Pipe} from '@angular/core';
import {MyProfilesInfo} from '../../shared/model/myProfilesInfo';
@Pipe({
  name: 'myProfilesFilter'
})

export class MyProfilesFilterPipe implements PipeTransform {
  transform(value: any, args: string[]): any {
    let filter = args[0].toLocaleLowerCase();
    return filter ? value.filter((profile: MyProfilesInfo) => profile.Tag.toLocaleLowerCase().indexOf(filter) !== -1) : value;
  }
}
