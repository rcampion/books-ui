import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector     : 'forms-wizards',
    templateUrl  : './wizards.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormsWizardsComponent implements OnInit
{
    horizontalStepperForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
    verticalStepperForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});

    /**
     * Constructor
     */
    constructor(private _formBuilder: UntypedFormBuilder)
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
        // Horizontal stepper form
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                email   : ['', [Validators.required, Validators.email]],
                country : ['', Validators.required],
                language: ['', Validators.required]
            }),
            step2: this._formBuilder.group({
                firstName: ['', Validators.required],
                lastName : ['', Validators.required],
                userName : ['', Validators.required],
                about    : ['']
            }),
            step3: this._formBuilder.group({
                byEmail          : this._formBuilder.group({
                    companyNews     : [true],
                    featuredProducts: [false],
                    messages        : [true]
                }),
                pushNotifications: ['everything', Validators.required]
            })
        });

        // Vertical stepper form
        this.verticalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                email   : ['', [Validators.required, Validators.email]],
                country : ['', Validators.required],
                language: ['', Validators.required]
            }),
            step2: this._formBuilder.group({
                firstName: ['', Validators.required],
                lastName : ['', Validators.required],
                userName : ['', Validators.required],
                about    : ['']
            }),
            step3: this._formBuilder.group({
                byEmail          : this._formBuilder.group({
                    companyNews     : [true],
                    featuredProducts: [false],
                    messages        : [true]
                }),
                pushNotifications: ['everything', Validators.required]
            })
        });
    }
}
