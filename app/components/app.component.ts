import {Component, Injectable} from 'angular2/core';
import { Http, RequestOptions, Headers } from 'angular2/http';
import 'rxjs/add/operator/map';
import {LivetickerService} from '../providers/liveticker/liveticker';
import {PushnotificationService} from '../providers/pushnotification/pushnotification';
import {S3Service} from '../providers/s3/s3';
import {Liveticker} from '../models/liveticker/liveticker';
import {Pushnotification} from '../models/pushnotification/pushnotification';

@Component({
    selector: 'liveticker',
	templateUrl: './components/app.component.html',
	styleUrls: ['./components/app.component.css'],
	providers: [LivetickerService, PushnotificationService, S3Service]
})

@Injectable()
export class AppComponent {

	// View Props
	private text: string;
	private minute: Number;
	private imageUrl: string;
	private options: Array<Object>;
	private option: string;
	private isTitle: Boolean;
	private recipients: Number;
	private error: Boolean;
	private livetickerSent: Boolean;
	private loading: Boolean;
	private emptyText: Boolean;

	// Services
	private livetickerService: LivetickerService;
	private pushnotificationService: PushnotificationService;
	private s3Service: S3Service;

	constructor(private http: Http, livetickerService: LivetickerService, pushnotificationService: PushnotificationService, s3Service: S3Service) {

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

	onFormSubmit(text: string, minute: Number, option: string, isTitle: Boolean) {

		if(text) {
			switch(option) {
				case 'pushAndLiveticker': // Send to PNS Server and Liveticker Server
					this.createPushnotificationAndSend(text, minute);
					this.createLivetickerAndSend(text, minute, isTitle);
					break;
				case 'push': // Send to PNS Server
					this.createPushnotificationAndSend(text, minute);
					break;
				case 'liveticker' : // Send to Liveticker Server
					this.createLivetickerAndSend(text, minute, isTitle);
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

		let pushnotification = new Pushnotification(
			'0e694cca-15b1-42b5-817e-151c9f3a3d70',
			['All'],
			{ 'foo': 'bar' },
			{ 'en': text }
		);

		this.pushnotificationService.postData(pushnotification, (data) => {
			let body = JSON.parse(data._body);
			this.recipients = body.recipients;
			this.clearFields();
			setTimeout(() => {
				this.recipients = null;
			}, 2000);
		});
	}

	createLivetickerAndSend(text, minute, isTitle) {

		let image = (this.imageUrl) ? this.imageUrl : "";

		let liveticker = new Liveticker(text, minute, image, isTitle);
		
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
