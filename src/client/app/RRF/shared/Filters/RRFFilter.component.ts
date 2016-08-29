import { Pipe, PipeTransform } from '@angular/core';
import { RRFDetails} from '../../myRRF/models/rrfDetails';

@Pipe({ name: 'RRFPipe' })
export class RRFPipe implements PipeTransform {
    transform(value: RRFDetails[], stringToSearh: string): RRFDetails[] {
        return stringToSearh ? value.filter(rrfData =>
            (
                rrfData.Priority.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                rrfData.Status.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                rrfData.RaisedBy.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                rrfData.Practice.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                rrfData.Technology.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                rrfData.PositionTitle.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                rrfData.Designation.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                rrfData.Technology.Value.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                (<any>(rrfData.MinExp)).search(new RegExp(stringToSearh, 'i')) !== -1 ||
                (<any>(rrfData.CreatedDate)).search(new RegExp(stringToSearh, 'i')) !== -1 ||
                (<any>(rrfData.ExpDateOfJoining)).search(new RegExp(stringToSearh, 'i')) !== -1 ||
                this.checkForSkill(rrfData, stringToSearh)
                // rrfData.Priority.Value.includes(stringToSearh) ||
            )
        ) : value;
    }

    checkForSkill(value: RRFDetails, stringToSearh: string) {
        var result: boolean = false;
        for (var i = 0; i < value.SkillsRequired.length; i++) {
            if (value.SkillsRequired[i].Value.search(new RegExp(stringToSearh, 'i')) !== -1 ) {
                result = true;
                return result;
            }
        }
        return result;
    }
}


