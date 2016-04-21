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
    var url, headers, options, LivetickerService;
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
            // API URL 
            url = 'http://localhost:3030/notifications';
            // HTTP Headers
            headers = new http_1.Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            });
            // HTTP Options
            options = new http_1.RequestOptions({ headers: headers });
            LivetickerService = (function () {
                function LivetickerService(http) {
                    this.http = http;
                    this.data = Object;
                }
                LivetickerService.prototype.postData = function (message, callback) {
                    var _this = this;
                    this.http.post(url, JSON.stringify(message), options)
                        .subscribe(function (data) { return _this.onPostSuccess(data); }, function (err) { return _this.onPostError(err); }, function () { return callback(); });
                };
                LivetickerService.prototype.onPostSuccess = function (data) {
                    console.log('Success on LivetickerService: postData(): ', data);
                };
                LivetickerService.prototype.onPostError = function (error) {
                    console.log('Error on LivetickerService: postData(): ', error);
                };
                LivetickerService.prototype.getData = function () {
                    return this.data;
                };
                LivetickerService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], LivetickerService);
                return LivetickerService;
            }());
            exports_1("LivetickerService", LivetickerService);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZXRpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpdmV0aWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQUtNLEdBQUcsRUFHSCxPQUFPLEVBTVAsT0FBTzs7Ozs7Ozs7Ozs7WUFWYixXQUFXO1lBQ0wsR0FBRyxHQUFHLHFDQUFxQyxDQUFDO1lBRWxELGVBQWU7WUFDVCxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUM7Z0JBQ3RCLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLFFBQVEsRUFBRSxrQkFBa0I7YUFDN0IsQ0FBQyxDQUFDO1lBRVAsZUFBZTtZQUNULE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUl6RDtnQkFLRSwyQkFBWSxJQUFVO29CQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRUQsb0NBQVEsR0FBUixVQUFTLE9BQU8sRUFBRSxRQUFRO29CQUExQixpQkFPQztvQkFOQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUM7eUJBQ2xELFNBQVMsQ0FDUixVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQXhCLENBQXdCLEVBQ2hDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBckIsQ0FBcUIsRUFDNUIsY0FBTSxPQUFBLFFBQVEsRUFBRSxFQUFWLENBQVUsQ0FDakIsQ0FBQztnQkFDTixDQUFDO2dCQUVELHlDQUFhLEdBQWIsVUFBYyxJQUFJO29CQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNsRSxDQUFDO2dCQUVELHVDQUFXLEdBQVgsVUFBWSxLQUFLO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBRUQsbUNBQU8sR0FBUDtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDbkIsQ0FBQztnQkE5Qkg7b0JBQUMsaUJBQVUsRUFBRTs7cUNBQUE7Z0JBZ0NiLHdCQUFDO1lBQUQsQ0FBQyxBQS9CRCxJQStCQztZQS9CRCxpREErQkMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SHR0cCwgUmVxdWVzdE9wdGlvbnMsIEhlYWRlcnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuXG4vLyBBUEkgVVJMIFxuY29uc3QgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAzMC9ub3RpZmljYXRpb25zJztcblxuLy8gSFRUUCBIZWFkZXJzXG5jb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICB9KTtcblxuLy8gSFRUUCBPcHRpb25zXG5jb25zdCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGl2ZXRpY2tlclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgaHR0cDogSHR0cDtcbiAgcHJpdmF0ZSBkYXRhOiBPYmplY3Q7XG5cbiAgY29uc3RydWN0b3IoaHR0cDogSHR0cCkge1xuICAgIHRoaXMuaHR0cCA9IGh0dHA7XG4gICAgdGhpcy5kYXRhID0gT2JqZWN0O1xuICB9XG5cbiAgcG9zdERhdGEobWVzc2FnZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmh0dHAucG9zdCh1cmwsIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLCBvcHRpb25zKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgZGF0YSA9PiB0aGlzLm9uUG9zdFN1Y2Nlc3MoZGF0YSksXG4gICAgICAgIGVyciA9PiB0aGlzLm9uUG9zdEVycm9yKGVyciksXG4gICAgICAgICgpID0+IGNhbGxiYWNrKClcbiAgICAgICk7XG4gIH1cblxuICBvblBvc3RTdWNjZXNzKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZygnU3VjY2VzcyBvbiBMaXZldGlja2VyU2VydmljZTogcG9zdERhdGEoKTogJywgZGF0YSk7XG4gIH1cblxuICBvblBvc3RFcnJvcihlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKCdFcnJvciBvbiBMaXZldGlja2VyU2VydmljZTogcG9zdERhdGEoKTogJywgZXJyb3IpO1xuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG5cbn1cblxuIl19