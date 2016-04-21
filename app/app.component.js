System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map', './providers/liveticker/liveticker', './providers/pushnotification/pushnotification', './providers/s3/s3'], function(exports_1, context_1) {
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
                        templateUrl: './app.component.html',
                        styleUrls: ['./app.component.css'],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBZUE7Z0JBb0JDLHNCQUFvQixJQUFVLEVBQUUsaUJBQW9DLEVBQUUsdUJBQWdELEVBQUUsU0FBb0I7b0JBQXhILFNBQUksR0FBSixJQUFJLENBQU07b0JBRTdCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7b0JBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUVyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7b0JBQzNDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyx1QkFBdUIsQ0FBQztvQkFDdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBRTNCLElBQUksQ0FBQyxPQUFPLEdBQUc7d0JBQ2Q7NEJBQ0MsR0FBRyxFQUFFLG1CQUFtQjs0QkFDeEIsS0FBSyxFQUFFLG1CQUFtQjt5QkFDMUI7d0JBQ0Q7NEJBQ0MsR0FBRyxFQUFFLE1BQU07NEJBQ1gsS0FBSyxFQUFFLFdBQVc7eUJBQ2xCO3dCQUNEOzRCQUNDLEdBQUcsRUFBRSxZQUFZOzRCQUNqQixLQUFLLEVBQUUsaUJBQWlCO3lCQUN4QjtxQkFDRCxDQUFDO29CQUVGLElBQUksQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUM7Z0JBQ25DLENBQUM7Z0JBRUQsbUNBQVksR0FBWixVQUFhLE1BQU07b0JBQW5CLGlCQVdDO29CQVZBLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLDRCQUE0QixDQUMx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O29CQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDcEIsQ0FBQztnQkFFRixpQkFBQztZQUFELENBQUMsQUFaRCxJQVlDO1lBWkQsbUNBWUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlcXVlc3RPcHRpb25zLCBIZWFkZXJzIH0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQge0xpdmV0aWNrZXJTZXJ2aWNlfSBmcm9tICcuL3Byb3ZpZGVycy9saXZldGlja2VyL2xpdmV0aWNrZXInO1xuaW1wb3J0IHtQdXNobm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnLi9wcm92aWRlcnMvcHVzaG5vdGlmaWNhdGlvbi9wdXNobm90aWZpY2F0aW9uJztcbmltcG9ydCB7UzNTZXJ2aWNlfSBmcm9tICcuL3Byb3ZpZGVycy9zMy9zMyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGl2ZXRpY2tlcicsXG5cdHRlbXBsYXRlVXJsOiAnLi9hcHAuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9hcHAuY29tcG9uZW50LmNzcyddLFxuXHRwcm92aWRlcnM6IFtMaXZldGlja2VyU2VydmljZSwgUHVzaG5vdGlmaWNhdGlvblNlcnZpY2UsIFMzU2VydmljZV1cbn0pXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuXG5cdHByaXZhdGUgdGV4dDogc3RyaW5nO1xuXHRwcml2YXRlIG1pbnV0ZTogTnVtYmVyO1xuXHRwcml2YXRlIGltYWdlOiBPYmplY3Q7XG5cdHByaXZhdGUgb3B0aW9uOiBzdHJpbmc7XG5cdHByaXZhdGUgaW1hZ2VVcmw6IHN0cmluZztcblxuXHRwcml2YXRlIGxpdmV0aWNrZXJTZXJ2aWNlOiBMaXZldGlja2VyU2VydmljZTtcblx0cHJpdmF0ZSBwdXNobm90aWZpY2F0aW9uU2VydmljZTogUHVzaG5vdGlmaWNhdGlvblNlcnZpY2U7XG5cdHByaXZhdGUgczNTZXJ2aWNlOiBTM1NlcnZpY2U7XG5cdFxuXHRwcml2YXRlIHJlY2lwaWVudHM6IE51bWJlcjtcblx0cHJpdmF0ZSBlcnJvcjogQm9vbGVhbjtcblx0cHJpdmF0ZSBsaXZldGlja2VyU2VudDogQm9vbGVhbjtcblx0cHJpdmF0ZSBsb2FkaW5nOiBCb29sZWFuO1xuXHRwcml2YXRlIGVtcHR5VGV4dDogQm9vbGVhbjtcblxuXHRwcml2YXRlIG9wdGlvbnM6IEFycmF5PE9iamVjdD47XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBsaXZldGlja2VyU2VydmljZTogTGl2ZXRpY2tlclNlcnZpY2UsIHB1c2hub3RpZmljYXRpb25TZXJ2aWNlOiBQdXNobm90aWZpY2F0aW9uU2VydmljZSwgczNTZXJ2aWNlOiBTM1NlcnZpY2UpIHtcblxuXHRcdHRoaXMuZXJyb3IgPSBmYWxzZTtcblx0XHR0aGlzLmVtcHR5VGV4dCA9IGZhbHNlO1xuXHRcdHRoaXMubGl2ZXRpY2tlclNlbnQgPSBmYWxzZTtcblx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuXHRcdHRoaXMubGl2ZXRpY2tlclNlcnZpY2UgPSBsaXZldGlja2VyU2VydmljZTtcblx0XHR0aGlzLnB1c2hub3RpZmljYXRpb25TZXJ2aWNlID0gcHVzaG5vdGlmaWNhdGlvblNlcnZpY2U7XG5cdFx0dGhpcy5zM1NlcnZpY2UgPSBzM1NlcnZpY2U7XG5cblx0XHR0aGlzLm9wdGlvbnMgPSBbXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3B1c2hBbmRMaXZldGlja2VyJyxcblx0XHRcdFx0dGl0bGU6ICdQdXNoICYgTGl2ZXRpY2tlcidcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3B1c2gnLFxuXHRcdFx0XHR0aXRsZTogJ09ubHkgUHVzaCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2xpdmV0aWNrZXInLFxuXHRcdFx0XHR0aXRsZTogJ09ubHkgTGl2ZXRpY2tlcidcblx0XHRcdH1cblx0XHRdO1xuXG5cdFx0dGhpcy5vcHRpb24gPSAncHVzaEFuZExpdmV0aWNrZXInO1xuXHR9XG5cblx0b25DaGFuZ2VGaWxlKCRldmVudCkge1xuXHRcdGxldCBmaWxlID0gJGV2ZW50LnRhcmdldC5maWxlc1swXTtcblx0XHR0aGlzLnMzU2VydmljZS5yZXRyaWV2ZVNpZ25SZXF1ZXN0QW5kVXBsb2FkKFxuXHRcdFx0ZmlsZSxcblx0XHRcdCgpID0+IHtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHQodXJsKSA9PiB7XG5cdFx0XHRcdHRoaXMuaW1hZ2VVcmwgPSB1cmw7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRvbmxvYWQoKSB7XG5cblx0fVxuXG5cdG9uRm9ybVN1Ym1pdCh0ZXh0OiBzdHJpbmcsIG1pbnV0ZTogTnVtYmVyLCBvcHRpb246IHN0cmluZykge1xuXG5cdFx0aWYodGV4dCkge1xuXHRcdFx0c3dpdGNoKG9wdGlvbikge1xuXHRcdFx0XHRjYXNlICdwdXNoQW5kTGl2ZXRpY2tlcic6IC8vIFNlbmQgdG8gUE5TIFNlcnZlciBhbmQgTGl2ZXRpY2tlciBTZXJ2ZXJcblx0XHRcdFx0XHR0aGlzLmNyZWF0ZVB1c2hub3RpZmljYXRpb25BbmRTZW5kKHRleHQsIG1pbnV0ZSk7XG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVMaXZldGlja2VyQW5kU2VuZCh0ZXh0LCBtaW51dGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdwdXNoJzogLy8gU2VuZCB0byBQTlMgU2VydmVyXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVQdXNobm90aWZpY2F0aW9uQW5kU2VuZCh0ZXh0LCBtaW51dGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdsaXZldGlja2VyJyA6IC8vIFNlbmQgdG8gTGl2ZXRpY2tlciBTZXJ2ZXJcblx0XHRcdFx0XHR0aGlzLmNyZWF0ZUxpdmV0aWNrZXJBbmRTZW5kKHRleHQsIG1pbnV0ZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZW1wdHlUZXh0ID0gdHJ1ZTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmVtcHR5VGV4dCA9IGZhbHNlO1xuXHRcdFx0fSwgMjAwMCk7XG5cdFx0fVx0XHRcdFxuXHR9XG5cblx0Y3JlYXRlUHVzaG5vdGlmaWNhdGlvbkFuZFNlbmQodGV4dCwgbWludXRlKSB7XG5cblx0XHRpZihtaW51dGUpIHtcblx0XHRcdHRleHQgPSBtaW51dGUgKyAnLiBTcGllbG1pbnV0ZTogJyArIHRleHQ7XG5cdFx0fVxuXG5cdFx0bGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZShcblx0XHRcdCcwZTY5NGNjYS0xNWIxLTQyYjUtODE3ZS0xNTFjOWYzYTNkNzAnLFxuXHRcdFx0WydBbGwnXSxcblx0XHRcdHsgJ2Zvbyc6ICdiYXInIH0sXG5cdFx0XHR7ICdlbic6IHRleHQgfVxuXHRcdCk7XG5cblx0XHR0aGlzLnB1c2hub3RpZmljYXRpb25TZXJ2aWNlLnBvc3REYXRhKG1lc3NhZ2UsIChkYXRhKSA9PiB7XG5cdFx0XHRsZXQgYm9keSA9IEpTT04ucGFyc2UoZGF0YS5fYm9keSk7XG5cdFx0XHR0aGlzLnJlY2lwaWVudHMgPSBib2R5LnJlY2lwaWVudHM7XG5cdFx0XHR0aGlzLmNsZWFyRmllbGRzKCk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5yZWNpcGllbnRzID0gbnVsbDtcblx0XHRcdH0sIDIwMDApO1xuXHRcdH0pO1xuXHR9XG5cblx0Y3JlYXRlTGl2ZXRpY2tlckFuZFNlbmQodGV4dCwgbWludXRlKSB7XG5cblx0XHRsZXQgaW1hZ2UgPSAodGhpcy5pbWFnZVVybCkgPyB0aGlzLmltYWdlVXJsIDogXCJcIjtcblxuXHRcdGxldCBsaXZldGlja2VyID0gbmV3IExpdmV0aWNrZXIodGV4dCwgbWludXRlLCBpbWFnZSk7XG5cdFx0XG5cdFx0dGhpcy5saXZldGlja2VyU2VydmljZS5wb3N0RGF0YShsaXZldGlja2VyLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmxpdmV0aWNrZXJTZW50ID0gdHJ1ZTtcblx0XHRcdHRoaXMuY2xlYXJGaWVsZHMoKTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmxpdmV0aWNrZXJTZW50ID0gbnVsbDtcblx0XHRcdH0sIDIwMDApO1xuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXJGaWVsZHMoKSB7XG5cdFx0dGhpcy50ZXh0ID0gXCJcIjtcblx0XHR0aGlzLm1pbnV0ZSA9IG51bGw7XG5cdFx0dGhpcy5pbWFnZVVybCA9IFwiXCI7XG5cdH1cblxuXG59XG5cbi8qXG4qIFJFU1QgQVBJIE1vZGVsIE9uZXNpZ25hbFxuKiBzZWU6IGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5vbmVzaWduYWwuY29tL2RvY3Mvbm90aWZpY2F0aW9ucy1jcmVhdGUtbm90aWZpY2F0aW9uXG4qL1xuZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xuXG5cdHByaXZhdGUgYXBwX2lkOiBTdHJpbmc7XG5cdHByaXZhdGUgaW5jbHVkZWRfc2VnbWVudHM6IEFycmF5PFN0cmluZz47XG5cdHByaXZhdGUgZGF0YTogT2JqZWN0O1xuXHRwcml2YXRlIGNvbnRlbnRzOiBPYmplY3Q7XG5cblx0Y29uc3RydWN0b3IoYXBwX2lkOiBTdHJpbmcsIGluY2x1ZGVkX3NlZ21lbnRzOiBBcnJheTxTdHJpbmc+LCBkYXRhOiBPYmplY3QsIGNvbnRlbnRzOiBPYmplY3QpIHtcblx0XHR0aGlzLmFwcF9pZCA9IGFwcF9pZDtcblx0XHR0aGlzLmluY2x1ZGVkX3NlZ21lbnRzID0gaW5jbHVkZWRfc2VnbWVudHM7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLmNvbnRlbnRzID0gY29udGVudHM7XG5cdH1cblxufVxuXG4vKlxuKiBSRVNUIEFQSSBNb2RlbCBMaXZldGlja2VyXG4qIHNlZTogXG4qL1xuZXhwb3J0IGNsYXNzIExpdmV0aWNrZXIge1xuXG5cdHByaXZhdGUgdGV4dDogc3RyaW5nO1xuXHRwcml2YXRlIG1pbnV0ZTogTnVtYmVyO1xuXHRwcml2YXRlIGltYWdlOiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IodGV4dDogc3RyaW5nLCBtaW51dGU6IE51bWJlciwgaW1hZ2U6IHN0cmluZykge1xuXHRcdHRoaXMudGV4dCA9IHRleHQ7XG5cdFx0dGhpcy5taW51dGUgPSBtaW51dGU7XG5cdFx0dGhpcy5pbWFnZSA9IGltYWdlO1xuXHR9XG5cbn1cbiJdfQ==