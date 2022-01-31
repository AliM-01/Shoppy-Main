export class AddCommentModel {
    name: string;
    email: string;
    text: string;
    type: CommentType;
    ownerRecordId: number;
    parentId: number;
}

export enum CommentType {
    Product = "Product",
    Article = "Article"
}