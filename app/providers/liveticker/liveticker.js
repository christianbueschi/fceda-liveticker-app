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
            url = 'https://fceda-liveticker-service.herokuapp.com/notifications';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZXRpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpdmV0aWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQUtNLEdBQUcsRUFHSCxPQUFPLEVBTVAsT0FBTzs7Ozs7Ozs7Ozs7WUFWYixXQUFXO1lBQ0wsR0FBRyxHQUFHLDhEQUE4RCxDQUFDO1lBRTNFLGVBQWU7WUFDVCxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUM7Z0JBQ3RCLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLFFBQVEsRUFBRSxrQkFBa0I7YUFDN0IsQ0FBQyxDQUFDO1lBRVAsZUFBZTtZQUNULE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUl6RDtnQkFLRSwyQkFBWSxJQUFVO29CQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRUQsb0NBQVEsR0FBUixVQUFTLE9BQU8sRUFBRSxRQUFRO29CQUExQixpQkFPQztvQkFOQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUM7eUJBQ2xELFNBQVMsQ0FDUixVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQXhCLENBQXdCLEVBQ2hDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBckIsQ0FBcUIsRUFDNUIsY0FBTSxPQUFBLFFBQVEsRUFBRSxFQUFWLENBQVUsQ0FDakIsQ0FBQztnQkFDTixDQUFDO2dCQUVELHlDQUFhLEdBQWIsVUFBYyxJQUFJO29CQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNsRSxDQUFDO2dCQUVELHVDQUFXLEdBQVgsVUFBWSxLQUFLO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBRUQsbUNBQU8sR0FBUDtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDbkIsQ0FBQztnQkE5Qkg7b0JBQUMsaUJBQVUsRUFBRTs7cUNBQUE7Z0JBZ0NiLHdCQUFDO1lBQUQsQ0FBQyxBQS9CRCxJQStCQztZQS9CRCxpREErQkMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SHR0cCwgUmVxdWVzdE9wdGlvbnMsIEhlYWRlcnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuXG4vLyBBUEkgVVJMIFxuY29uc3QgdXJsID0gJ2h0dHBzOi8vZmNlZGEtbGl2ZXRpY2tlci1zZXJ2aWNlLmhlcm9rdWFwcC5jb20vbm90aWZpY2F0aW9ucyc7XG5cbi8vIEhUVFAgSGVhZGVyc1xuY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfSk7XG5cbi8vIEhUVFAgT3B0aW9uc1xuY29uc3Qgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExpdmV0aWNrZXJTZXJ2aWNlIHtcblxuICBwcml2YXRlIGh0dHA6IEh0dHA7XG4gIHByaXZhdGUgZGF0YTogT2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKGh0dHA6IEh0dHApIHtcbiAgICB0aGlzLmh0dHAgPSBodHRwO1xuICAgIHRoaXMuZGF0YSA9IE9iamVjdDtcbiAgfVxuXG4gIHBvc3REYXRhKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5odHRwLnBvc3QodXJsLCBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSwgb3B0aW9ucylcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIGRhdGEgPT4gdGhpcy5vblBvc3RTdWNjZXNzKGRhdGEpLFxuICAgICAgICBlcnIgPT4gdGhpcy5vblBvc3RFcnJvcihlcnIpLFxuICAgICAgICAoKSA9PiBjYWxsYmFjaygpXG4gICAgICApO1xuICB9XG5cbiAgb25Qb3N0U3VjY2VzcyhkYXRhKSB7XG4gICAgY29uc29sZS5sb2coJ1N1Y2Nlc3Mgb24gTGl2ZXRpY2tlclNlcnZpY2U6IHBvc3REYXRhKCk6ICcsIGRhdGEpO1xuICB9XG5cbiAgb25Qb3N0RXJyb3IoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZygnRXJyb3Igb24gTGl2ZXRpY2tlclNlcnZpY2U6IHBvc3REYXRhKCk6ICcsIGVycm9yKTtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxuXG59XG5cbiJdfQ==