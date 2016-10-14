export class Config {
    public static GetURL(apiURL: string): string {
        //  Production URL
        //  let baseURL= 'http://192.168.101.124:8010';

        //  Dev URL
        let baseURL = 'http://192.168.101.129:8001';
        return baseURL + apiURL;
    }
}
