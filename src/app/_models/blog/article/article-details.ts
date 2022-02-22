import { ArticleModel } from "./article";

export class ArticleDetailsModel extends ArticleModel {
    text: string;
    tags: string[];
    imageAlt: string;
    imageTitle: string;
    metaKeywords: string;
    metaDescription: string;
    canonicalAddress: string;
}