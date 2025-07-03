import * as _ from 'lodash';

export class File {

	fileId: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	fileType: string;
	fileLength: string;
	firstName: string;
	lastName: string;
	originalFileName: string;
	shortFileName: string;
	pdfFileName: string;
	htmlFileName: string;
	jsonFile: string;
	textFile: string;
	htmlFile: string;

	constructor(
		File?: {
			FileId: number,
			userId: string,
			File: string,
			firstName: string,
			lastName: string,
		}) {
		if (File) {
			_.assignIn(this, File);
			// this.authenticated = false;
		}
	}
}
