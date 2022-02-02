export interface CommentModel {
    id: number;
    name: string;
    email: string;
    text: string;
    ownerRecordId: number;
    ownerName: string;
    parentId: number;
    replies: CommentModel[];
    creationDate: string
}