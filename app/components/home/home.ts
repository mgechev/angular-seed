import {Component, View, NgFor, NgIf, Http} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'component-1'
})
@View({
  templateUrl: './components/home/home.html?v=<%= VERSION %>',
  directives: [NgFor, NgIf, RouterLink]
})
export class Home {
  tweets: Array<any>;
  loading: boolean;
  constructor(public http: Http) {
    this.loading = true;

    // The twitter api would have been used directly here but their v1.1 api requires authentication
    // Using a google search api key and cx for contributor Nathan Walker's Google Developer account
    // If this example is used to create your own application, just use your own api key :)

    // TODO: implement a new service that would cache the result and allow component classes to inject and use
    this.http.get(`https://www.googleapis.com/customsearch/v1?q=angular2&key=AIzaSyClR5UP68Y_SHmlrcwpAT2NtyplfKb6Xk0&cx=014660784624259528473:xjnb6u0tez0`)
    .toRx().subscribe(
      response => {
        this.loading = false;
        // remove the first item since it's a generic hashtag result
        this.tweets = response.json().items;
        this.tweets.splice(0, 1);
        console.log(this.tweets);
      },
      error => {
        this.loading = false;
        console.log(error.message);
      }
    );
    
  }
}