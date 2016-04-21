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
                    console.log('Success on PushnotificationService: postData(): ', data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaG5vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInB1c2hub3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQUtNLEdBQUcsRUFHSCxPQUFPLEVBTVAsT0FBTzs7Ozs7Ozs7Ozs7WUFWYixXQUFXO1lBQ0wsR0FBRyxHQUFHLDRDQUE0QyxDQUFDO1lBRXpELGVBQWU7WUFDVCxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUM7Z0JBQzFCLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLGVBQWUsRUFBRSx3REFBd0Q7YUFDMUUsQ0FBQyxDQUFDO1lBRUgsZUFBZTtZQUNULE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUl6RDtnQkFLRSxpQ0FBWSxJQUFVO29CQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRUQsMENBQVEsR0FBUixVQUFTLE9BQU8sRUFBRSxRQUFRO29CQUExQixpQkFPQztvQkFOQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUM7eUJBQ2xELFNBQVMsQ0FDUixVQUFBLElBQUksSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBZCxDQUFjLEVBQ3RCLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBckIsQ0FBcUIsRUFDNUIsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQUUsRUFBckIsQ0FBcUIsQ0FDNUIsQ0FBQztnQkFDTixDQUFDO2dCQUVELCtDQUFhLEdBQWIsVUFBYyxJQUFJO29CQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4RSxDQUFDO2dCQUVELDZDQUFXLEdBQVgsVUFBWSxLQUFLO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZFLENBQUM7Z0JBRUQsZ0RBQWMsR0FBZDtnQkFFQSxDQUFDO2dCQUVELHlDQUFPLEdBQVA7b0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7Z0JBbENIO29CQUFDLGlCQUFVLEVBQUU7OzJDQUFBO2dCQW9DYiw4QkFBQztZQUFELENBQUMsQUFuQ0QsSUFtQ0M7WUFuQ0QsNkRBbUNDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0h0dHAsIFJlcXVlc3RPcHRpb25zLCBIZWFkZXJzfSBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcblxuLy8gQVBJIFVSTCBcbmNvbnN0IHVybCA9ICdodHRwczovL29uZXNpZ25hbC5jb20vYXBpL3YxL25vdGlmaWNhdGlvbnMnO1xuXG4vLyBIVFRQIEhlYWRlcnNcbmNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICdBdXRob3JpemF0aW9uJzogJ0Jhc2ljIE1HSm1OVEl4Wm1RdFpEaG1PUzAwTTJObExXSmtNRFl0WVdFME5UUm1NekkwTjJNeCdcbn0pO1xuXG4vLyBIVFRQIE9wdGlvbnNcbmNvbnN0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQdXNobm90aWZpY2F0aW9uU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBodHRwOiBIdHRwO1xuICBwcml2YXRlIGRhdGE6IE9iamVjdDtcblxuICBjb25zdHJ1Y3RvcihodHRwOiBIdHRwKSB7XG4gICAgdGhpcy5odHRwID0gaHR0cDtcbiAgICB0aGlzLmRhdGEgPSBPYmplY3Q7XG4gIH1cblxuICBwb3N0RGF0YShtZXNzYWdlLCBjYWxsYmFjaykge1xuICAgIHRoaXMuaHR0cC5wb3N0KHVybCwgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksIG9wdGlvbnMpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICBkYXRhID0+IGNhbGxiYWNrKGRhdGEpLFxuICAgICAgICBlcnIgPT4gdGhpcy5vblBvc3RFcnJvcihlcnIpLFxuICAgICAgICAoKSA9PiB0aGlzLm9uUG9zdENvbXBsZXRlKClcbiAgICAgICk7XG4gIH1cblxuICBvblBvc3RTdWNjZXNzKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZygnU3VjY2VzcyBvbiBQdXNobm90aWZpY2F0aW9uU2VydmljZTogcG9zdERhdGEoKTogJywgZGF0YSk7XG4gIH1cblxuICBvblBvc3RFcnJvcihlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKCdFcnJvciBvbiBQdXNobm90aWZpY2F0aW9uU2VydmljZTogcG9zdERhdGEoKTogJywgZXJyb3IpO1xuICB9XG5cbiAgb25Qb3N0Q29tcGxldGUoKSB7XG4gICAgXG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cblxufVxuXG4iXX0=