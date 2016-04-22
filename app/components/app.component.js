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
                    }, function (url) {
                        _this.imageUrl = url;
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
                    var image = (this.imageUrl) ? this.imageUrl : "";
                    var liveticker = new liveticker_2.Liveticker(text, minute, image, isTitle);
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
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaUJBO2dCQW9CQyxzQkFBb0IsSUFBVSxFQUFFLGlCQUFvQyxFQUFFLHVCQUFnRCxFQUFFLFNBQW9CO29CQUF4SCxTQUFJLEdBQUosSUFBSSxDQUFNO29CQUU3QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBRXJCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO29CQUN2RCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFFM0IsSUFBSSxDQUFDLE9BQU8sR0FBRzt3QkFDZDs0QkFDQyxHQUFHLEVBQUUsbUJBQW1COzRCQUN4QixLQUFLLEVBQUUsbUJBQW1CO3lCQUMxQjt3QkFDRDs0QkFDQyxHQUFHLEVBQUUsTUFBTTs0QkFDWCxLQUFLLEVBQUUsV0FBVzt5QkFDbEI7d0JBQ0Q7NEJBQ0MsR0FBRyxFQUFFLFlBQVk7NEJBQ2pCLEtBQUssRUFBRSxpQkFBaUI7eUJBQ3hCO3FCQUNELENBQUM7b0JBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQztnQkFDbkMsQ0FBQztnQkFFRCxtQ0FBWSxHQUFaLFVBQWEsTUFBTTtvQkFBbkIsaUJBV0M7b0JBVkEsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFD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QzNDLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO3dCQUMzQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ25CLFVBQVUsQ0FBQzs0QkFDVixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzt3QkFDNUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNWLENBQUMsQ0FBQyxDQUFDO2dCQUNKLENBQUM7Z0JBRUQsa0NBQVcsR0FBWDtvQkFDQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLENBQUM7Z0JBeElGO29CQUFDLGdCQUFTLENBQUM7d0JBQ1AsUUFBUSxFQUFFLFlBQVk7d0JBQ3pCLFdBQVcsRUFBRSxpQ0FBaUM7d0JBQzlDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO3dCQUM3QyxTQUFTLEVBQUUsQ0FBQyw4QkFBaUIsRUFBRSwwQ0FBdUIsRUFBRSxjQUFTLENBQUM7cUJBQ2xFLENBQUM7b0JBRUQsaUJBQVUsRUFBRTs7Z0NBQUE7Z0JBbUliLG1CQUFDO1lBQUQsQ0FBQyxBQWxJRCxJQWtJQztZQWxJRCx1Q0FrSUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlcXVlc3RPcHRpb25zLCBIZWFkZXJzIH0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQge0xpdmV0aWNrZXJTZXJ2aWNlfSBmcm9tICcuLi9wcm92aWRlcnMvbGl2ZXRpY2tlci9saXZldGlja2VyJztcbmltcG9ydCB7UHVzaG5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJy4uL3Byb3ZpZGVycy9wdXNobm90aWZpY2F0aW9uL3B1c2hub3RpZmljYXRpb24nO1xuaW1wb3J0IHtTM1NlcnZpY2V9IGZyb20gJy4uL3Byb3ZpZGVycy9zMy9zMyc7XG5pbXBvcnQge0xpdmV0aWNrZXJ9IGZyb20gJy4uL21vZGVscy9saXZldGlja2VyL2xpdmV0aWNrZXInO1xuaW1wb3J0IHtQdXNobm90aWZpY2F0aW9ufSBmcm9tICcuLi9tb2RlbHMvcHVzaG5vdGlmaWNhdGlvbi9wdXNobm90aWZpY2F0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsaXZldGlja2VyJyxcblx0dGVtcGxhdGVVcmw6ICcuL2NvbXBvbmVudHMvYXBwLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vY29tcG9uZW50cy9hcHAuY29tcG9uZW50LmNzcyddLFxuXHRwcm92aWRlcnM6IFtMaXZldGlja2VyU2VydmljZSwgUHVzaG5vdGlmaWNhdGlvblNlcnZpY2UsIFMzU2VydmljZV1cbn0pXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuXG5cdC8vIFZpZXcgUHJvcHNcblx0cHJpdmF0ZSB0ZXh0OiBzdHJpbmc7XG5cdHByaXZhdGUgbWludXRlOiBOdW1iZXI7XG5cdHByaXZhdGUgaW1hZ2VVcmw6IHN0cmluZztcblx0cHJpdmF0ZSBvcHRpb25zOiBBcnJheTxPYmplY3Q+O1xuXHRwcml2YXRlIG9wdGlvbjogc3RyaW5nO1xuXHRwcml2YXRlIGlzVGl0bGU6IEJvb2xlYW47XG5cdHByaXZhdGUgcmVjaXBpZW50czogTnVtYmVyO1xuXHRwcml2YXRlIGVycm9yOiBCb29sZWFuO1xuXHRwcml2YXRlIGxpdmV0aWNrZXJTZW50OiBCb29sZWFuO1xuXHRwcml2YXRlIGxvYWRpbmc6IEJvb2xlYW47XG5cdHByaXZhdGUgZW1wdHlUZXh0OiBCb29sZWFuO1xuXG5cdC8vIFNlcnZpY2VzXG5cdHByaXZhdGUgbGl2ZXRpY2tlclNlcnZpY2U6IExpdmV0aWNrZXJTZXJ2aWNlO1xuXHRwcml2YXRlIHB1c2hub3RpZmljYXRpb25TZXJ2aWNlOiBQdXNobm90aWZpY2F0aW9uU2VydmljZTtcblx0cHJpdmF0ZSBzM1NlcnZpY2U6IFMzU2VydmljZTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIGxpdmV0aWNrZXJTZXJ2aWNlOiBMaXZldGlja2VyU2VydmljZSwgcHVzaG5vdGlmaWNhdGlvblNlcnZpY2U6IFB1c2hub3RpZmljYXRpb25TZXJ2aWNlLCBzM1NlcnZpY2U6IFMzU2VydmljZSkge1xuXG5cdFx0dGhpcy5lcnJvciA9IGZhbHNlO1xuXHRcdHRoaXMuZW1wdHlUZXh0ID0gZmFsc2U7XG5cdFx0dGhpcy5saXZldGlja2VyU2VudCA9IGZhbHNlO1xuXHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdHRoaXMuaXNUaXRsZSA9IGZhbHNlO1xuXG5cdFx0dGhpcy5saXZldGlja2VyU2VydmljZSA9IGxpdmV0aWNrZXJTZXJ2aWNlO1xuXHRcdHRoaXMucHVzaG5vdGlmaWNhdGlvblNlcnZpY2UgPSBwdXNobm90aWZpY2F0aW9uU2VydmljZTtcblx0XHR0aGlzLnMzU2VydmljZSA9IHMzU2VydmljZTtcblxuXHRcdHRoaXMub3B0aW9ucyA9IFtcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAncHVzaEFuZExpdmV0aWNrZXInLFxuXHRcdFx0XHR0aXRsZTogJ1B1c2ggJiBMaXZldGlja2VyJ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAncHVzaCcsXG5cdFx0XHRcdHRpdGxlOiAnT25seSBQdXNoJ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnbGl2ZXRpY2tlcicsXG5cdFx0XHRcdHRpdGxlOiAnT25seSBMaXZldGlja2VyJ1xuXHRcdFx0fVxuXHRcdF07XG5cblx0XHR0aGlzLm9wdGlvbiA9ICdwdXNoQW5kTGl2ZXRpY2tlcic7XG5cdH1cblxuXHRvbkNoYW5nZUZpbGUoJGV2ZW50KSB7XG5cdFx0bGV0IGZpbGUgPSAkZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xuXHRcdHRoaXMuczNTZXJ2aWNlLnJldHJpZXZlU2lnblJlcXVlc3RBbmRVcGxvYWQoXG5cdFx0XHRmaWxlLFxuXHRcdFx0KCkgPT4ge1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXHRcdFx0fSxcblx0XHRcdCh1cmwpID0+IHtcblx0XHRcdFx0dGhpcy5pbWFnZVVybCA9IHVybDtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9KTtcblx0fVxuXG5cdG9uRm9ybVN1Ym1pdCh0ZXh0OiBzdHJpbmcsIG1pbnV0ZTogTnVtYmVyLCBvcHRpb246IHN0cmluZywgaXNUaXRsZTogQm9vbGVhbikge1xuXG5cdFx0aWYodGV4dCkge1xuXHRcdFx0c3dpdGNoKG9wdGlvbikge1xuXHRcdFx0XHRjYXNlICdwdXNoQW5kTGl2ZXRpY2tlcic6IC8vIFNlbmQgdG8gUE5TIFNlcnZlciBhbmQgTGl2ZXRpY2tlciBTZXJ2ZXJcblx0XHRcdFx0XHR0aGlzLmNyZWF0ZVB1c2hub3RpZmljYXRpb25BbmRTZW5kKHRleHQsIG1pbnV0ZSk7XG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVMaXZldGlja2VyQW5kU2VuZCh0ZXh0LCBtaW51dGUsIGlzVGl0bGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdwdXNoJzogLy8gU2VuZCB0byBQTlMgU2VydmVyXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVQdXNobm90aWZpY2F0aW9uQW5kU2VuZCh0ZXh0LCBtaW51dGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdsaXZldGlja2VyJyA6IC8vIFNlbmQgdG8gTGl2ZXRpY2tlciBTZXJ2ZXJcblx0XHRcdFx0XHR0aGlzLmNyZWF0ZUxpdmV0aWNrZXJBbmRTZW5kKHRleHQsIG1pbnV0ZSwgaXNUaXRsZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZW1wdHlUZXh0ID0gdHJ1ZTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmVtcHR5VGV4dCA9IGZhbHNlO1xuXHRcdFx0fSwgMjAwMCk7XG5cdFx0fVx0XHRcdFxuXHR9XG5cblx0Y3JlYXRlUHVzaG5vdGlmaWNhdGlvbkFuZFNlbmQodGV4dCwgbWludXRlKSB7XG5cblx0XHRpZihtaW51dGUpIHtcblx0XHRcdHRleHQgPSBtaW51dGUgKyAnLiBTcGllbG1pbnV0ZTogJyArIHRleHQ7XG5cdFx0fVxuXG5cdFx0bGV0IHB1c2hub3RpZmljYXRpb24gPSBuZXcgUHVzaG5vdGlmaWNhdGlvbihcblx0XHRcdCcwZTY5NGNjYS0xNWIxLTQyYjUtODE3ZS0xNTFjOWYzYTNkNzAnLFxuXHRcdFx0WydBbGwnXSxcblx0XHRcdHsgJ2Zvbyc6ICdiYXInIH0sXG5cdFx0XHR7ICdlbic6IHRleHQgfVxuXHRcdCk7XG5cblx0XHR0aGlzLnB1c2hub3RpZmljYXRpb25TZXJ2aWNlLnBvc3REYXRhKHB1c2hub3RpZmljYXRpb24sIChkYXRhKSA9PiB7XG5cdFx0XHRsZXQgYm9keSA9IEpTT04ucGFyc2UoZGF0YS5fYm9keSk7XG5cdFx0XHR0aGlzLnJlY2lwaWVudHMgPSBib2R5LnJlY2lwaWVudHM7XG5cdFx0XHR0aGlzLmNsZWFyRmllbGRzKCk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5yZWNpcGllbnRzID0gbnVsbDtcblx0XHRcdH0sIDIwMDApO1xuXHRcdH0pO1xuXHR9XG5cblx0Y3JlYXRlTGl2ZXRpY2tlckFuZFNlbmQodGV4dCwgbWludXRlLCBpc1RpdGxlKSB7XG5cblx0XHRsZXQgaW1hZ2UgPSAodGhpcy5pbWFnZVVybCkgPyB0aGlzLmltYWdlVXJsIDogXCJcIjtcblxuXHRcdGxldCBsaXZldGlja2VyID0gbmV3IExpdmV0aWNrZXIodGV4dCwgbWludXRlLCBpbWFnZSwgaXNUaXRsZSk7XG5cdFx0XG5cdFx0dGhpcy5saXZldGlja2VyU2VydmljZS5wb3N0RGF0YShsaXZldGlja2VyLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmxpdmV0aWNrZXJTZW50ID0gdHJ1ZTtcblx0XHRcdHRoaXMuY2xlYXJGaWVsZHMoKTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmxpdmV0aWNrZXJTZW50ID0gbnVsbDtcblx0XHRcdH0sIDIwMDApO1xuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXJGaWVsZHMoKSB7XG5cdFx0dGhpcy50ZXh0ID0gXCJcIjtcblx0XHR0aGlzLm1pbnV0ZSA9IG51bGw7XG5cdFx0dGhpcy5pbWFnZVVybCA9IFwiXCI7XG5cdH1cblxufVxuIl19