/*
* REST API Model Onesignal
* see: https://documentation.onesignal.com/docs/notifications-create-notification
*/
export class Pushnotification {

	private app_id: String;
	private included_segments: Array<String>;
	private data: Object;
	private contents: Object;

	constructor(app_id: String, included_segments: Array<String>, data: Object, contents: Object) {
		this.app_id = app_id;
		this.included_segments = included_segments;
		this.data = data;
		this.contents = contents;
	}

}