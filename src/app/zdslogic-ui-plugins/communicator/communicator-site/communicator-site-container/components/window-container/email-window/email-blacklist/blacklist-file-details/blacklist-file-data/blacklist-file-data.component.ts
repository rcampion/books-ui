import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

//import { File } from 'app/zdslogic-ui-base/core/models/file.model';
import { EMailBlacklistFile } from '../../../core/models/email-blacklist-file.model';

import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';

import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
	selector: 'app-blacklist-file-data',
	templateUrl: './blacklist-file-data.component.html',
	styleUrls: ['./blacklist-file-data.component.scss']
})
export class BlacklistFileDataComponent implements OnInit, AfterViewInit, AfterContentInit {
	@Input() public file: EMailBlacklistFile;
	public selectOptions = [{ name: 'Show', value: 'show' }, { name: `Don't Show`, value: '' }];
	@Output() selectEmitt = new EventEmitter();

	//public emailForm: FormGroup;

	//pdfSource = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
	pdfSource: string;

	skillsText: string;

	constructor(
		private _angularLogService: AngularLogService,
		private _dataSharingService: DataSharingService,
		private changeDetectorRefs: ChangeDetectorRef,
		private _router: Router,
		private _location: Location) {

	}

	ngAfterContentInit(): void {
		this.changeDetectorRefs.detectChanges();

		//this.pdfSource = this.file.pdfFileName;

	}

	ngOnInit(): void {

		this.changeDetectorRefs.detectChanges();

	}

	ngAfterViewInit(): void {
		//this.emailForm.controls['whoisTxt'].setValue(this.file.jsonFile);

		//this.pdfSource = this.file.pdfFileName

		//this.pdfSource = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

	}

	public onChange(event): any {
		this.selectEmitt.emit(event.value);
	}

	public onCancel(): void {

		const locationUrl = '/my-emails';
		///contacts/details/${this.contact.contactId'
		this._location.go(locationUrl);

		//this._location.back();
		this._router.navigateByUrl(locationUrl);
	}
}
