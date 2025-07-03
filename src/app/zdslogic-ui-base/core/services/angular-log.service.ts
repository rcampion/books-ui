import { Injectable } from '@angular/core';

import { AngularLogPublishersService } from './angular-log-publishers.service';
import { AngularLogPublisher } from './angular-log-publishers';

// ****************************************************
// Log Level Enumeration
// ****************************************************
export enum LogLevel {
	All = 0,
	Debug = 1,
	Info = 2,
	Warn = 3,
	Error = 4,
	Fatal = 5,
	Off = 6
}

// ****************************************************
// Log Entry Class
// ****************************************************
export class AngularLogEntry {

	// Public Properties
	public entryDate: Date = new Date();
	public message: string = '';
	public level: LogLevel = LogLevel.Debug;
	public extraInfo: any[] = [];
	public logWithDate: boolean = true;

	// **************
	// Public Methods
	// **************
	buildLogString(): string {
		let value: string = '';

		if (this.logWithDate) {
			value = new Date() + ' - ';
		}
		value += 'Type: ' + LogLevel[this.level];
		value += ' - Message: ' + this.message;
		if (this.extraInfo.length) {
			value += ' - Extra Info: '
				+ this.formatParams(this.extraInfo);
		}

		return value;
	}

	// ***************
	// Private Methods
	// ***************
	private formatParams(params: any[]): string {
		let ret: string = params.join(',');

		// Is there at least one object in the array?
		if (params.some(p => typeof p === 'object')) {
			ret = '';
			// Build comma-delimited string
			for (const item of params) {
				ret += JSON.stringify(item) + ',';
			}
		}

		return ret;
	}
}

// ****************************************************
// Log Service Class
// ****************************************************
@Injectable()
export class AngularLogService {

	// Public Properties
	public publishers: AngularLogPublisher[];
	public level: LogLevel = LogLevel.All;
	public logWithDate: boolean = true;

	constructor(
		private _publishersService: AngularLogPublishersService) {
		// Set publishers
		this.publishers = this._publishersService.publishers;
	}

	// *************************
	// Public methods
	// *************************
	debug(msg: string, ...optionalParams: any[]): void {
		this.writeToLog(msg, LogLevel.Debug, optionalParams);
	}

	info(msg: string, ...optionalParams: any[]): void {
		this.writeToLog(msg, LogLevel.Info, optionalParams);
	}

	warn(msg: string, ...optionalParams: any[]): void {
		this.writeToLog(msg, LogLevel.Warn, optionalParams);
	}

	error(msg: string, ...optionalParams: any[]): void {
		this.writeToLog(msg, LogLevel.Error, optionalParams);
	}

	fatal(msg: string, ...optionalParams: any[]): void {
		this.writeToLog(msg, LogLevel.Fatal, optionalParams);
	}

	log(msg: string, ...optionalParams: any[]): void {
		this.writeToLog(msg, LogLevel.All, optionalParams);
	}

	clear(): void {
		for (const logger of this.publishers) {
			logger.clear()
				.subscribe((response) => { (response = response);});
		}
	}

	// *************************
	// Private methods
	// *************************
	private shouldLog(level: LogLevel): boolean {
		let ret: boolean = false;

		if ((level >= this.level &&
			level !== LogLevel.Off) ||
			this.level === LogLevel.All) {
			ret = true;
		}

		return ret;
	}

	private writeToLog(msg: string, level: LogLevel, params: any[]): any {
		if (this.shouldLog(level)) {
			// Declare variables
			const entry: AngularLogEntry = new AngularLogEntry();

			// Build Log Entry
			entry.message = msg;
			entry.level = level;
			entry.extraInfo = params;
			entry.logWithDate = this.logWithDate;

			for (const logger of this.publishers) {
				logger.log(entry)
					.subscribe((response) => {
						response = response;
					});
			}
		}
	}
}
