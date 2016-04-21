import {Injectable, Inject} from 'angular2/core';
import {Http, RequestOptions, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';


@Injectable()
export class S3Service {

  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  retrieveSignRequestAndUpload(file, onload, callback) {
    let res;

    this.http.get('http://localhost:3030/sign_s3?file_name='+file.name+'&file_type='+file.type)
      .subscribe(
        data => res = data,
        err => console.log('error while s3'),
        () => this.onCompleteSigningRequest(res, file, onload, callback)
      );
  }

  onCompleteSigningRequest(data, file, onload, callback) {
    onload();
    data = JSON.parse(data._body);
    let url = data.url
    var xhr = new XMLHttpRequest();  
    xhr.open("PUT", data.signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = () => {
      if (xhr.status === 200) {
        callback(url);
      }
    };
    xhr.onerror = function() {
      console.log("Could not upload file.");
    };
    xhr.send(file);
  }
}

