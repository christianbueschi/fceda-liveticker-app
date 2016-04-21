import {Injectable, Inject} from 'angular2/core';
import {Http, RequestOptions, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

// API URL 
const url = 'https://onesignal.com/api/v1/notifications';

// HTTP Headers
const headers = new Headers({
  'Content-Type': 'application/json',
  'Authorization': 'Basic MGJmNTIxZmQtZDhmOS00M2NlLWJkMDYtYWE0NTRmMzI0N2Mx'
});

// HTTP Options
const options = new RequestOptions({ headers: headers });


@Injectable()
export class PushnotificationService {

  private http: Http;
  private data: Object;

  constructor(http: Http) {
    this.http = http;
    this.data = Object;
  }

  postData(message, callback) {
    this.http.post(url, JSON.stringify(message), options)
      .subscribe(
        data => callback(data),
        err => this.onPostError(err),
        () => this.onPostComplete()
      );
  }

  onPostSuccess(data) {
    //console.log('Success on PushnotificationService: postData(): ', data);
  }

  onPostError(error) {
    console.log('Error on PushnotificationService: postData(): ', error);
  }

  onPostComplete() {
    
  }

  getData() {
    return this.data;
  }

}

