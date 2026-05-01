import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Group } from '../../core/interfaces/group.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../../core/services/groups.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'app/zdslogic-ui-base/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'app/zdslogic-ui-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-ui-base/core/services/angular-log.service';

@Component({
    selector: 'app-group-update',
    templateUrl: './group-update.component.html',
    styleUrls: ['./group-update.component.css']
})
export class GroupUpdateComponent implements OnInit {
    public group: Group;
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
    constructor(private _angularLogService: AngularLogService,private _location: Location, private _repository: GroupsService, private _dialog: MatDialog,
        _router: Router,
        private _activeRoute: ActivatedRoute, private _errorHandlerService: ErrorHandlerService) { }


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

        this.getGroupDetails();


    }
    private getGroupDetails = () => {
        const id: string = this._activeRoute.snapshot.params['id'];
        const apiUrl = `group/${id}`;

        this._repository.getData(apiUrl)
            .subscribe((result) => {
                this.group = result as Group;
                this.populateForm();
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                });
    }

    private populateForm() {
        this.groupForm.controls['groupId'].setValue(this.group.groupId);
        this.groupForm.controls['groupName'].setValue(this.group.groupName);
        this.groupForm.controls['groupDescription'].setValue(this.group.groupDescription);
    }

    public updateGroup = (groupFormValue) => {
        if (this.groupForm.valid) {
            this.executeGroupUpdate(groupFormValue);
        }
    }

    private executeGroupUpdate = (groupFormValue) => {
        const group: Group = {
            groupId: groupFormValue.groupId,
            groupName: groupFormValue.groupName,
            groupDescription: groupFormValue.groupDescription,
         };

        const apiUrl = 'group';
        this._repository.update(apiUrl, group)
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

    public hasError(controlName: string, errorName: string): any {
        return this.groupForm.controls[controlName].hasError(errorName);
    }

    public onCancel(): void {
        this._location.back();
    }

}
