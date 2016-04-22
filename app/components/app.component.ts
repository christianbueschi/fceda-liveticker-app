import {Component, Injectable} from 'angular2/core';
import { Http, RequestOptions, Headers } from 'angular2/http';
import 'rxjs/add/operator/map';
import {LivetickerService} from '../providers/liveticker/liveticker';
import {PushnotificationService} from '../providers/pushnotification/pushnotification';
import {S3Service} from '../providers/s3/s3';

@Component({
    selector: 'liveticker',
	templateUrl: './components/app.component.html',
	styleUrls: ['./components/app.component.css'],
	providers: [LivetickerService, PushnotificationService, S3Service]
})

@Injectable()
export class AppComponent {

	private text: string;
	private minute: Number;
	private image: Object;
	private option: string;
	private imageUrl: string;

	private livetickerService: LivetickerService;
	private pushnotificationService: PushnotificationService;
	private s3Service: S3Service;
	
	private recipients: Number;
	private error: Boolean;
	private livetickerSent: Boolean;
	private loading: Boolean;
	private emptyText: Boolean;

	private options: Array<Object>;

	constructor(private http: Http, livetickerService: LivetickerService, pushnotificationService: PushnotificationService, s3Service: S3Service) {

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

	onChangeFile($event) {
		let file = $event.target.files[0];
		this.s3Service.retrieveSignRequestAndUpload(
			file,
			() => {
				this.loading = true;
			},
			(url) => {
				this.imageUrl = url;
				this.loading = false;
			});
	}

	onload() {

	}

	onFormSubmit(text: string, minute: Number, option: string) {

		if(text) {
			switch(option) {
				case 'pushAndLiveticker': // Send to PNS Server and Liveticker Server
					this.createPushnotificationAndSend(text, minute);
					this.createLivetickerAndSend(text, minute);
					break;
				case 'push': // Send to PNS Server
					this.createPushnotificationAndSend(text, minute);
					break;
				case 'liveticker' : // Send to Liveticker Server
					this.createLivetickerAndSend(text, minute);
					break;
			}
		} else {
			this.emptyText = true;
			setTimeout(() => {
				this.emptyText = false;
			}, 2000);
		}			
	}

	createPushnotificationAndSend(text, minute) {

		if(minute) {
			text = minute + '. Spielminute: ' + text;
		}

		let message = new Message(
			'0e694cca-15b1-42b5-817e-151c9f3a3d70',
			['All'],
			{ 'foo': 'bar' },
			{ 'en': text }
		);

		this.pushnotificationService.postData(message, (data) => {
			let body = JSON.parse(data._body);
			this.recipients = body.recipients;
			this.clearFields();
			setTimeout(() => {
				this.recipients = null;
			}, 2000);
		});
	}

	createLivetickerAndSend(text, minute) {

		let image = (this.imageUrl) ? this.imageUrl : "";

		let liveticker = new Liveticker(text, minute, image);
		
		this.livetickerService.postData(liveticker, () => {
			this.livetickerSent = true;
			this.clearFields();
			setTimeout(() => {
				this.livetickerSent = null;
			}, 2000);
		});
	}

	clearFields() {
		this.text = "";
		this.minute = null;
		this.imageUrl = "";
	}


}

/*
* REST API Model Onesignal
* see: https://documentation.onesignal.com/docs/notifications-create-notification
*/
export class Message {

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

/*
* REST API Model Liveticker
* see: 
*/
export class Liveticker {

	private text: string;
	private minute: Number;
	private image: string;

	constructor(text: string, minute: Number, image: string) {
		this.text = text;
		this.minute = minute;
		this.image = image;
	}

}
