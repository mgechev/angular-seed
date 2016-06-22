export class ResponseFromAPI {
    // StatusCode Success = 1
    // StatusCode Error = 2  
    public StatusCode: number;
    //Message shows "Sucess Message"
    public Message: '';
    //ReasonCode is different for different errors
    public ReasonCode: string;
    //ErrorMsg comes along with ReasonCode else it is empty
    public ErrorMsg: string;
}

export class MasterData {
    public Id: number;
    public Value: string;
}
