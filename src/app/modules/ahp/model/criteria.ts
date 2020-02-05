export interface Criteria {
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
