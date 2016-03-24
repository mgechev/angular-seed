/**
 * Created by pyan on 3/8/2016.
 */
import {Component,OnInit, ElementRef,EventEmitter, Output} from 'angular2/core';
import {YouTubeService} from '../../shared/services/YouTubeService';
import {SearchResult} from '../../shared/services/YouTubeService';
import { Observable } from 'rxjs/Rx';
@Component({
	selector: 'search-box',
	template: `
		<input type="text" class="form-control" placeholder="Search" autofocus>
	`
})

export class SearchBox implements OnInit {
  @Output()
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(public youtube: YouTubeService, private el: ElementRef) {}

  ngOnInit(): void {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
    .map((e:any) => e.target.value)
    .filter((text:string) => text.length > 1)
    .debounceTime(250)
    .do(() => this.loading.next(true))
    .map((query: string) => this.youtube.search(query))
    .switch()
    .subscribe((results: SearchResult[]) => {
        console.log(results);
        this.loading.next(false);
      this.results.next(results);
    },
      (err: any) => {
        console.log(err);
      },
      () => {
        this.loading.next(false);
        console.log('completed!!!');
      }
    );
  }
}
