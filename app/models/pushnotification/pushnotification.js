System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Pushnotification;
    return {
        setters:[],
        execute: function() {
            /*
            * REST API Model Onesignal
            * see: https://documentation.onesignal.com/docs/notifications-create-notification
            */
            Pushnotification = (function () {
                function Pushnotification(app_id, included_segments, data, contents) {
                    this.app_id = app_id;
                    this.included_segments = included_segments;
                    this.data = data;
                    this.contents = contents;
                }
                return Pushnotification;
            }());
            exports_1("Pushnotification", Pushnotification);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaG5vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInB1c2hub3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBOzs7Y0FHRTtZQUNGO2dCQU9DLDBCQUFZLE1BQWMsRUFBRSxpQkFBZ0MsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7b0JBQzNGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUNyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7b0JBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDMUIsQ0FBQztnQkFFRix1QkFBQztZQUFELENBQUMsQUFkRCxJQWNDO1lBZEQsK0NBY0MsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4qIFJFU1QgQVBJIE1vZGVsIE9uZXNpZ25hbFxuKiBzZWU6IGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5vbmVzaWduYWwuY29tL2RvY3Mvbm90aWZpY2F0aW9ucy1jcmVhdGUtbm90aWZpY2F0aW9uXG4qL1xuZXhwb3J0IGNsYXNzIFB1c2hub3RpZmljYXRpb24ge1xuXG5cdHByaXZhdGUgYXBwX2lkOiBTdHJpbmc7XG5cdHByaXZhdGUgaW5jbHVkZWRfc2VnbWVudHM6IEFycmF5PFN0cmluZz47XG5cdHByaXZhdGUgZGF0YTogT2JqZWN0O1xuXHRwcml2YXRlIGNvbnRlbnRzOiBPYmplY3Q7XG5cblx0Y29uc3RydWN0b3IoYXBwX2lkOiBTdHJpbmcsIGluY2x1ZGVkX3NlZ21lbnRzOiBBcnJheTxTdHJpbmc+LCBkYXRhOiBPYmplY3QsIGNvbnRlbnRzOiBPYmplY3QpIHtcblx0XHR0aGlzLmFwcF9pZCA9IGFwcF9pZDtcblx0XHR0aGlzLmluY2x1ZGVkX3NlZ21lbnRzID0gaW5jbHVkZWRfc2VnbWVudHM7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0XHR0aGlzLmNvbnRlbnRzID0gY29udGVudHM7XG5cdH1cblxufSJdfQ==