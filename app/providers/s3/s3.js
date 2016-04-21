System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var S3Service;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            S3Service = (function () {
                function S3Service(http) {
                    this.http = http;
                }
                S3Service.prototype.retrieveSignRequestAndUpload = function (file, onload, callback) {
                    var _this = this;
                    var res;
                    this.http.get('http://localhost:3030/sign_s3?file_name=' + file.name + '&file_type=' + file.type)
                        .subscribe(function (data) { return res = data; }, function (err) { return console.log('error while s3'); }, function () { return _this.onCompleteSigningRequest(res, file, onload, callback); });
                };
                S3Service.prototype.onCompleteSigningRequest = function (data, file, onload, callback) {
                    onload();
                    data = JSON.parse(data._body);
                    var url = data.url;
                    var xhr = new XMLHttpRequest();
                    xhr.open("PUT", data.signed_request);
                    xhr.setRequestHeader('x-amz-acl', 'public-read');
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            callback(url);
                        }
                    };
                    xhr.onerror = function () {
                        console.log("Could not upload file.");
                    };
                    xhr.send(file);
                };
                S3Service = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], S3Service);
                return S3Service;
            }());
            exports_1("S3Service", S3Service);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTtnQkFJRSxtQkFBWSxJQUFVO29CQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDbkIsQ0FBQztnQkFFRCxnREFBNEIsR0FBNUIsVUFBNkIsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRO29CQUFuRCxpQkFTQztvQkFSQyxJQUFJLEdBQUcsQ0FBQztvQkFFUixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLGFBQWEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUN4RixTQUFTLENBQ1IsVUFBQSxJQUFJLElBQUksT0FBQSxHQUFHLEdBQUcsSUFBSSxFQUFWLENBQVUsRUFDbEIsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEVBQTdCLENBQTZCLEVBQ3BDLGNBQU0sT0FBQSxLQUFJLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQTFELENBQTBELENBQ2pFLENBQUM7Z0JBQ04sQ0FBQztnQkFFRCw0Q0FBd0IsR0FBeEIsVUFBeUIsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUTtvQkFDbkQsTUFBTSxFQUFFLENBQUM7b0JBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM5QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO29CQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO29CQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ3JDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7b0JBQ2pELEdBQUcsQ0FBQyxNQUFNLEdBQUc7d0JBQ1gsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUN2QixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2hCLENBQUM7b0JBQ0gsQ0FBQyxDQUFDO29CQUNGLEdBQUcsQ0FBQyxPQUFPLEdBQUc7d0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO29CQUN4QyxDQUFDLENBQUM7b0JBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakIsQ0FBQztnQkFwQ0g7b0JBQUMsaUJBQVUsRUFBRTs7NkJBQUE7Z0JBcUNiLGdCQUFDO1lBQUQsQ0FBQyxBQXBDRCxJQW9DQztZQXBDRCxpQ0FvQ0MsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SHR0cCwgUmVxdWVzdE9wdGlvbnMsIEhlYWRlcnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTM1NlcnZpY2Uge1xuXG4gIHByaXZhdGUgaHR0cDogSHR0cDtcblxuICBjb25zdHJ1Y3RvcihodHRwOiBIdHRwKSB7XG4gICAgdGhpcy5odHRwID0gaHR0cDtcbiAgfVxuXG4gIHJldHJpZXZlU2lnblJlcXVlc3RBbmRVcGxvYWQoZmlsZSwgb25sb2FkLCBjYWxsYmFjaykge1xuICAgIGxldCByZXM7XG5cbiAgICB0aGlzLmh0dHAuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjMwMzAvc2lnbl9zMz9maWxlX25hbWU9JytmaWxlLm5hbWUrJyZmaWxlX3R5cGU9JytmaWxlLnR5cGUpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICBkYXRhID0+IHJlcyA9IGRhdGEsXG4gICAgICAgIGVyciA9PiBjb25zb2xlLmxvZygnZXJyb3Igd2hpbGUgczMnKSxcbiAgICAgICAgKCkgPT4gdGhpcy5vbkNvbXBsZXRlU2lnbmluZ1JlcXVlc3QocmVzLCBmaWxlLCBvbmxvYWQsIGNhbGxiYWNrKVxuICAgICAgKTtcbiAgfVxuXG4gIG9uQ29tcGxldGVTaWduaW5nUmVxdWVzdChkYXRhLCBmaWxlLCBvbmxvYWQsIGNhbGxiYWNrKSB7XG4gICAgb25sb2FkKCk7XG4gICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YS5fYm9keSk7XG4gICAgbGV0IHVybCA9IGRhdGEudXJsXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAgXG4gICAgeGhyLm9wZW4oXCJQVVRcIiwgZGF0YS5zaWduZWRfcmVxdWVzdCk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ3gtYW16LWFjbCcsICdwdWJsaWMtcmVhZCcpO1xuICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIGNhbGxiYWNrKHVybCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJDb3VsZCBub3QgdXBsb2FkIGZpbGUuXCIpO1xuICAgIH07XG4gICAgeGhyLnNlbmQoZmlsZSk7XG4gIH1cbn1cblxuIl19