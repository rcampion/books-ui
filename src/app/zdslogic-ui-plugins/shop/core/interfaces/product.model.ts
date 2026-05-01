export interface Product {

	productId: string;
	archived: string;
	canSellWithoutOptions: string;
	canonicalUrl: string;
	displayTemplate: string;
	isFeaturedProduct: string;
	manufacture: string;
	metaDesc: string;
	metaTitle: string;
	model: string;
	overrideGeneratedUrl: string;
	url: string;
	urlKey: string;
	defaultCategoryId: string;
	defaultSkuId: string;

	name?: string;
	longDescription?: string;

	retailPrice?: number;
	qty?: number;
	image?: string;
}
