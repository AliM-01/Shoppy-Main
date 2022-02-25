export interface CommentModel {
    id: string;
    name: string;
    email: string;
    text: string;
    ownerRecordId: string;
    ownerName: string;
    parentId: string;
    replies: CommentModel[];
    creationDate: string
}