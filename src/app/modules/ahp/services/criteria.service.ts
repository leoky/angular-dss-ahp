import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// model
import { Criteria } from '../models/criteria';
import { Ahp } from '../helper/ahp';

@Injectable()
export class CriteriaService {

  criterias$: BehaviorSubject<Criteria[]> = new BehaviorSubject<Criteria[]>(null);

  ahpHelper = new Ahp();

  constructor() { }

  calculatePV(data: Criteria[]) {
    return this.ahpHelper.calculatePV(data);
  }
  setPV() {
    return this.ahpHelper.setPV(this.criterias$.value);
  }
}
