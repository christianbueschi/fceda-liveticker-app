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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaUJBO2dCQW9CQyxzQkFBb0IsSUFBVSxFQUFFLGlCQUFvQyxFQUFFLHVCQUFnRCxFQUFFLFNBQW9CO29CQUF4SCxTQUFJLEdBQUosSUFBSSxDQUFNO29CQUU3QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBRXJCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO29CQUN2RCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFFM0IsSUFBSSxDQUFDLE9BQU8sR0FBRzt3QkFDZDs0QkFDQyxHQUFHLEVBQUUsbUJBQW1COzRCQUN4QixLQUFLLEVBQUUsbUJBQW1CO3lCQUMxQjt3QkFDRDs0QkFDQyxHQUFHLEVBQUUsTUFBTTs0QkFDWCxLQUFLLEVBQUUsV0FBVzt5QkFDbEI7d0JBQ0Q7NEJBQ0MsR0FBRyxFQUFFLFlBQVk7NEJBQ2pCLEtBQUssRUFBRSxpQkFBaUI7eUJBQ3hCO3FCQUNELENBQUM7b0JBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQztnQkFDbkMsQ0FBQztnQkFFRCxtQ0FBWSxHQUFaLFVBQWEsTUFBTTtvQkFBbkIsaUJBV0M7b0JBVkEsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFD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QzNDLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO3dCQUMzQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ25CLFVBQVUsQ0FBQzs0QkFDVixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzt3QkFDNUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNWLENBQUMsQ0FBQyxDQUFDO2dCQUNKLENBQUM7Z0JBRUQsa0NBQVcsR0FBWDtvQkFDQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixDQUFDO2dCQXpJRjtvQkFBQyxnQkFBUyxDQUFDO3dCQUNQLFFBQVEsRUFBRSxZQUFZO3dCQUN6QixXQUFXLEVBQUUsaUNBQWlDO3dCQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQzt3QkFDN0MsU0FBUyxFQUFFLENBQUMsOEJBQWlCLEVBQUUsMENBQXVCLEVBQUUsY0FBUyxDQUFDO3FCQUNsRSxDQUFDO29CQUVELGlCQUFVLEVBQUU7O2dDQUFBO2dCQW9JYixtQkFBQztZQUFELENBQUMsQUFuSUQsSUFtSUM7WUFuSUQsdUNBbUlDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQgeyBIdHRwLCBSZXF1ZXN0T3B0aW9ucywgSGVhZGVycyB9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0IHtMaXZldGlja2VyU2VydmljZX0gZnJvbSAnLi4vcHJvdmlkZXJzL2xpdmV0aWNrZXIvbGl2ZXRpY2tlcic7XG5pbXBvcnQge1B1c2hub3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tICcuLi9wcm92aWRlcnMvcHVzaG5vdGlmaWNhdGlvbi9wdXNobm90aWZpY2F0aW9uJztcbmltcG9ydCB7UzNTZXJ2aWNlfSBmcm9tICcuLi9wcm92aWRlcnMvczMvczMnO1xuaW1wb3J0IHtMaXZldGlja2VyfSBmcm9tICcuLi9tb2RlbHMvbGl2ZXRpY2tlci9saXZldGlja2VyJztcbmltcG9ydCB7UHVzaG5vdGlmaWNhdGlvbn0gZnJvbSAnLi4vbW9kZWxzL3B1c2hub3RpZmljYXRpb24vcHVzaG5vdGlmaWNhdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGl2ZXRpY2tlcicsXG5cdHRlbXBsYXRlVXJsOiAnLi9jb21wb25lbnRzL2FwcC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2NvbXBvbmVudHMvYXBwLmNvbXBvbmVudC5jc3MnXSxcblx0cHJvdmlkZXJzOiBbTGl2ZXRpY2tlclNlcnZpY2UsIFB1c2hub3RpZmljYXRpb25TZXJ2aWNlLCBTM1NlcnZpY2VdXG59KVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcblxuXHQvLyBWaWV3IFByb3BzXG5cdHByaXZhdGUgdGV4dDogc3RyaW5nO1xuXHRwcml2YXRlIG1pbnV0ZTogTnVtYmVyO1xuXHRwcml2YXRlIGltYWdlVXJsOiBzdHJpbmc7XG5cdHByaXZhdGUgb3B0aW9uczogQXJyYXk8T2JqZWN0Pjtcblx0cHJpdmF0ZSBvcHRpb246IHN0cmluZztcblx0cHJpdmF0ZSBpc1RpdGxlOiBCb29sZWFuO1xuXHRwcml2YXRlIHJlY2lwaWVudHM6IE51bWJlcjtcblx0cHJpdmF0ZSBlcnJvcjogQm9vbGVhbjtcblx0cHJpdmF0ZSBsaXZldGlja2VyU2VudDogQm9vbGVhbjtcblx0cHJpdmF0ZSBsb2FkaW5nOiBCb29sZWFuO1xuXHRwcml2YXRlIGVtcHR5VGV4dDogQm9vbGVhbjtcblxuXHQvLyBTZXJ2aWNlc1xuXHRwcml2YXRlIGxpdmV0aWNrZXJTZXJ2aWNlOiBMaXZldGlja2VyU2VydmljZTtcblx0cHJpdmF0ZSBwdXNobm90aWZpY2F0aW9uU2VydmljZTogUHVzaG5vdGlmaWNhdGlvblNlcnZpY2U7XG5cdHByaXZhdGUgczNTZXJ2aWNlOiBTM1NlcnZpY2U7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBsaXZldGlja2VyU2VydmljZTogTGl2ZXRpY2tlclNlcnZpY2UsIHB1c2hub3RpZmljYXRpb25TZXJ2aWNlOiBQdXNobm90aWZpY2F0aW9uU2VydmljZSwgczNTZXJ2aWNlOiBTM1NlcnZpY2UpIHtcblxuXHRcdHRoaXMuZXJyb3IgPSBmYWxzZTtcblx0XHR0aGlzLmVtcHR5VGV4dCA9IGZhbHNlO1xuXHRcdHRoaXMubGl2ZXRpY2tlclNlbnQgPSBmYWxzZTtcblx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHR0aGlzLmlzVGl0bGUgPSBmYWxzZTtcblxuXHRcdHRoaXMubGl2ZXRpY2tlclNlcnZpY2UgPSBsaXZldGlja2VyU2VydmljZTtcblx0XHR0aGlzLnB1c2hub3RpZmljYXRpb25TZXJ2aWNlID0gcHVzaG5vdGlmaWNhdGlvblNlcnZpY2U7XG5cdFx0dGhpcy5zM1NlcnZpY2UgPSBzM1NlcnZpY2U7XG5cblx0XHR0aGlzLm9wdGlvbnMgPSBbXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3B1c2hBbmRMaXZldGlja2VyJyxcblx0XHRcdFx0dGl0bGU6ICdQdXNoICYgTGl2ZXRpY2tlcidcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3B1c2gnLFxuXHRcdFx0XHR0aXRsZTogJ09ubHkgUHVzaCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2xpdmV0aWNrZXInLFxuXHRcdFx0XHR0aXRsZTogJ09ubHkgTGl2ZXRpY2tlcidcblx0XHRcdH1cblx0XHRdO1xuXG5cdFx0dGhpcy5vcHRpb24gPSAncHVzaEFuZExpdmV0aWNrZXInO1xuXHR9XG5cblx0b25DaGFuZ2VGaWxlKCRldmVudCkge1xuXHRcdGxldCBmaWxlID0gJGV2ZW50LnRhcmdldC5maWxlc1swXTtcblx0XHR0aGlzLnMzU2VydmljZS5yZXRyaWV2ZVNpZ25SZXF1ZXN0QW5kVXBsb2FkKFxuXHRcdFx0ZmlsZSxcblx0XHRcdCgpID0+IHtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHQodXJsKSA9PiB7XG5cdFx0XHRcdHRoaXMuaW1hZ2VVcmwgPSB1cmw7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRvbkZvcm1TdWJtaXQodGV4dDogc3RyaW5nLCBtaW51dGU6IE51bWJlciwgb3B0aW9uOiBzdHJpbmcsIGlzVGl0bGU6IEJvb2xlYW4pIHtcblxuXHRcdGlmKHRleHQpIHtcblx0XHRcdHN3aXRjaChvcHRpb24pIHtcblx0XHRcdFx0Y2FzZSAncHVzaEFuZExpdmV0aWNrZXInOiAvLyBTZW5kIHRvIFBOUyBTZXJ2ZXIgYW5kIExpdmV0aWNrZXIgU2VydmVyXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVQdXNobm90aWZpY2F0aW9uQW5kU2VuZCh0ZXh0LCBtaW51dGUpO1xuXHRcdFx0XHRcdHRoaXMuY3JlYXRlTGl2ZXRpY2tlckFuZFNlbmQodGV4dCwgbWludXRlLCBpc1RpdGxlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAncHVzaCc6IC8vIFNlbmQgdG8gUE5TIFNlcnZlclxuXHRcdFx0XHRcdHRoaXMuY3JlYXRlUHVzaG5vdGlmaWNhdGlvbkFuZFNlbmQodGV4dCwgbWludXRlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnbGl2ZXRpY2tlcicgOiAvLyBTZW5kIHRvIExpdmV0aWNrZXIgU2VydmVyXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVMaXZldGlja2VyQW5kU2VuZCh0ZXh0LCBtaW51dGUsIGlzVGl0bGUpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmVtcHR5VGV4dCA9IHRydWU7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5lbXB0eVRleHQgPSBmYWxzZTtcblx0XHRcdH0sIDIwMDApO1xuXHRcdH1cdFx0XHRcblx0fVxuXG5cdGNyZWF0ZVB1c2hub3RpZmljYXRpb25BbmRTZW5kKHRleHQsIG1pbnV0ZSkge1xuXG5cdFx0aWYobWludXRlKSB7XG5cdFx0XHR0ZXh0ID0gbWludXRlICsgJy4gU3BpZWxtaW51dGU6ICcgKyB0ZXh0O1xuXHRcdH1cblxuXHRcdGxldCBwdXNobm90aWZpY2F0aW9uID0gbmV3IFB1c2hub3RpZmljYXRpb24oXG5cdFx0XHQnMGU2OTRjY2EtMTViMS00MmI1LTgxN2UtMTUxYzlmM2EzZDcwJyxcblx0XHRcdFsnQWxsJ10sXG5cdFx0XHR7ICdmb28nOiAnYmFyJyB9LFxuXHRcdFx0eyAnZW4nOiB0ZXh0IH1cblx0XHQpO1xuXG5cdFx0dGhpcy5wdXNobm90aWZpY2F0aW9uU2VydmljZS5wb3N0RGF0YShwdXNobm90aWZpY2F0aW9uLCAoZGF0YSkgPT4ge1xuXHRcdFx0bGV0IGJvZHkgPSBKU09OLnBhcnNlKGRhdGEuX2JvZHkpO1xuXHRcdFx0dGhpcy5yZWNpcGllbnRzID0gYm9keS5yZWNpcGllbnRzO1xuXHRcdFx0dGhpcy5jbGVhckZpZWxkcygpO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMucmVjaXBpZW50cyA9IG51bGw7XG5cdFx0XHR9LCAyMDAwKTtcblx0XHR9KTtcblx0fVxuXG5cdGNyZWF0ZUxpdmV0aWNrZXJBbmRTZW5kKHRleHQsIG1pbnV0ZSwgaXNUaXRsZSkge1xuXG5cdFx0bGV0IGltYWdlID0gKHRoaXMuaW1hZ2VVcmwpID8gdGhpcy5pbWFnZVVybCA6IFwiXCI7XG5cblx0XHRsZXQgbGl2ZXRpY2tlciA9IG5ldyBMaXZldGlja2VyKHRleHQsIG1pbnV0ZSwgaW1hZ2UsIGlzVGl0bGUpO1xuXHRcdFxuXHRcdHRoaXMubGl2ZXRpY2tlclNlcnZpY2UucG9zdERhdGEobGl2ZXRpY2tlciwgKCkgPT4ge1xuXHRcdFx0dGhpcy5saXZldGlja2VyU2VudCA9IHRydWU7XG5cdFx0XHR0aGlzLmNsZWFyRmllbGRzKCk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5saXZldGlja2VyU2VudCA9IG51bGw7XG5cdFx0XHR9LCAyMDAwKTtcblx0XHR9KTtcblx0fVxuXG5cdGNsZWFyRmllbGRzKCkge1xuXHRcdHRoaXMudGV4dCA9IFwiXCI7XG5cdFx0dGhpcy5taW51dGUgPSBudWxsO1xuXHRcdHRoaXMuaW1hZ2VVcmwgPSBcIlwiO1xuXHRcdHRoaXMuaXNUaXRsZSA9IGZhbHNlO1xuXHR9XG5cbn1cbiJdfQ==