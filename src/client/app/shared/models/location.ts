export class Location {

  constructor(
    public name: string,
    public lat: number,
    public long: number,
    public verified: number,
    public submitter: string,
    public home: string
  ) {}
  
}