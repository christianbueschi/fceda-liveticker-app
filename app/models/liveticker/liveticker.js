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
                function Liveticker(text, minute, image, isTitle) {
                    this.text = text;
                    this.minute = minute;
                    this.image = image;
                    this.isTitle = isTitle;
                }
                return Liveticker;
            }());
            exports_1("Liveticker", Liveticker);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZXRpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpdmV0aWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUNBOzs7Y0FHRTtZQUNGO2dCQU9DLG9CQUFZLElBQVksRUFBRSxNQUFjLEVBQUUsS0FBYSxFQUFFLE9BQWdCO29CQUN4RSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDeEIsQ0FBQztnQkFFRixpQkFBQztZQUFELENBQUMsQUFkRCxJQWNDO1lBZEQsbUNBY0MsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuLypcbiogUkVTVCBBUEkgTW9kZWwgTGl2ZXRpY2tlclxuKiBzZWU6IFxuKi9cbmV4cG9ydCBjbGFzcyBMaXZldGlja2VyIHtcblxuXHRwcml2YXRlIHRleHQ6IHN0cmluZztcblx0cHJpdmF0ZSBtaW51dGU6IE51bWJlcjtcblx0cHJpdmF0ZSBpbWFnZTogc3RyaW5nO1xuXHRwcml2YXRlIGlzVGl0bGU6IEJvb2xlYW47XG5cblx0Y29uc3RydWN0b3IodGV4dDogc3RyaW5nLCBtaW51dGU6IE51bWJlciwgaW1hZ2U6IHN0cmluZywgaXNUaXRsZTogQm9vbGVhbikge1xuXHRcdHRoaXMudGV4dCA9IHRleHQ7XG5cdFx0dGhpcy5taW51dGUgPSBtaW51dGU7XG5cdFx0dGhpcy5pbWFnZSA9IGltYWdlO1xuXHRcdHRoaXMuaXNUaXRsZSA9IGlzVGl0bGU7XG5cdH1cblxufVxuIl19