import { Injectable } from '@angular/core';

import { AngularLogPublisher, AngularLogConsole } from './angular-log-publishers';
import { AppLogsService } from './applogs.service';

// ****************************************************
// Logging Publishers Service Class
// ****************************************************
@Injectable()
export class AngularLogPublishersService {

	// Public properties
	public publishers: AngularLogPublisher[] = [];

	constructor(
		private _repository: AppLogsService
	) {
		// Build publishers arrays
		this.buildPublishers();
	}

	// *************************
	// Public methods
	// *************************

	// Build publishers array
	public buildPublishers(): void {
		// Create instance of LogConsole Class
		this.publishers.push(new AngularLogConsole(this._repository));
	}
}
