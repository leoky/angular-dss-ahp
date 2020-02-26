import { Criteria } from './criteria';
import { Alternative } from './alternative';

export interface Decision {
    id?: string;
    name?: string;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    criteria?: Criteria[];
    alternative?: Criteria[];
    // pairComparison?: Alternative;
}
