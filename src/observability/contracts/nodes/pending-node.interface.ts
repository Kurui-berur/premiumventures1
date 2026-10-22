export interface PendingNode {
    readonly bufferId:string;
    next?:PendingNode;
    previous?:PendingNode;
}