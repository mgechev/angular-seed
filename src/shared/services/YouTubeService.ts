/**
 * Created by pyan on 3/7/2016.
 */

import {Injectable, bind} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Inject} from 'angular2/core';
import {Observable} from 'rxjs/Observable';


export var YOUTUBE_API_KEY: string = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export var YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class YouTubeService {
	constructor(public http:Http,
	            @Inject(YOUTUBE_API_KEY) private apiKey:string,
	            @Inject(YOUTUBE_API_URL) private apiUrl:string) {
	}

	search(query:string):Observable<SearchResult[]> {
		let params:string = [
			`q=${query}`,
			`key=${this.apiKey}`,
			`part=snippet`,
			`type=video`,
			`maxResults=10`
		].join('&');
		let queryUrl:string = `${this.apiUrl}?${params}`;
		return this.http.get(queryUrl)
			.map((response:Response) => {
				return (<any>response.json()).items.map(item => {
					// console.log("raw item", item); // uncomment if you want to debug
					return new SearchResult({
						id: item.id.videoId,
						title: item.snippet.title,
						description: item.snippet.description,
						thumbnailUrl: item.snippet.thumbnails.high.url
					});
				});
			});
	}
}

export var youTubeServiceInjectables: Array<any> = [
  bind(YouTubeService).toClass(YouTubeService),
  bind(YOUTUBE_API_KEY).toValue(YOUTUBE_API_KEY),
  bind(YOUTUBE_API_URL).toValue(YOUTUBE_API_URL)
];

export class SearchResult {
	id: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	videoUrl: string;

	constructor(obj?: any) {
		this.id              = obj && obj.id             || null;
		this.title           = obj && obj.title          || null;
		this.description     = obj && obj.description    || null;
		this.thumbnailUrl    = obj && obj.thumbnailUrl   || null;
		this.videoUrl        = obj && obj.videoUrl       ||
			`https://www.youtube.com/watch?v=${this.id}`;
	}
}

