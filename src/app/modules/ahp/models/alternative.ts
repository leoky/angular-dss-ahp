import { Criteria } from './criteria';

export interface Alternative {
    id?: string;
    decisionId?: string;
    criteriaId?: string;
    order?: number;
    criteriaName?: string;
    alternatives?: Criteria[];
    createdAt?: Date;
    updatedAt?: Date;
}
