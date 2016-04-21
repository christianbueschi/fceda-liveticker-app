import {Injectable, Inject} from 'angular2/core';
import {Http, RequestOptions, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

// API URL 
const url = 'http://localhost:3030/notifications';

// HTTP Headers
const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

// HTTP Options
const options = new RequestOptions({ headers: headers });


@Injectable()
export class LivetickerService {

  private http: Http;
  private data: Object;

  constructor(http: Http) {
    this.http = http;
    this.data = Object;
  }

  postData(message, callback) {
    this.http.post(url, JSON.stringify(message), options)
      .subscribe(
        data => this.onPostSuccess(data),
        err => this.onPostError(err),
        () => callback()
      );
  }

  onPostSuccess(data) {
    console.log('Success on LivetickerService: postData(): ', data);
  }

  onPostError(error) {
    console.log('Error on LivetickerService: postData(): ', error);
  }

  getData() {
    return this.data;
  }

}

