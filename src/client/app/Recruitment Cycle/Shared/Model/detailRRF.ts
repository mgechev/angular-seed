import { MasterData } from  '../../../shared/model/index';
import { RRFDetails } from '../../../RRF/myRRF/models/rrfDetails';

export class DetailRRF extends RRFDetails {
    public DetailRRFID: MasterData = new MasterData();
    public RRFCODE: string = 'CODE002';
}

