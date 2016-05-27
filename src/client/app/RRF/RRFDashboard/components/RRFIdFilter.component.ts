import { Pipe, PipeTransform } from '@angular/core';
import { RRFDetails} from '../../myRRF/models/rrfDetails';

@Pipe({name: 'RRFIDPipe'})
export class RRFIDPipe implements PipeTransform {
  transform(value: RRFDetails[], rrfID: number): RRFDetails[] {
 return rrfID ? value.filter(rrfData=> rrfData.RRFID === rrfID ) : value; //TODO :when RRFID change to string
  //return rrfID ? value.filter(rrfData=> rrfData.RRFID.toLocaleLowerCase().indexOf(rrfID) != -1) : value;
  }
}
