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
    let prefix = this.createUniqueId();
    
    if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'video/quicktime') {
      alert('File Type not allowed');
      return;
    }

    this.http.get('https://fceda-liveticker-service.herokuapp.com/sign_s3?file_name=' + prefix + '-' + file.name+'&file_type='+file.type)
    .subscribe(
        data => res = data,
        err => console.log('error while s3'),
        () => this.onCompleteSigningRequest(res, file, onload, callback)
      );
  }

  onCompleteSigningRequest(data, file, onload, callback) {
    onload();
    data = JSON.parse(data._body);
    let type = file.type;
    let url = data.url
    var xhr = new XMLHttpRequest();  
    xhr.open("PUT", data.signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = () => {
      if (xhr.status === 200) {
        callback(url, type);
      }
    };
    xhr.onerror = function() {
      console.log("Could not upload file.");
    };
    xhr.send(file);
  }
  
  /**
   * @see: https://gist.github.com/gordonbrander/2230317
	 */
	createUniqueId() {
	  return Math.random().toString(36).substr(2, 9);
	}
}

