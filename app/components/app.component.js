System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map', '../providers/liveticker/liveticker', '../providers/pushnotification/pushnotification', '../providers/s3/s3', '../models/liveticker/liveticker', '../models/pushnotification/pushnotification'], function(exports_1, context_1) {
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
    var core_1, http_1, liveticker_1, pushnotification_1, s3_1, liveticker_2, pushnotification_2;
    var AppComponent;
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
            },
            function (liveticker_2_1) {
                liveticker_2 = liveticker_2_1;
            },
            function (pushnotification_2_1) {
                pushnotification_2 = pushnotification_2_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http, livetickerService, pushnotificationService, s3Service) {
                    this.http = http;
                    this.error = false;
                    this.emptyText = false;
                    this.livetickerSent = false;
                    this.loading = false;
                    this.isTitle = false;
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
                    }, function (url, type) {
                        _this.mediaUrl = url;
                        _this.mediaType = type;
                        _this.loading = false;
                    });
                };
                AppComponent.prototype.onFormSubmit = function (text, minute, option, isTitle) {
                    var _this = this;
                    if (text) {
                        switch (option) {
                            case 'pushAndLiveticker':
                                this.createPushnotificationAndSend(text, minute);
                                this.createLivetickerAndSend(text, minute, isTitle);
                                break;
                            case 'push':
                                this.createPushnotificationAndSend(text, minute);
                                break;
                            case 'liveticker':
                                this.createLivetickerAndSend(text, minute, isTitle);
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
                    var pushnotification = new pushnotification_2.Pushnotification('0e694cca-15b1-42b5-817e-151c9f3a3d70', ['All'], { 'foo': 'bar' }, { 'en': text });
                    this.pushnotificationService.postData(pushnotification, function (data) {
                        var body = JSON.parse(data._body);
                        _this.recipients = body.recipients;
                        _this.clearFields();
                        setTimeout(function () {
                            _this.recipients = null;
                        }, 2000);
                    });
                };
                AppComponent.prototype.createLivetickerAndSend = function (text, minute, isTitle) {
                    var _this = this;
                    var video = "";
                    var image = "";
                    switch (this.mediaType) {
                        case "image/jpeg":
                        case "image/png":
                            image = this.mediaUrl;
                            break;
                        case "video/quicktime":
                            video = this.mediaUrl;
                            break;
                    }
                    var liveticker = new liveticker_2.Liveticker(text, minute, image, video, isTitle);
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
                    this.mediaUrl = "";
                    this.mediaType = "";
                    this.isTitle = false;
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
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaUJBO2dCQXFCQyxzQkFBb0IsSUFBVSxFQUFFLGlCQUFvQyxFQUFFLHVCQUFnRCxFQUFFLFNBQW9CO29CQUF4SCxTQUFJLEdBQUosSUFBSSxDQUFNO29CQUU3QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBRXJCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO29CQUN2RCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFFM0IsSUFBSSxDQUFDLE9BQU8sR0FBRzt3QkFDZDs0QkFDQyxHQUFHLEVBQUUsbUJBQW1COzRCQUN4QixLQUFLLEVBQUUsbUJBQW1CO3lCQUMxQjt3QkFDRDs0QkFDQyxHQUFHLEVBQUUsTUFBTTs0QkFDWCxLQUFLLEVBQUUsV0FBVzt5QkFDbEI7d0JBQ0Q7NEJBQ0MsR0FBRyxFQUFFLFlBQVk7NEJBQ2pCLEtBQUssRUFBRSxpQkFBaUI7eUJBQ3hCO3FCQUNELENBQUM7b0JBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQztnQkFDbkMsQ0FBQztnQkFFRCxtQ0FBWSxHQUFaLFVBQWEsTUFBTTtvQkFBbkIsaUJBWUM7b0JBWEEsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFD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SkMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlcXVlc3RPcHRpb25zLCBIZWFkZXJzIH0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQge0xpdmV0aWNrZXJTZXJ2aWNlfSBmcm9tICcuLi9wcm92aWRlcnMvbGl2ZXRpY2tlci9saXZldGlja2VyJztcbmltcG9ydCB7UHVzaG5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJy4uL3Byb3ZpZGVycy9wdXNobm90aWZpY2F0aW9uL3B1c2hub3RpZmljYXRpb24nO1xuaW1wb3J0IHtTM1NlcnZpY2V9IGZyb20gJy4uL3Byb3ZpZGVycy9zMy9zMyc7XG5pbXBvcnQge0xpdmV0aWNrZXJ9IGZyb20gJy4uL21vZGVscy9saXZldGlja2VyL2xpdmV0aWNrZXInO1xuaW1wb3J0IHtQdXNobm90aWZpY2F0aW9ufSBmcm9tICcuLi9tb2RlbHMvcHVzaG5vdGlmaWNhdGlvbi9wdXNobm90aWZpY2F0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsaXZldGlja2VyJyxcblx0dGVtcGxhdGVVcmw6ICcuL2NvbXBvbmVudHMvYXBwLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vY29tcG9uZW50cy9hcHAuY29tcG9uZW50LmNzcyddLFxuXHRwcm92aWRlcnM6IFtMaXZldGlja2VyU2VydmljZSwgUHVzaG5vdGlmaWNhdGlvblNlcnZpY2UsIFMzU2VydmljZV1cbn0pXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuXG5cdC8vIFZpZXcgUHJvcHNcblx0cHJpdmF0ZSB0ZXh0OiBzdHJpbmc7XG5cdHByaXZhdGUgbWludXRlOiBOdW1iZXI7XG5cdHByaXZhdGUgbWVkaWFVcmw6IHN0cmluZztcblx0cHJpdmF0ZSBtZWRpYVR5cGU6IHN0cmluZztcblx0cHJpdmF0ZSBvcHRpb25zOiBBcnJheTxPYmplY3Q+O1xuXHRwcml2YXRlIG9wdGlvbjogc3RyaW5nO1xuXHRwcml2YXRlIGlzVGl0bGU6IEJvb2xlYW47XG5cdHByaXZhdGUgcmVjaXBpZW50czogTnVtYmVyO1xuXHRwcml2YXRlIGVycm9yOiBCb29sZWFuO1xuXHRwcml2YXRlIGxpdmV0aWNrZXJTZW50OiBCb29sZWFuO1xuXHRwcml2YXRlIGxvYWRpbmc6IEJvb2xlYW47XG5cdHByaXZhdGUgZW1wdHlUZXh0OiBCb29sZWFuO1xuXG5cdC8vIFNlcnZpY2VzXG5cdHByaXZhdGUgbGl2ZXRpY2tlclNlcnZpY2U6IExpdmV0aWNrZXJTZXJ2aWNlO1xuXHRwcml2YXRlIHB1c2hub3RpZmljYXRpb25TZXJ2aWNlOiBQdXNobm90aWZpY2F0aW9uU2VydmljZTtcblx0cHJpdmF0ZSBzM1NlcnZpY2U6IFMzU2VydmljZTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIGxpdmV0aWNrZXJTZXJ2aWNlOiBMaXZldGlja2VyU2VydmljZSwgcHVzaG5vdGlmaWNhdGlvblNlcnZpY2U6IFB1c2hub3RpZmljYXRpb25TZXJ2aWNlLCBzM1NlcnZpY2U6IFMzU2VydmljZSkge1xuXG5cdFx0dGhpcy5lcnJvciA9IGZhbHNlO1xuXHRcdHRoaXMuZW1wdHlUZXh0ID0gZmFsc2U7XG5cdFx0dGhpcy5saXZldGlja2VyU2VudCA9IGZhbHNlO1xuXHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdHRoaXMuaXNUaXRsZSA9IGZhbHNlO1xuXG5cdFx0dGhpcy5saXZldGlja2VyU2VydmljZSA9IGxpdmV0aWNrZXJTZXJ2aWNlO1xuXHRcdHRoaXMucHVzaG5vdGlmaWNhdGlvblNlcnZpY2UgPSBwdXNobm90aWZpY2F0aW9uU2VydmljZTtcblx0XHR0aGlzLnMzU2VydmljZSA9IHMzU2VydmljZTtcblxuXHRcdHRoaXMub3B0aW9ucyA9IFtcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAncHVzaEFuZExpdmV0aWNrZXInLFxuXHRcdFx0XHR0aXRsZTogJ1B1c2ggJiBMaXZldGlja2VyJ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAncHVzaCcsXG5cdFx0XHRcdHRpdGxlOiAnT25seSBQdXNoJ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnbGl2ZXRpY2tlcicsXG5cdFx0XHRcdHRpdGxlOiAnT25seSBMaXZldGlja2VyJ1xuXHRcdFx0fVxuXHRcdF07XG5cblx0XHR0aGlzLm9wdGlvbiA9ICdwdXNoQW5kTGl2ZXRpY2tlcic7XG5cdH1cblxuXHRvbkNoYW5nZUZpbGUoJGV2ZW50KSB7XG5cdFx0bGV0IGZpbGUgPSAkZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xuXHRcdHRoaXMuczNTZXJ2aWNlLnJldHJpZXZlU2lnblJlcXVlc3RBbmRVcGxvYWQoXG5cdFx0XHRmaWxlLFxuXHRcdFx0KCkgPT4ge1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXHRcdFx0fSxcblx0XHRcdCh1cmwsIHR5cGUpID0+IHtcblx0XHRcdFx0dGhpcy5tZWRpYVVybCA9IHVybDtcblx0XHRcdFx0dGhpcy5tZWRpYVR5cGUgPSB0eXBlO1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdH0pO1xuXHR9XG5cblx0b25Gb3JtU3VibWl0KHRleHQ6IHN0cmluZywgbWludXRlOiBOdW1iZXIsIG9wdGlvbjogc3RyaW5nLCBpc1RpdGxlOiBCb29sZWFuKSB7XG5cblx0XHRpZih0ZXh0KSB7XG5cdFx0XHRzd2l0Y2gob3B0aW9uKSB7XG5cdFx0XHRcdGNhc2UgJ3B1c2hBbmRMaXZldGlja2VyJzogLy8gU2VuZCB0byBQTlMgU2VydmVyIGFuZCBMaXZldGlja2VyIFNlcnZlclxuXHRcdFx0XHRcdHRoaXMuY3JlYXRlUHVzaG5vdGlmaWNhdGlvbkFuZFNlbmQodGV4dCwgbWludXRlKTtcblx0XHRcdFx0XHR0aGlzLmNyZWF0ZUxpdmV0aWNrZXJBbmRTZW5kKHRleHQsIG1pbnV0ZSwgaXNUaXRsZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3B1c2gnOiAvLyBTZW5kIHRvIFBOUyBTZXJ2ZXJcblx0XHRcdFx0XHR0aGlzLmNyZWF0ZVB1c2hub3RpZmljYXRpb25BbmRTZW5kKHRleHQsIG1pbnV0ZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2xpdmV0aWNrZXInIDogLy8gU2VuZCB0byBMaXZldGlja2VyIFNlcnZlclxuXHRcdFx0XHRcdHRoaXMuY3JlYXRlTGl2ZXRpY2tlckFuZFNlbmQodGV4dCwgbWludXRlLCBpc1RpdGxlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5lbXB0eVRleHQgPSB0cnVlO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuZW1wdHlUZXh0ID0gZmFsc2U7XG5cdFx0XHR9LCAyMDAwKTtcblx0XHR9XHRcdFx0XG5cdH1cblxuXHRjcmVhdGVQdXNobm90aWZpY2F0aW9uQW5kU2VuZCh0ZXh0LCBtaW51dGUpIHtcblxuXHRcdGlmKG1pbnV0ZSkge1xuXHRcdFx0dGV4dCA9IG1pbnV0ZSArICcuIFNwaWVsbWludXRlOiAnICsgdGV4dDtcblx0XHR9XG5cblx0XHRsZXQgcHVzaG5vdGlmaWNhdGlvbiA9IG5ldyBQdXNobm90aWZpY2F0aW9uKFxuXHRcdFx0JzBlNjk0Y2NhLTE1YjEtNDJiNS04MTdlLTE1MWM5ZjNhM2Q3MCcsXG5cdFx0XHRbJ0FsbCddLFxuXHRcdFx0eyAnZm9vJzogJ2JhcicgfSxcblx0XHRcdHsgJ2VuJzogdGV4dCB9XG5cdFx0KTtcblxuXHRcdHRoaXMucHVzaG5vdGlmaWNhdGlvblNlcnZpY2UucG9zdERhdGEocHVzaG5vdGlmaWNhdGlvbiwgKGRhdGEpID0+IHtcblx0XHRcdGxldCBib2R5ID0gSlNPTi5wYXJzZShkYXRhLl9ib2R5KTtcblx0XHRcdHRoaXMucmVjaXBpZW50cyA9IGJvZHkucmVjaXBpZW50cztcblx0XHRcdHRoaXMuY2xlYXJGaWVsZHMoKTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnJlY2lwaWVudHMgPSBudWxsO1xuXHRcdFx0fSwgMjAwMCk7XG5cdFx0fSk7XG5cdH1cblxuXHRjcmVhdGVMaXZldGlja2VyQW5kU2VuZCh0ZXh0LCBtaW51dGUsIGlzVGl0bGUpIHtcblx0XHRcblx0XHRsZXQgdmlkZW8gPSBcIlwiO1xuXHRcdGxldCBpbWFnZSA9IFwiXCI7XG5cdFx0XG5cdFx0c3dpdGNoKHRoaXMubWVkaWFUeXBlKSB7XG5cdFx0XHRjYXNlIFwiaW1hZ2UvanBlZ1wiIDpcblx0XHRcdGNhc2UgXCJpbWFnZS9wbmdcIiA6XG5cdFx0XHRcdGltYWdlID0gdGhpcy5tZWRpYVVybDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidmlkZW8vcXVpY2t0aW1lXCIgOlxuXHRcdFx0XHR2aWRlbyA9IHRoaXMubWVkaWFVcmw7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdGxldCBsaXZldGlja2VyID0gbmV3IExpdmV0aWNrZXIodGV4dCwgbWludXRlLCBpbWFnZSwgdmlkZW8sIGlzVGl0bGUpO1xuXHRcdFxuXHRcdHRoaXMubGl2ZXRpY2tlclNlcnZpY2UucG9zdERhdGEobGl2ZXRpY2tlciwgKCkgPT4ge1xuXHRcdFx0dGhpcy5saXZldGlja2VyU2VudCA9IHRydWU7XG5cdFx0XHR0aGlzLmNsZWFyRmllbGRzKCk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5saXZldGlja2VyU2VudCA9IG51bGw7XG5cdFx0XHR9LCAyMDAwKTtcblx0XHR9KTtcblx0fVxuXG5cdGNsZWFyRmllbGRzKCkge1xuXHRcdHRoaXMudGV4dCA9IFwiXCI7XG5cdFx0dGhpcy5taW51dGUgPSBudWxsO1xuXHRcdHRoaXMubWVkaWFVcmwgPSBcIlwiO1xuXHRcdHRoaXMubWVkaWFUeXBlID0gXCJcIjtcblx0XHR0aGlzLmlzVGl0bGUgPSBmYWxzZTtcblx0fVxuXG59XG4iXX0=