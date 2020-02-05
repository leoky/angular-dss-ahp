import { Injectable } from '@angular/core';
// model
import { Criteria } from '../models/criteria';

@Injectable()
export class CriteriaService {

  criterias: Criteria[];

  constructor() { }

  pairwise(list: Criteria[]): any[] {
    if (list) {
      if (list.length < 2) { return []; }
      const first = list[0];
      const rest = list.slice(1);
      const pair = rest.map((x) => {
        return [first, x];
      });
      return pair.concat(this.pairwise(rest));
    }
  }

  calculate(): void {
    if (this.criterias) {
      const total = this.criterias.map((c, index) => {
        // tslint:disable-next-line: prefer-const
        let sum = 0;
        this.criterias.map((x) => {
          sum += x.value[index];
        });
        return sum;
      });
      this.criterias.map((c, cIndex) => {
        let sum = 0;
        c.value.map((value, index) => {
          sum += (value / total[index]);
        });
        this.criterias[cIndex].priorityVector = sum / this.criterias.length;
      });
      this.rank();
    }
  }
  rank(): void {
    if (this.criterias) {
      this.criterias.sort((a, b) => {
        return b.priorityVector - a.priorityVector;
      });
    }
  }
}
