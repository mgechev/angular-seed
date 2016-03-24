/**
 * Created by pyan on 3/8/2016.
 */
import {Component} from 'angular2/core';
import {SearchResult} from '../../shared/services/YouTubeService';
import {Input} from 'angular2/core';
@Component({
  selector: 'search-result',
  template: `
    <div>this is test</div>
    <div class="col-sm-6 col-md-3">
      <div class="thumbnail">
        <img src="{{result.thumbnailUrl}}">
        <div class="caption">
          <h3>{{result.title}}</h3>
          <p>{{result.description}}</p>
          <p><a href="{{result.videoUrl}}"
                class="btn btn-default" role="button">Watch</a></p>
        </div>
      </div>
    </div>
  `
})
export class SearchResultComponent {
  @Input()
  result: SearchResult;
}
