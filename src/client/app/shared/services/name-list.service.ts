import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';

@Injectable()
export class NameListService {
  names:string[] = [];
  private loading: Boolean = false;
  constructor(private http: Http) {
  }

  requestNames() {
      this.http.get('./assets/json/name-list.json')
      .map(this.mapData)
      .subscribe(this.updateNames, this.handleError);
  }
  mapData = (res: Response) => {
    return res.json();
  };
  handleError = (err: any): boolean => {
    console.error(err);
    this.loading = false;
    return false;
  };
  updateNames = (data: any) => {
    this.names = data.data;
    this.loading = false;
  };

  get(): string[] {
    if(this.names.length === 0 && !this.loading) {
      this.loading = true;
      this.requestNames();
    }
    return this.names;
  }
  add(value: string): void {
    this.names.push(value);
  }
}
