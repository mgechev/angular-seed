import {Component} from 'angular2/core';
import {SearchBox} from './searchBox';
import {SearchResultComponent} from './searchResult.component';
import {SearchResult} from '../../shared/services/YouTubeService';
/**
 * Created by pyan on 3/7/2016.
 */
@Component({
	selector: 'youtube-search',
	directives:[SearchBox, SearchResultComponent],
	template: `
		<div class='container'>
      <div class="page-header">
        <h1>YouTube Search
          <img
            style="float: right;"
            *ngIf="loading"/>
        </h1>
      </div>

      <div class="row">
        <div class="input-group input-group-lg col-md-12">
          <search-box
             (loading)="loading = $event"
             (results)="updateResults($event)"
              ></search-box>
        </div>
      </div>

      <div class="row test">
        <search-result
          *ngFor="#result of results"
          [result]="result">
        </search-result>
      </div>
  </div>
	`
})
export class YoutubeSearchComponent {
	results: SearchResult[];

	updateResults(results: SearchResult[]): void {
		this.results = results;
		console.log(results, 'this is result to see');
	}
}




