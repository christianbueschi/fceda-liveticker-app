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
    var url, headers, options, PushnotificationService;
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
            url = 'https://onesignal.com/api/v1/notifications';
            // HTTP Headers
            headers = new http_1.Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Basic MGJmNTIxZmQtZDhmOS00M2NlLWJkMDYtYWE0NTRmMzI0N2Mx'
            });
            // HTTP Options
            options = new http_1.RequestOptions({ headers: headers });
            PushnotificationService = (function () {
                function PushnotificationService(http) {
                    this.http = http;
                    this.data = Object;
                }
                PushnotificationService.prototype.postData = function (message, callback) {
                    var _this = this;
                    this.http.post(url, JSON.stringify(message), options)
                        .subscribe(function (data) { return callback(data); }, function (err) { return _this.onPostError(err); }, function () { return _this.onPostComplete(); });
                };
                PushnotificationService.prototype.onPostSuccess = function (data) {
                    //console.log('Success on PushnotificationService: postData(): ', data);
                };
                PushnotificationService.prototype.onPostError = function (error) {
                    console.log('Error on PushnotificationService: postData(): ', error);
                };
                PushnotificationService.prototype.onPostComplete = function () {
                };
                PushnotificationService.prototype.getData = function () {
                    return this.data;
                };
                PushnotificationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], PushnotificationService);
                return PushnotificationService;
            }());
            exports_1("PushnotificationService", PushnotificationService);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaG5vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInB1c2hub3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQUtNLEdBQUcsRUFHSCxPQUFPLEVBTVAsT0FBTzs7Ozs7Ozs7Ozs7WUFWYixXQUFXO1lBQ0wsR0FBRyxHQUFHLDRDQUE0QyxDQUFDO1lBRXpELGVBQWU7WUFDVCxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUM7Z0JBQzFCLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLGVBQWUsRUFBRSx3REFBd0Q7YUFDMUUsQ0FBQyxDQUFDO1lBRUgsZUFBZTtZQUNULE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUl6RDtnQkFLRSxpQ0FBWSxJQUFVO29CQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRUQsMENBQVEsR0FBUixVQUFTLE9BQU8sRUFBRSxRQUFRO29CQUExQixpQkFPQztvQkFOQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUM7eUJBQ2xELFNBQVMsQ0FDUixVQUFBLElBQUksSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBZCxDQUFjLEVBQ3RCLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBckIsQ0FBcUIsRUFDNUIsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQUUsRUFBckIsQ0FBcUIsQ0FDNUIsQ0FBQztnQkFDTixDQUFDO2dCQUVELCtDQUFhLEdBQWIsVUFBYyxJQUFJO29CQUNoQix3RUFBd0U7Z0JBQzFFLENBQUM7Z0JBRUQsNkNBQVcsR0FBWCxVQUFZLEtBQUs7b0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdkUsQ0FBQztnQkFFRCxnREFBYyxHQUFkO2dCQUVBLENBQUM7Z0JBRUQseUNBQU8sR0FBUDtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDbkIsQ0FBQztnQkFsQ0g7b0JBQUMsaUJBQVUsRUFBRTs7MkNBQUE7Z0JBb0NiLDhCQUFDO1lBQUQsQ0FBQyxBQW5DRCxJQW1DQztZQW5DRCw2REFtQ0MsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SHR0cCwgUmVxdWVzdE9wdGlvbnMsIEhlYWRlcnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuXG4vLyBBUEkgVVJMIFxuY29uc3QgdXJsID0gJ2h0dHBzOi8vb25lc2lnbmFsLmNvbS9hcGkvdjEvbm90aWZpY2F0aW9ucyc7XG5cbi8vIEhUVFAgSGVhZGVyc1xuY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgJ0F1dGhvcml6YXRpb24nOiAnQmFzaWMgTUdKbU5USXhabVF0WkRobU9TMDBNMk5sTFdKa01EWXRZV0UwTlRSbU16STBOMk14J1xufSk7XG5cbi8vIEhUVFAgT3B0aW9uc1xuY29uc3Qgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFB1c2hub3RpZmljYXRpb25TZXJ2aWNlIHtcblxuICBwcml2YXRlIGh0dHA6IEh0dHA7XG4gIHByaXZhdGUgZGF0YTogT2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKGh0dHA6IEh0dHApIHtcbiAgICB0aGlzLmh0dHAgPSBodHRwO1xuICAgIHRoaXMuZGF0YSA9IE9iamVjdDtcbiAgfVxuXG4gIHBvc3REYXRhKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5odHRwLnBvc3QodXJsLCBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSwgb3B0aW9ucylcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIGRhdGEgPT4gY2FsbGJhY2soZGF0YSksXG4gICAgICAgIGVyciA9PiB0aGlzLm9uUG9zdEVycm9yKGVyciksXG4gICAgICAgICgpID0+IHRoaXMub25Qb3N0Q29tcGxldGUoKVxuICAgICAgKTtcbiAgfVxuXG4gIG9uUG9zdFN1Y2Nlc3MoZGF0YSkge1xuICAgIC8vY29uc29sZS5sb2coJ1N1Y2Nlc3Mgb24gUHVzaG5vdGlmaWNhdGlvblNlcnZpY2U6IHBvc3REYXRhKCk6ICcsIGRhdGEpO1xuICB9XG5cbiAgb25Qb3N0RXJyb3IoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZygnRXJyb3Igb24gUHVzaG5vdGlmaWNhdGlvblNlcnZpY2U6IHBvc3REYXRhKCk6ICcsIGVycm9yKTtcbiAgfVxuXG4gIG9uUG9zdENvbXBsZXRlKCkge1xuICAgIFxuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG5cbn1cblxuIl19