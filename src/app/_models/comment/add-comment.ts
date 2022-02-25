export class AddCommentModel {

    constructor(
        public name: string,
        public email: string,
        public text: string,
        public type: CommentType,
        public ownerRecordId: string,
        public parentId: string 
    ){}
}

export enum CommentType {
    Product = "Product",
    Article = "Article"
}