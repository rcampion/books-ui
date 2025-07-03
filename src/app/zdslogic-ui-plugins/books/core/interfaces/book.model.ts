export interface Book {
	bookId: string;
	isbn13: string;
	title: string;
	languageId: string;
	author: string;
	authorId: string;
	category: string;
	publicationDate: string;
	publisherId: string;
	price?: number;
	qty?: number;
	image: string;
}
