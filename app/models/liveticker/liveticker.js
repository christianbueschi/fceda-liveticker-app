System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Liveticker;
    return {
        setters:[],
        execute: function() {
            /*
            * REST API Model Liveticker
            * see:
            */
            Liveticker = (function () {
                function Liveticker(text, minute, image, video, isTitle) {
                    this.text = text;
                    this.minute = minute;
                    this.image = image;
                    this.video = video;
                    this.isTitle = isTitle;
                }
                return Liveticker;
            }());
            exports_1("Liveticker", Liveticker);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZXRpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpdmV0aWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUNBOzs7Y0FHRTtZQUNGO2dCQVFDLG9CQUFZLElBQVksRUFBRSxNQUFjLEVBQUUsS0FBYSxFQUFFLEtBQWEsRUFBRSxPQUFnQjtvQkFDdkYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN4QixDQUFDO2dCQUVGLGlCQUFDO1lBQUQsQ0FBQyxBQWhCRCxJQWdCQztZQWhCRCxtQ0FnQkMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuLypcbiogUkVTVCBBUEkgTW9kZWwgTGl2ZXRpY2tlclxuKiBzZWU6IFxuKi9cbmV4cG9ydCBjbGFzcyBMaXZldGlja2VyIHtcblxuXHRwcml2YXRlIHRleHQ6IHN0cmluZztcblx0cHJpdmF0ZSBtaW51dGU6IE51bWJlcjtcblx0cHJpdmF0ZSBpbWFnZTogc3RyaW5nO1xuXHRwcml2YXRlIHZpZGVvOiBzdHJpbmc7XG5cdHByaXZhdGUgaXNUaXRsZTogQm9vbGVhbjtcblxuXHRjb25zdHJ1Y3Rvcih0ZXh0OiBzdHJpbmcsIG1pbnV0ZTogTnVtYmVyLCBpbWFnZTogc3RyaW5nLCB2aWRlbzogc3RyaW5nLCBpc1RpdGxlOiBCb29sZWFuKSB7XG5cdFx0dGhpcy50ZXh0ID0gdGV4dDtcblx0XHR0aGlzLm1pbnV0ZSA9IG1pbnV0ZTtcblx0XHR0aGlzLmltYWdlID0gaW1hZ2U7XG5cdFx0dGhpcy52aWRlbyA9IHZpZGVvO1xuXHRcdHRoaXMuaXNUaXRsZSA9IGlzVGl0bGU7XG5cdH1cblxufVxuIl19