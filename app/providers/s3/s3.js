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
                    var prefix = this.createUniqueId();
                    this.http.get('https://fceda-liveticker-service.herokuapp.com/sign_s3?file_name=' + prefix + '-' + file.name + '&file_type=' + file.type)
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
                /**
                 * @see: https://gist.github.com/gordonbrander/2230317
                   */
                S3Service.prototype.createUniqueId = function () {
                    return Math.random().toString(36).substr(2, 9);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTtnQkFJRSxtQkFBWSxJQUFVO29CQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDbkIsQ0FBQztnQkFFRCxnREFBNEIsR0FBNUIsVUFBNkIsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRO29CQUFuRCxpQkFVQztvQkFUQyxJQUFJLEdBQUcsQ0FBQztvQkFDUixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBRW5DLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1FQUFtRSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDcEksU0FBUyxDQUNOLFVBQUEsSUFBSSxJQUFJLE9BQUEsR0FBRyxHQUFHLElBQUksRUFBVixDQUFVLEVBQ2xCLFVBQUEsR0FBRyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUE3QixDQUE2QixFQUNwQyxjQUFNLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUExRCxDQUEwRCxDQUNqRSxDQUFDO2dCQUNOLENBQUM7Z0JBRUQsNENBQXdCLEdBQXhCLFVBQXlCLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVE7b0JBQ25ELE1BQU0sRUFBRSxDQUFDO29CQUNULElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtvQkFDbEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztvQkFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNyQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO29CQUNqRCxHQUFHLENBQUMsTUFBTSxHQUFHO3dCQUNYLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDdkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNoQixDQUFDO29CQUNILENBQUMsQ0FBQztvQkFDRixHQUFHLENBQUMsT0FBTyxHQUFHO3dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDeEMsQ0FBQyxDQUFDO29CQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pCLENBQUM7Z0JBRUQ7O3FCQUVFO2dCQUNILGtDQUFjLEdBQWQ7b0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDakQsQ0FBQztnQkE1Q0Y7b0JBQUMsaUJBQVUsRUFBRTs7NkJBQUE7Z0JBNkNiLGdCQUFDO1lBQUQsQ0FBQyxBQTVDRCxJQTRDQztZQTVDRCxpQ0E0Q0MsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SHR0cCwgUmVxdWVzdE9wdGlvbnMsIEhlYWRlcnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTM1NlcnZpY2Uge1xuXG4gIHByaXZhdGUgaHR0cDogSHR0cDtcblxuICBjb25zdHJ1Y3RvcihodHRwOiBIdHRwKSB7XG4gICAgdGhpcy5odHRwID0gaHR0cDtcbiAgfVxuXG4gIHJldHJpZXZlU2lnblJlcXVlc3RBbmRVcGxvYWQoZmlsZSwgb25sb2FkLCBjYWxsYmFjaykge1xuICAgIGxldCByZXM7XG4gICAgbGV0IHByZWZpeCA9IHRoaXMuY3JlYXRlVW5pcXVlSWQoKTtcblxuICAgIHRoaXMuaHR0cC5nZXQoJ2h0dHBzOi8vZmNlZGEtbGl2ZXRpY2tlci1zZXJ2aWNlLmhlcm9rdWFwcC5jb20vc2lnbl9zMz9maWxlX25hbWU9JyArIHByZWZpeCArICctJyArIGZpbGUubmFtZSsnJmZpbGVfdHlwZT0nK2ZpbGUudHlwZSlcbiAgICAuc3Vic2NyaWJlKFxuICAgICAgICBkYXRhID0+IHJlcyA9IGRhdGEsXG4gICAgICAgIGVyciA9PiBjb25zb2xlLmxvZygnZXJyb3Igd2hpbGUgczMnKSxcbiAgICAgICAgKCkgPT4gdGhpcy5vbkNvbXBsZXRlU2lnbmluZ1JlcXVlc3QocmVzLCBmaWxlLCBvbmxvYWQsIGNhbGxiYWNrKVxuICAgICAgKTtcbiAgfVxuXG4gIG9uQ29tcGxldGVTaWduaW5nUmVxdWVzdChkYXRhLCBmaWxlLCBvbmxvYWQsIGNhbGxiYWNrKSB7XG4gICAgb25sb2FkKCk7XG4gICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YS5fYm9keSk7XG4gICAgbGV0IHVybCA9IGRhdGEudXJsXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAgXG4gICAgeGhyLm9wZW4oXCJQVVRcIiwgZGF0YS5zaWduZWRfcmVxdWVzdCk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ3gtYW16LWFjbCcsICdwdWJsaWMtcmVhZCcpO1xuICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIGNhbGxiYWNrKHVybCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJDb3VsZCBub3QgdXBsb2FkIGZpbGUuXCIpO1xuICAgIH07XG4gICAgeGhyLnNlbmQoZmlsZSk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBAc2VlOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9nb3Jkb25icmFuZGVyLzIyMzAzMTdcblx0ICovXG5cdGNyZWF0ZVVuaXF1ZUlkKCkge1xuXHQgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XG5cdH1cbn1cblxuIl19