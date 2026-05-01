import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { GroupsService } from '../../core/services/groups.service';
import { Group } from '../../core/interfaces/group.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core//services/angular-log.service';

@Component({
    selector: 'app-group-create',
    templateUrl: './group-create.component.html',
    styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit {
    public groupForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
    private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

    // tslint:disable-next-line:max-line-length
    constructor(private _angularLogService: AngularLogService,private _location: Location, private _repository: GroupsService, private _dialog: MatDialog, private _errorHandlerService: ErrorHandlerService) { }

    ngOnInit(): void  {
        this.groupForm = new UntypedFormGroup({
            groupId: new FormControl(''),
            groupName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            groupDescription: new FormControl('', [Validators.required, Validators.maxLength(120)])

        });

        this.dialogConfig = {
            height: '200px',
            width: '400px',
            disableClose: true,
            data: {}
        };
    }

    public hasError(controlName: string, errorName: string): any {
        return this.groupForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._location.back();
    }

    public createGroup = (groupFormValue) => {
        if (this.groupForm.valid) {
            this.executeGroupCreation(groupFormValue);
        }
    }

    private executeGroupCreation = (groupFormValue) => {
        const group: Group = {
            groupId: '',
            groupName: groupFormValue.groupName,
            groupDescription: groupFormValue.groupDescription,

        };

        const apiUrl = 'group';
        this._repository.create(apiUrl, group)
            .subscribe((result) => {
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

}
