import { Pipe, PipeTransform } from '@angular/core';
import { RRFDetails} from '../../myRRF/models/rrfDetails';

@Pipe({ name: 'RRFPipe' })
export class RRFPipe implements PipeTransform {
    transform(value: RRFDetails[], stringToSearh: string): RRFDetails[] {
        return stringToSearh ? value.filter(rrfData =>
            (
                rrfData.Priority.Value.includes(stringToSearh) ||
                rrfData.Status.Value.includes(stringToSearh) ||
                rrfData.RaisedBy.Value.includes(stringToSearh) ||
                rrfData.Practice.Value.includes(stringToSearh) ||
                rrfData.Technology.Value.includes(stringToSearh) ||
                rrfData.PositionTitle.includes(stringToSearh) ||
                rrfData.Designation.Value.includes(stringToSearh) ||
                rrfData.Technology.Value.includes(stringToSearh) ||
                (<any>(rrfData.MinExp)).includes(stringToSearh) ||
                (<any>(rrfData.CreatedDate)).includes(stringToSearh) ||
                (<any>(rrfData.ExpDateOfJoining)).includes(stringToSearh) ||
                this.checkForSkill(rrfData, stringToSearh)
            )
        ) : value;
    }

    checkForSkill(value: RRFDetails, stringToSearh: string) {
        var result: boolean = false;
        for (var i = 0; i < value.SkillsRequired.length; i++) {
            if (value.SkillsRequired[i].Value.includes(stringToSearh)) {
                result = true;
                return result;
            }
        }
        return result;
    }
}

