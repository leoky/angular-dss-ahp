export interface Alternative {
    _id?: string;
    decisionId?: string;
    name?: string;
    desc?: string;
    order?: number;
    value?: number[];
    priorityVector?: number;
    rank?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
