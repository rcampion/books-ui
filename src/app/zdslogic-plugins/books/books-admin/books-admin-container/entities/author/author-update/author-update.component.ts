import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { AuthorService } from '../../../../../core/services/author.service';
import { Author } from '../../../../../core/models/author.model';
import { SuccessDialogComponent } from '../../../../../../../zdslogic-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../../../../../zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from '../../../../../../../zdslogic-base/core/services/angular-log.service';

@Component({
    selector: 'app-author-update',
    templateUrl: './author-update.component.html',
    styleUrls: ['./author-update.component.scss']
})
export class AuthorUpdateComponent implements OnInit {
    public addressStatus: Author;
	public authorForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});

    private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

    // tslint:disable-next-line:max-line-length
    constructor(
		private _angularLogService: AngularLogService,
		private _location: Location,
		private _repository: AuthorService,
		private _dialog: MatDialog,
        private _router: Router,
        private _activeRoute: ActivatedRoute,
        private _errorHandlerService: ErrorHandlerService) { }


    ngOnInit(): void {

		this.authorForm = new UntypedFormGroup({
			statusId: new FormControl(''),
			addressStatus: new FormControl(''),
		});

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };

        this.getAuthorDetails();


    }
    private getAuthorDetails(): any {
        const id: string = this._activeRoute.snapshot.params['id'];
        const apiUrl = `addresss/${id}`;

        this._repository.getData(apiUrl)
            .subscribe((res) => {
                this.addressStatus = res as Author;
                this.populateForm();
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
    }

    private populateForm(): void {
			this.authorForm.controls['statusId'].setValue(this.addressStatus.authorId);
			this.authorForm.controls['addressStatus'].setValue(this.addressStatus.authorName);
    }

    public updateAuthor(authorFormValue): void {
        if (this.authorForm.valid) {
            this.executeAuthorUpdate(authorFormValue);
        }
    }

    private executeAuthorUpdate(authorFormValue): void {
        const address: Author = {
			authorId: authorFormValue.authorId,
			authorName: authorFormValue.authorName,
         };

        const apiUrl = 'books/address/status';
        this._repository.update(apiUrl, address)
            .subscribe((res) => {
                const dialogRef = this._dialog.open(SuccessDialogComponent, this.dialogConfig);

                // we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
                dialogRef.afterClosed()
                    .subscribe((result) => {
                        this._location.back();
                    });
            },
                ((error) => {
                    this._errorHandlerService.dialogConfig = { ...this.dialogConfig };
                    this._errorHandlerService.handleError(error);
                })
            );
    }

    public hasError(controlName: string, errorName: string): any {
        return this.authorForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._location.back();
    }

}
