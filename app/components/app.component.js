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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaUJBO2dCQXFCQyxzQkFBb0IsSUFBVSxFQUFFLGlCQUFvQyxFQUFFLHVCQUFnRCxFQUFFLFNBQW9CO29CQUF4SCxTQUFJLEdBQUosSUFBSSxDQUFNO29CQUU3QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBRXJCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO29CQUN2RCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFFM0IsSUFBSSxDQUFDLE9BQU8sR0FBRzt3QkFDZDs0QkFDQyxHQUFHLEVBQUUsbUJBQW1COzRCQUN4QixLQUFLLEVBQUUsbUJBQW1CO3lCQUMxQjt3QkFDRDs0QkFDQyxHQUFHLEVBQUUsTUFBTTs0QkFDWCxLQUFLLEVBQUUsV0FBVzt5QkFDbEI7d0JBQ0Q7NEJBQ0MsR0FBRyxFQUFFLFlBQVk7NEJBQ2pCLEtBQUssRUFBRSxpQkFBaUI7eUJBQ3hCO3FCQUNELENBQUM7b0JBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQztnQkFDbkMsQ0FBQztnQkFFRCxtQ0FBWSxHQUFaLFVBQWEsTUFBTTtvQkFBbkIsaUJBWUM7b0JBWEEsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFD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IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgUmVxdWVzdE9wdGlvbnMsIEhlYWRlcnMgfSBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCB7TGl2ZXRpY2tlclNlcnZpY2V9IGZyb20gJy4uL3Byb3ZpZGVycy9saXZldGlja2VyL2xpdmV0aWNrZXInO1xuaW1wb3J0IHtQdXNobm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnLi4vcHJvdmlkZXJzL3B1c2hub3RpZmljYXRpb24vcHVzaG5vdGlmaWNhdGlvbic7XG5pbXBvcnQge1MzU2VydmljZX0gZnJvbSAnLi4vcHJvdmlkZXJzL3MzL3MzJztcbmltcG9ydCB7TGl2ZXRpY2tlcn0gZnJvbSAnLi4vbW9kZWxzL2xpdmV0aWNrZXIvbGl2ZXRpY2tlcic7XG5pbXBvcnQge1B1c2hub3RpZmljYXRpb259IGZyb20gJy4uL21vZGVscy9wdXNobm90aWZpY2F0aW9uL3B1c2hub3RpZmljYXRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xpdmV0aWNrZXInLFxuXHR0ZW1wbGF0ZVVybDogJy4vY29tcG9uZW50cy9hcHAuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9jb21wb25lbnRzL2FwcC5jb21wb25lbnQuY3NzJ10sXG5cdHByb3ZpZGVyczogW0xpdmV0aWNrZXJTZXJ2aWNlLCBQdXNobm90aWZpY2F0aW9uU2VydmljZSwgUzNTZXJ2aWNlXVxufSlcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cblx0Ly8gVmlldyBQcm9wc1xuXHRwcml2YXRlIHRleHQ6IHN0cmluZztcblx0cHJpdmF0ZSBtaW51dGU6IE51bWJlcjtcblx0cHJpdmF0ZSBtZWRpYVVybDogc3RyaW5nO1xuXHRwcml2YXRlIG1lZGlhVHlwZTogc3RyaW5nO1xuXHRwcml2YXRlIG9wdGlvbnM6IEFycmF5PE9iamVjdD47XG5cdHByaXZhdGUgb3B0aW9uOiBzdHJpbmc7XG5cdHByaXZhdGUgaXNUaXRsZTogQm9vbGVhbjtcblx0cHJpdmF0ZSByZWNpcGllbnRzOiBOdW1iZXI7XG5cdHByaXZhdGUgZXJyb3I6IEJvb2xlYW47XG5cdHByaXZhdGUgbGl2ZXRpY2tlclNlbnQ6IEJvb2xlYW47XG5cdHByaXZhdGUgbG9hZGluZzogQm9vbGVhbjtcblx0cHJpdmF0ZSBlbXB0eVRleHQ6IEJvb2xlYW47XG5cblx0Ly8gU2VydmljZXNcblx0cHJpdmF0ZSBsaXZldGlja2VyU2VydmljZTogTGl2ZXRpY2tlclNlcnZpY2U7XG5cdHByaXZhdGUgcHVzaG5vdGlmaWNhdGlvblNlcnZpY2U6IFB1c2hub3RpZmljYXRpb25TZXJ2aWNlO1xuXHRwcml2YXRlIHMzU2VydmljZTogUzNTZXJ2aWNlO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgbGl2ZXRpY2tlclNlcnZpY2U6IExpdmV0aWNrZXJTZXJ2aWNlLCBwdXNobm90aWZpY2F0aW9uU2VydmljZTogUHVzaG5vdGlmaWNhdGlvblNlcnZpY2UsIHMzU2VydmljZTogUzNTZXJ2aWNlKSB7XG5cblx0XHR0aGlzLmVycm9yID0gZmFsc2U7XG5cdFx0dGhpcy5lbXB0eVRleHQgPSBmYWxzZTtcblx0XHR0aGlzLmxpdmV0aWNrZXJTZW50ID0gZmFsc2U7XG5cdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0dGhpcy5pc1RpdGxlID0gZmFsc2U7XG5cblx0XHR0aGlzLmxpdmV0aWNrZXJTZXJ2aWNlID0gbGl2ZXRpY2tlclNlcnZpY2U7XG5cdFx0dGhpcy5wdXNobm90aWZpY2F0aW9uU2VydmljZSA9IHB1c2hub3RpZmljYXRpb25TZXJ2aWNlO1xuXHRcdHRoaXMuczNTZXJ2aWNlID0gczNTZXJ2aWNlO1xuXG5cdFx0dGhpcy5vcHRpb25zID0gW1xuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdwdXNoQW5kTGl2ZXRpY2tlcicsXG5cdFx0XHRcdHRpdGxlOiAnUHVzaCAmIExpdmV0aWNrZXInXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdwdXNoJyxcblx0XHRcdFx0dGl0bGU6ICdPbmx5IFB1c2gnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdsaXZldGlja2VyJyxcblx0XHRcdFx0dGl0bGU6ICdPbmx5IExpdmV0aWNrZXInXG5cdFx0XHR9XG5cdFx0XTtcblxuXHRcdHRoaXMub3B0aW9uID0gJ3B1c2hBbmRMaXZldGlja2VyJztcblx0fVxuXG5cdG9uQ2hhbmdlRmlsZSgkZXZlbnQpIHtcblx0XHRsZXQgZmlsZSA9ICRldmVudC50YXJnZXQuZmlsZXNbMF07XG5cdFx0dGhpcy5zM1NlcnZpY2UucmV0cmlldmVTaWduUmVxdWVzdEFuZFVwbG9hZChcblx0XHRcdGZpbGUsXG5cdFx0XHQoKSA9PiB7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IHRydWU7XG5cdFx0XHR9LFxuXHRcdFx0KHVybCwgdHlwZSkgPT4ge1xuXHRcdFx0XHR0aGlzLm1lZGlhVXJsID0gdXJsO1xuXHRcdFx0XHR0aGlzLm1lZGlhVHlwZSA9IHR5cGU7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRvbkZvcm1TdWJtaXQodGV4dDogc3RyaW5nLCBtaW51dGU6IE51bWJlciwgb3B0aW9uOiBzdHJpbmcsIGlzVGl0bGU6IEJvb2xlYW4pIHtcblxuXHRcdGlmKHRleHQpIHtcblx0XHRcdHN3aXRjaChvcHRpb24pIHtcblx0XHRcdFx0Y2FzZSAncHVzaEFuZExpdmV0aWNrZXInOiAvLyBTZW5kIHRvIFBOUyBTZXJ2ZXIgYW5kIExpdmV0aWNrZXIgU2VydmVyXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVQdXNobm90aWZpY2F0aW9uQW5kU2VuZCh0ZXh0LCBtaW51dGUpO1xuXHRcdFx0XHRcdHRoaXMuY3JlYXRlTGl2ZXRpY2tlckFuZFNlbmQodGV4dCwgbWludXRlLCBpc1RpdGxlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAncHVzaCc6IC8vIFNlbmQgdG8gUE5TIFNlcnZlclxuXHRcdFx0XHRcdHRoaXMuY3JlYXRlUHVzaG5vdGlmaWNhdGlvbkFuZFNlbmQodGV4dCwgbWludXRlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnbGl2ZXRpY2tlcicgOiAvLyBTZW5kIHRvIExpdmV0aWNrZXIgU2VydmVyXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVMaXZldGlja2VyQW5kU2VuZCh0ZXh0LCBtaW51dGUsIGlzVGl0bGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmVtcHR5VGV4dCA9IHRydWU7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5lbXB0eVRleHQgPSBmYWxzZTtcblx0XHRcdH0sIDIwMDApO1xuXHRcdH1cdFx0XHRcblx0fVxuXG5cdGNyZWF0ZVB1c2hub3RpZmljYXRpb25BbmRTZW5kKHRleHQsIG1pbnV0ZSkge1xuXG5cdFx0aWYobWludXRlKSB7XG5cdFx0XHR0ZXh0ID0gbWludXRlICsgJy4gU3BpZWxtaW51dGU6ICcgKyB0ZXh0O1xuXHRcdH1cblxuXHRcdGxldCBwdXNobm90aWZpY2F0aW9uID0gbmV3IFB1c2hub3RpZmljYXRpb24oXG5cdFx0XHQnMGU2OTRjY2EtMTViMS00MmI1LTgxN2UtMTUxYzlmM2EzZDcwJyxcblx0XHRcdFsnQWxsJ10sXG5cdFx0XHR7ICdmb28nOiAnYmFyJyB9LFxuXHRcdFx0eyAnZW4nOiB0ZXh0IH1cblx0XHQpO1xuXG5cdFx0dGhpcy5wdXNobm90aWZpY2F0aW9uU2VydmljZS5wb3N0RGF0YShwdXNobm90aWZpY2F0aW9uLCAoZGF0YSkgPT4ge1xuXHRcdFx0bGV0IGJvZHkgPSBKU09OLnBhcnNlKGRhdGEuX2JvZHkpO1xuXHRcdFx0dGhpcy5yZWNpcGllbnRzID0gYm9keS5yZWNpcGllbnRzO1xuXHRcdFx0dGhpcy5jbGVhckZpZWxkcygpO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMucmVjaXBpZW50cyA9IG51bGw7XG5cdFx0XHR9LCAyMDAwKTtcblx0XHR9KTtcblx0fVxuXG5cdGNyZWF0ZUxpdmV0aWNrZXJBbmRTZW5kKHRleHQsIG1pbnV0ZSwgaXNUaXRsZSkge1xuXHRcdFxuXHRcdGxldCB2aWRlbyA9IFwiXCI7XG5cdFx0bGV0IGltYWdlID0gXCJcIjtcblx0XHRcblx0XHRzd2l0Y2godGhpcy5tZWRpYVR5cGUpIHtcblx0XHRcdGNhc2UgXCJpbWFnZS9qcGVnXCIgOlxuXHRcdFx0XHRpbWFnZSA9IHRoaXMubWVkaWFVcmw7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInZpZGVvL3F1aWNrdGltZVwiIDpcblx0XHRcdFx0dmlkZW8gPSB0aGlzLm1lZGlhVXJsO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRsZXQgbGl2ZXRpY2tlciA9IG5ldyBMaXZldGlja2VyKHRleHQsIG1pbnV0ZSwgaW1hZ2UsIHZpZGVvLCBpc1RpdGxlKTtcblx0XHRcblx0XHR0aGlzLmxpdmV0aWNrZXJTZXJ2aWNlLnBvc3REYXRhKGxpdmV0aWNrZXIsICgpID0+IHtcblx0XHRcdHRoaXMubGl2ZXRpY2tlclNlbnQgPSB0cnVlO1xuXHRcdFx0dGhpcy5jbGVhckZpZWxkcygpO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMubGl2ZXRpY2tlclNlbnQgPSBudWxsO1xuXHRcdFx0fSwgMjAwMCk7XG5cdFx0fSk7XG5cdH1cblxuXHRjbGVhckZpZWxkcygpIHtcblx0XHR0aGlzLnRleHQgPSBcIlwiO1xuXHRcdHRoaXMubWludXRlID0gbnVsbDtcblx0XHR0aGlzLm1lZGlhVXJsID0gXCJcIjtcblx0XHR0aGlzLmlzVGl0bGUgPSBmYWxzZTtcblx0fVxuXG59XG4iXX0=