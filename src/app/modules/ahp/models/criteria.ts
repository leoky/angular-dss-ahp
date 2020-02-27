export interface Criteria {
    id?: string;
    decisionId?: string;
    name?: string;
    desc?: string;
    order?: number;
    value?: number[];
    priorityVector?: number;
    rank?: number;
    alternatives?: Criteria[];
    createdAt?: Date;
    updatedAt?: Date;
}
