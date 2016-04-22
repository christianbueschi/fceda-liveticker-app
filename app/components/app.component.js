System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map', '../providers/liveticker/liveticker', '../providers/pushnotification/pushnotification', '../providers/s3/s3'], function(exports_1, context_1) {
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
    var core_1, http_1, liveticker_1, pushnotification_1, s3_1;
    var AppComponent, Message, Liveticker;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (liveticker_1_1) {
                liveticker_1 = liveticker_1_1;
            },
            function (pushnotification_1_1) {
                pushnotification_1 = pushnotification_1_1;
            },
            function (s3_1_1) {
                s3_1 = s3_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http, livetickerService, pushnotificationService, s3Service) {
                    this.http = http;
                    this.error = false;
                    this.emptyText = false;
                    this.livetickerSent = false;
                    this.loading = false;
                    this.livetickerService = livetickerService;
                    this.pushnotificationService = pushnotificationService;
                    this.s3Service = s3Service;
                    this.options = [
                        {
                            key: 'pushAndLiveticker',
                            title: 'Push & Liveticker'
                        },
                        {
                            key: 'push',
                            title: 'Only Push'
                        },
                        {
                            key: 'liveticker',
                            title: 'Only Liveticker'
                        }
                    ];
                    this.option = 'pushAndLiveticker';
                }
                AppComponent.prototype.onChangeFile = function ($event) {
                    var _this = this;
                    var file = $event.target.files[0];
                    this.s3Service.retrieveSignRequestAndUpload(file, function () {
                        _this.loading = true;
                    }, function (url) {
                        _this.imageUrl = url;
                        _this.loading = false;
                    });
                };
                AppComponent.prototype.onload = function () {
                };
                AppComponent.prototype.onFormSubmit = function (text, minute, option) {
                    var _this = this;
                    if (text) {
                        switch (option) {
                            case 'pushAndLiveticker':
                                this.createPushnotificationAndSend(text, minute);
                                this.createLivetickerAndSend(text, minute);
                                break;
                            case 'push':
                                this.createPushnotificationAndSend(text, minute);
                                break;
                            case 'liveticker':
                                this.createLivetickerAndSend(text, minute);
                                break;
                        }
                    }
                    else {
                        this.emptyText = true;
                        setTimeout(function () {
                            _this.emptyText = false;
                        }, 2000);
                    }
                };
                AppComponent.prototype.createPushnotificationAndSend = function (text, minute) {
                    var _this = this;
                    if (minute) {
                        text = minute + '. Spielminute: ' + text;
                    }
                    var message = new Message('0e694cca-15b1-42b5-817e-151c9f3a3d70', ['All'], { 'foo': 'bar' }, { 'en': text });
                    this.pushnotificationService.postData(message, function (data) {
                        var body = JSON.parse(data._body);
                        _this.recipients = body.recipients;
                        _this.clearFields();
                        setTimeout(function () {
                            _this.recipients = null;
                        }, 2000);
                    });
                };
                AppComponent.prototype.createLivetickerAndSend = function (text, minute) {
                    var _this = this;
                    var image = (this.imageUrl) ? this.imageUrl : "";
                    var liveticker = new Liveticker(text, minute, image);
                    this.livetickerService.postData(liveticker, function () {
                        _this.livetickerSent = true;
                        _this.clearFields();
                        setTimeout(function () {
                            _this.livetickerSent = null;
                        }, 2000);
                    });
                };
                AppComponent.prototype.clearFields = function () {
                    this.text = "";
                    this.minute = null;
                    this.imageUrl = "";
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'liveticker',
                        templateUrl: './components/app.component.html',
                        styleUrls: ['./components/app.component.css'],
                        providers: [liveticker_1.LivetickerService, pushnotification_1.PushnotificationService, s3_1.S3Service]
                    }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, liveticker_1.LivetickerService, pushnotification_1.PushnotificationService, s3_1.S3Service])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            /*
            * REST API Model Onesignal
            * see: https://documentation.onesignal.com/docs/notifications-create-notification
            */
            Message = (function () {
                function Message(app_id, included_segments, data, contents) {
                    this.app_id = app_id;
                    this.included_segments = included_segments;
                    this.data = data;
                    this.contents = contents;
                }
                return Message;
            }());
            exports_1("Message", Message);
            /*
            * REST API Model Liveticker
            * see:
            */
            Liveticker = (function () {
                function Liveticker(text, minute, image) {
                    this.text = text;
                    this.minute = minute;
                    this.image = image;
                }
                return Liveticker;
            }());
            exports_1("Liveticker", Liveticker);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBZUE7Z0JBb0JDLHNCQUFvQixJQUFVLEVBQUUsaUJBQW9DLEVBQUUsdUJBQWdELEVBQUUsU0FBb0I7b0JBQXhILFNBQUksR0FBSixJQUFJLENBQU07b0JBRTdCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7b0JBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUVyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7b0JBQzNDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyx1QkFBdUIsQ0FBQztvQkFDdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBRTNCLElBQUksQ0FBQyxPQUFPLEdBQUc7d0JBQ2Q7NEJBQ0MsR0FBRyxFQUFFLG1CQUFtQjs0QkFDeEIsS0FBSyxFQUFFLG1CQUFtQjt5QkFDMUI7d0JBQ0Q7NEJBQ0MsR0FBRyxFQUFFLE1BQU07NEJBQ1gsS0FBSyxFQUFFLFdBQVc7eUJBQ2xCO3dCQUNEOzRCQUNDLEdBQUcsRUFBRSxZQUFZOzRCQUNqQixLQUFLLEVBQUUsaUJBQWlCO3lCQUN4QjtxQkFDRCxDQUFDO29CQUVGLElBQUksQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUM7Z0JBQ25DLENBQUM7Z0JBRUQsbUNBQVksR0FBWixVQUFhLE1BQU07b0JBQW5CLGlCQVdDO29CQVZBLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLDRCQUE0QixDQUMx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O29CQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDcEIsQ0FBQztnQkFFRixpQkFBQztZQUFELENBQUMsQUFaRCxJQVlDO1lBWkQsbUNBWUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlcXVlc3RPcHRpb25zLCBIZWFkZXJzIH0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQge0xpdmV0aWNrZXJTZXJ2aWNlfSBmcm9tICcuLi9wcm92aWRlcnMvbGl2ZXRpY2tlci9saXZldGlja2VyJztcbmltcG9ydCB7UHVzaG5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJy4uL3Byb3ZpZGVycy9wdXNobm90aWZpY2F0aW9uL3B1c2hub3RpZmljYXRpb24nO1xuaW1wb3J0IHtTM1NlcnZpY2V9IGZyb20gJy4uL3Byb3ZpZGVycy9zMy9zMyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGl2ZXRpY2tlcicsXG5cdHRlbXBsYXRlVXJsOiAnLi9jb21wb25lbnRzL2FwcC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2NvbXBvbmVudHMvYXBwLmNvbXBvbmVudC5jc3MnXSxcblx0cHJvdmlkZXJzOiBbTGl2ZXRpY2tlclNlcnZpY2UsIFB1c2hub3RpZmljYXRpb25TZXJ2aWNlLCBTM1NlcnZpY2VdXG59KVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIHRleHQ6IHN0cmluZztcblx0cHJpdmF0ZSBtaW51dGU6IE51bWJlcjtcblx0cHJpdmF0ZSBpbWFnZTogT2JqZWN0O1xuXHRwcml2YXRlIG9wdGlvbjogc3RyaW5nO1xuXHRwcml2YXRlIGltYWdlVXJsOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBsaXZldGlja2VyU2VydmljZTogTGl2ZXRpY2tlclNlcnZpY2U7XG5cdHByaXZhdGUgcHVzaG5vdGlmaWNhdGlvblNlcnZpY2U6IFB1c2hub3RpZmljYXRpb25TZXJ2aWNlO1xuXHRwcml2YXRlIHMzU2VydmljZTogUzNTZXJ2aWNlO1xuXHRcblx0cHJpdmF0ZSByZWNpcGllbnRzOiBOdW1iZXI7XG5cdHByaXZhdGUgZXJyb3I6IEJvb2xlYW47XG5cdHByaXZhdGUgbGl2ZXRpY2tlclNlbnQ6IEJvb2xlYW47XG5cdHByaXZhdGUgbG9hZGluZzogQm9vbGVhbjtcblx0cHJpdmF0ZSBlbXB0eVRleHQ6IEJvb2xlYW47XG5cblx0cHJpdmF0ZSBvcHRpb25zOiBBcnJheTxPYmplY3Q+O1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgbGl2ZXRpY2tlclNlcnZpY2U6IExpdmV0aWNrZXJTZXJ2aWNlLCBwdXNobm90aWZpY2F0aW9uU2VydmljZTogUHVzaG5vdGlmaWNhdGlvblNlcnZpY2UsIHMzU2VydmljZTogUzNTZXJ2aWNlKSB7XG5cblx0XHR0aGlzLmVycm9yID0gZmFsc2U7XG5cdFx0dGhpcy5lbXB0eVRleHQgPSBmYWxzZTtcblx0XHR0aGlzLmxpdmV0aWNrZXJTZW50ID0gZmFsc2U7XG5cdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cblx0XHR0aGlzLmxpdmV0aWNrZXJTZXJ2aWNlID0gbGl2ZXRpY2tlclNlcnZpY2U7XG5cdFx0dGhpcy5wdXNobm90aWZpY2F0aW9uU2VydmljZSA9IHB1c2hub3RpZmljYXRpb25TZXJ2aWNlO1xuXHRcdHRoaXMuczNTZXJ2aWNlID0gczNTZXJ2aWNlO1xuXG5cdFx0dGhpcy5vcHRpb25zID0gW1xuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdwdXNoQW5kTGl2ZXRpY2tlcicsXG5cdFx0XHRcdHRpdGxlOiAnUHVzaCAmIExpdmV0aWNrZXInXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdwdXNoJyxcblx0XHRcdFx0dGl0bGU6ICdPbmx5IFB1c2gnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdsaXZldGlja2VyJyxcblx0XHRcdFx0dGl0bGU6ICdPbmx5IExpdmV0aWNrZXInXG5cdFx0XHR9XG5cdFx0XTtcblxuXHRcdHRoaXMub3B0aW9uID0gJ3B1c2hBbmRMaXZldGlja2VyJztcblx0fVxuXG5cdG9uQ2hhbmdlRmlsZSgkZXZlbnQpIHtcblx0XHRsZXQgZmlsZSA9ICRldmVudC50YXJnZXQuZmlsZXNbMF07XG5cdFx0dGhpcy5zM1NlcnZpY2UucmV0cmlldmVTaWduUmVxdWVzdEFuZFVwbG9hZChcblx0XHRcdGZpbGUsXG5cdFx0XHQoKSA9PiB7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IHRydWU7XG5cdFx0XHR9LFxuXHRcdFx0KHVybCkgPT4ge1xuXHRcdFx0XHR0aGlzLmltYWdlVXJsID0gdXJsO1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0pO1xuXHR9XG5cblx0b25sb2FkKCkge1xuXG5cdH1cblxuXHRvbkZvcm1TdWJtaXQodGV4dDogc3RyaW5nLCBtaW51dGU6IE51bWJlciwgb3B0aW9uOiBzdHJpbmcpIHtcblxuXHRcdGlmKHRleHQpIHtcblx0XHRcdHN3aXRjaChvcHRpb24pIHtcblx0XHRcdFx0Y2FzZSAncHVzaEFuZExpdmV0aWNrZXInOiAvLyBTZW5kIHRvIFBOUyBTZXJ2ZXIgYW5kIExpdmV0aWNrZXIgU2VydmVyXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVQdXNobm90aWZpY2F0aW9uQW5kU2VuZCh0ZXh0LCBtaW51dGUpO1xuXHRcdFx0XHRcdHRoaXMuY3JlYXRlTGl2ZXRpY2tlckFuZFNlbmQodGV4dCwgbWludXRlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAncHVzaCc6IC8vIFNlbmQgdG8gUE5TIFNlcnZlclxuXHRcdFx0XHRcdHRoaXMuY3JlYXRlUHVzaG5vdGlmaWNhdGlvbkFuZFNlbmQodGV4dCwgbWludXRlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnbGl2ZXRpY2tlcicgOiAvLyBTZW5kIHRvIExpdmV0aWNrZXIgU2VydmVyXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVMaXZldGlja2VyQW5kU2VuZCh0ZXh0LCBtaW51dGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmVtcHR5VGV4dCA9IHRydWU7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5lbXB0eVRleHQgPSBmYWxzZTtcblx0XHRcdH0sIDIwMDApO1xuXHRcdH1cdFx0XHRcblx0fVxuXG5cdGNyZWF0ZVB1c2hub3RpZmljYXRpb25BbmRTZW5kKHRleHQsIG1pbnV0ZSkge1xuXG5cdFx0aWYobWludXRlKSB7XG5cdFx0XHR0ZXh0ID0gbWludXRlICsgJy4gU3BpZWxtaW51dGU6ICcgKyB0ZXh0O1xuXHRcdH1cblxuXHRcdGxldCBtZXNzYWdlID0gbmV3IE1lc3NhZ2UoXG5cdFx0XHQnMGU2OTRjY2EtMTViMS00MmI1LTgxN2UtMTUxYzlmM2EzZDcwJyxcblx0XHRcdFsnQWxsJ10sXG5cdFx0XHR7ICdmb28nOiAnYmFyJyB9LFxuXHRcdFx0eyAnZW4nOiB0ZXh0IH1cblx0XHQpO1xuXG5cdFx0dGhpcy5wdXNobm90aWZpY2F0aW9uU2VydmljZS5wb3N0RGF0YShtZXNzYWdlLCAoZGF0YSkgPT4ge1xuXHRcdFx0bGV0IGJvZHkgPSBKU09OLnBhcnNlKGRhdGEuX2JvZHkpO1xuXHRcdFx0dGhpcy5yZWNpcGllbnRzID0gYm9keS5yZWNpcGllbnRzO1xuXHRcdFx0dGhpcy5jbGVhckZpZWxkcygpO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMucmVjaXBpZW50cyA9IG51bGw7XG5cdFx0XHR9LCAyMDAwKTtcblx0XHR9KTtcblx0fVxuXG5cdGNyZWF0ZUxpdmV0aWNrZXJBbmRTZW5kKHRleHQsIG1pbnV0ZSkge1xuXG5cdFx0bGV0IGltYWdlID0gKHRoaXMuaW1hZ2VVcmwpID8gdGhpcy5pbWFnZVVybCA6IFwiXCI7XG5cblx0XHRsZXQgbGl2ZXRpY2tlciA9IG5ldyBMaXZldGlja2VyKHRleHQsIG1pbnV0ZSwgaW1hZ2UpO1xuXHRcdFxuXHRcdHRoaXMubGl2ZXRpY2tlclNlcnZpY2UucG9zdERhdGEobGl2ZXRpY2tlciwgKCkgPT4ge1xuXHRcdFx0dGhpcy5saXZldGlja2VyU2VudCA9IHRydWU7XG5cdFx0XHR0aGlzLmNsZWFyRmllbGRzKCk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5saXZldGlja2VyU2VudCA9IG51bGw7XG5cdFx0XHR9LCAyMDAwKTtcblx0XHR9KTtcblx0fVxuXG5cdGNsZWFyRmllbGRzKCkge1xuXHRcdHRoaXMudGV4dCA9IFwiXCI7XG5cdFx0dGhpcy5taW51dGUgPSBudWxsO1xuXHRcdHRoaXMuaW1hZ2VVcmwgPSBcIlwiO1xuXHR9XG5cblxufVxuXG4vKlxuKiBSRVNUIEFQSSBNb2RlbCBPbmVzaWduYWxcbiogc2VlOiBodHRwczovL2RvY3VtZW50YXRpb24ub25lc2lnbmFsLmNvbS9kb2NzL25vdGlmaWNhdGlvbnMtY3JlYXRlLW5vdGlmaWNhdGlvblxuKi9cbmV4cG9ydCBjbGFzcyBNZXNzYWdlIHtcblxuXHRwcml2YXRlIGFwcF9pZDogU3RyaW5nO1xuXHRwcml2YXRlIGluY2x1ZGVkX3NlZ21lbnRzOiBBcnJheTxTdHJpbmc+O1xuXHRwcml2YXRlIGRhdGE6IE9iamVjdDtcblx0cHJpdmF0ZSBjb250ZW50czogT2JqZWN0O1xuXG5cdGNvbnN0cnVjdG9yKGFwcF9pZDogU3RyaW5nLCBpbmNsdWRlZF9zZWdtZW50czogQXJyYXk8U3RyaW5nPiwgZGF0YTogT2JqZWN0LCBjb250ZW50czogT2JqZWN0KSB7XG5cdFx0dGhpcy5hcHBfaWQgPSBhcHBfaWQ7XG5cdFx0dGhpcy5pbmNsdWRlZF9zZWdtZW50cyA9IGluY2x1ZGVkX3NlZ21lbnRzO1xuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0dGhpcy5jb250ZW50cyA9IGNvbnRlbnRzO1xuXHR9XG5cbn1cblxuLypcbiogUkVTVCBBUEkgTW9kZWwgTGl2ZXRpY2tlclxuKiBzZWU6IFxuKi9cbmV4cG9ydCBjbGFzcyBMaXZldGlja2VyIHtcblxuXHRwcml2YXRlIHRleHQ6IHN0cmluZztcblx0cHJpdmF0ZSBtaW51dGU6IE51bWJlcjtcblx0cHJpdmF0ZSBpbWFnZTogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZywgbWludXRlOiBOdW1iZXIsIGltYWdlOiBzdHJpbmcpIHtcblx0XHR0aGlzLnRleHQgPSB0ZXh0O1xuXHRcdHRoaXMubWludXRlID0gbWludXRlO1xuXHRcdHRoaXMuaW1hZ2UgPSBpbWFnZTtcblx0fVxuXG59XG4iXX0=