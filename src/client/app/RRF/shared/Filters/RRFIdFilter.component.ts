import { Pipe, PipeTransform } from '@angular/core';
import { RRFDetails} from '../../myRRF/models/rrfDetails';

@Pipe({ name: 'RRFIDPipe' })
export class RRFIDPipe implements PipeTransform {
    transform(value: RRFDetails[], rrfID: string): RRFDetails[] {
        return rrfID ? value.filter(rrfData=> (rrfData.RRFID.Value.includes(rrfID))) : value;
    }
}

