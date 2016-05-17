import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

/**
 * This class provides the NameList service with methods to
 * read names and add names.
 */
@Injectable()
export class NameListService {
  /**
   * The array of initial names provided by the service.
   * @type {Array}
   */
  names: string[] = [];

  /**
   * Contains the currently pending request.
   * @type {Observable<string[]>}
   */
  private request: Observable<string[]>;

  /**
   * Constructor of the service
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns the array of names.
   * @return {string[]} the array of names
   */
  get(): Observable<string[]> {
    if (this.names && this.names.length) {
      return Observable.from([this.names]);
    }
    if (!this.request) {
      this.request = this.http.get('/assets/data.json')
        .map((response: Response) => response.json())
        .map((data: string[]) => {
          this.request = null;
          return this.names = data;
        });
    }
    return this.request;
  }

  /**
   * Adds the given name to the array of names.
   * @param {string} value the name to add
   */
  add(value: string): void {
    this.names.push(value);
  }
}

