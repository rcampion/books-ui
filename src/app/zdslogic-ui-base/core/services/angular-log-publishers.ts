﻿import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { throwError } from 'rxjs';

import { AngularLogEntry } from './angular-log.service';
import { AppLogsService } from './applogs.service';

// ****************************************************
// Log Publisher Abstract Class
// NOTE: This class must be located BEFORE
//       all those that extend this class
// ****************************************************
export abstract class AngularLogPublisher {

	location: string = '';

	abstract log(record: AngularLogEntry): Observable<boolean>;
	abstract clear(): Observable<boolean>;
}

// ****************************************************
// Console Logging Class
// ****************************************************
export class AngularLogConsole extends AngularLogPublisher {

	constructor(
		private _repository: AppLogsService) {

		// Must call super() from derived classes
		super();

		// Set location
		this.location = '/api/logging';
	}

	log(entry: AngularLogEntry): Observable<boolean> {

		// Log to console
		//console.log(entry.buildLogString());

		this.sendToServer(entry);

		return of(true);
	}

	clear(): Observable<boolean> {
		console.clear();

		return of(true);
	}

	// Add log entry to back end data store
	public sendToServer(entry: AngularLogEntry): any {
		const apiUrl = 'app/log';

		const str = entry.buildLogString();

		const json = JSON.stringify(entry);
		this._repository.create(apiUrl, json)
			.subscribe((result) => {
				//console.log('log entry upload completed');
			});
	}

}
/*
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { LogEntry } from './log.service';

// ****************************************************
// Log Publisher Abstract Class
// NOTE: This class must be located BEFORE
//       all those that extend this class
// ****************************************************
export abstract class LogPublisher {
  location: string = '';

  abstract log(record: LogEntry): Observable<boolean>
  abstract clear(): Observable<boolean>;
}

// ****************************************************
// Console Logging Class
// ****************************************************
export class LogConsole extends LogPublisher {
  log(entry: LogEntry): Observable<boolean> {
	// Log to console
	//console.log(entry.buildLogString());

	return Observable.of(true);
  }

  clear(): Observable<boolean> {
	console.clear();

	return Observable.of(true);
  }
}

// ****************************************************
// Local Storage Logging Class
// ****************************************************
export class LogLocalStorage extends LogPublisher {
  constructor() {
	// Must call super() from derived classes
	super();
	// Set location
	this._location = 'logging';
  }

  // Append log entry to local storage
  log(entry: LogEntry): Observable<boolean> {
	let ret: boolean = false;
	let values: LogEntry[];

	try {
	  // Retrieve previous values from local storage
	  values = JSON.parse(localStorage.getItem(this._location)) || [];
	  // Add new log entry to array
	  values.push(entry);
	  // Store array into local storage
	  localStorage.setItem(this._location, JSON.stringify(values));

	  // Set return value
	  ret = true;
	} catch (ex) {
	  // Display error in console
	  //console.log(ex);
	}

	return Observable.of(ret);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
	localStorage.removeItem(this._location);
	return Observable.of(true);
  }
}

// ****************************************************
// Logging Web API Class
// ****************************************************
export class LogWebApi extends LogPublisher {
  constructor(private _http: Http) {
	// Must call super() from derived classes
	super();
	// Set location
	this._location = '/api/logging';
  }

  // **************
  // Public Methods
  // **************

  // Add log entry to back end data store
  log(entry: LogEntry): Observable<boolean> {
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });

	return this._http.post(this._location, entry, options)
	  .map((response) => response.json())
	  .catch(this.handleErrors);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
	// TODO: Call Web API to clear all values
	return Observable.of(true);
  }

  // ***************
  // Private Methods
  // ***************
  private handleErrors(error: any): Observable<any> {
	let errors: string[] = [];
	let msg: string = '';

	msg = 'Status: ' + error.status;
	msg += ' - Status Text: ' + error.statusText;
	if (error.json()) {
	  msg += ' - Exception Message: ' + error.json().exceptionMessage;
	}
	errors.push(msg);

	console.error('An error occurred', errors);

	return Observable.throw(errors);
  }
}
*/

