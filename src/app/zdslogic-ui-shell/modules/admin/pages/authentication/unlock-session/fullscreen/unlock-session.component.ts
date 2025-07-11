import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from 'app/zdslogic-ui-shell/@fuse/animations/public-api';
import { FuseAlertType } from 'app/zdslogic-ui-shell/@fuse/components/alert';

@Component({
    selector     : 'unlock-session-fullscreen',
    templateUrl  : './unlock-session.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class UnlockSessionFullscreenComponent implements OnInit
{
    @ViewChild('unlockSessionNgForm') unlockSessionNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    name: string = 'Brian Hughes';
    showAlert: boolean = false;
    unlockSessionForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.unlockSessionForm = this._formBuilder.group({
            name    : [
                {
                    value   : this.name,
                    disabled: true
                }
            ],
            password: ['', Validators.required]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Unlock
     */
    unlock(): void
    {
    }
}
