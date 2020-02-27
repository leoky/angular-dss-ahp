import { Criteria } from './criteria';

export interface Decision {
    id?: string;
    name?: string;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    criterias?: Criteria[];
    alternatives?: Criteria[];
}
