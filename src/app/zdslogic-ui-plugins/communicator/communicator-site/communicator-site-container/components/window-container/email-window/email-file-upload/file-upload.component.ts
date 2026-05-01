import { Component, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

import { FileUploadService } from '../core/services/file-upload.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
	@ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
	files: any[] = [];
	progress = { loaded: 0, total: 0 };

	constructor(
		private _location: Location,
		private uploadService: FileUploadService
	) { }

	/**
	 * on file drop handler
	 */
	onFileDropped($event): void {
		this.prepareFilesList($event);
	}

	/**
	 * handle file from browsing
	 */
	fileBrowseHandler(files): void {
		this.prepareFilesList(files);
	}

	/**
	 * Delete file from files list
	 *
	 * @param index (File index)
	 */
	deleteFile(index: number): void {
		if (this.files[index].progress < 100) {
			//console.log("Upload in progress.");
			return;
		}
		this.files.splice(index, 1);
	}

	/**
	 * Simulate the upload process
	 */
	uploadFilesSimulator(index: number): void {
		setTimeout(() => {
			if (index === this.files.length) {
				return;
			} else {
				const progressInterval = setInterval(() => {
					if (this.files[index].progress === 100) {
						clearInterval(progressInterval);
						this.uploadFilesSimulator(index + 1);
					} else {
						this.files[index].progress += 5;
					}
				}, 200);
			}
		}, 1000);
	}

	/**
	 * Convert Files list to normal array list
	 *
	 * @param files (Files List)
	 */
	prepareFilesList(files: Array<any>): void {
		for (const item of files) {
			item.progress = 0;
			this.files.push(item);
		}
		this.fileDropEl.nativeElement.value = '';
		this.uploadFilesSimulator(0);
	}

	/**
	 * format bytes
	 *
	 * @param bytes (File size in bytes)
	 * @param decimals (Decimals point)
	 */
	formatBytes(bytes, decimals = 2): string {
		if (bytes === 0) {
			return '0 Bytes';
		}
		const k = 1024;
		const dm = decimals <= 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	upload(): void {
		//var filedata = this.fileDropEl.nativeElement.files[0];
		const filedata = this.files[0];
		const formData = new FormData();
		formData.append('file', filedata);

		this.uploadService.upload(formData)
			.subscribe(
				(data: any) => {
					//console.log(data);
					if (data.type === 1 && data.loaded && data.total) {
						this.progress.loaded = data.loaded;
						this.progress.total = data.total;
					}
					else if (data.body) {
						//console.log("Data Uploaded");
						//console.log(data.body);
						this._location.back();
					}

				},
				(error) => {
					//this._errorHandlerService.handleError(error);
				});
	}
}

