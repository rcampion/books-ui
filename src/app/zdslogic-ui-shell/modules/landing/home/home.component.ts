import { Component, ViewEncapsulation } from '@angular/core';
import { DataSharingService } from 'app/zdslogic-ui-base/core/services/datasharing.service';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent
{
    isPortal = true;
    /**
     * Constructor
     */
    constructor(
        private dataSharingService: DataSharingService
    )
    {
    }

    togglePortal(): boolean {
		this.isPortal = !this.isPortal;
		this.dataSharingService.isPortal.next(this.isPortal);
		return false;
	}
}
