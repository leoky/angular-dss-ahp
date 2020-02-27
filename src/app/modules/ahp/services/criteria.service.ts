import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// model
import { Criteria } from '../models/criteria';

@Injectable()
export class CriteriaService {

  criterias$: BehaviorSubject<Criteria[]> = new BehaviorSubject<Criteria[]>(null);

  constructor() { }

  pairwise(list: Criteria[]): any[] {
    if (list) {
      // sort by order asc
      list.sort((a, b) => {
        return a.order - b.order;
      });
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
    if (this.criterias$.value) {
      const total = this.criterias$.value.map((c, index) => {
        // tslint:disable-next-line: prefer-const
        let sum = 0;
        this.criterias$.value.map((x) => {
          sum += x.value[index];
        });
        return sum;
      });
      this.criterias$.value.map((c, cIndex) => {
        let sum = 0;
        c.value.map((value, index) => {
          sum += (value / total[index]);
        });
        this.criterias$.value[cIndex].priorityVector = sum / this.criterias$.value.length;
      });
      this.rank();
    }
  }
  rank(): void {
    if (this.criterias$.value) {
      // tslint:disable-next-line: prefer-const
      let rank = 1;
      this.criterias$.value.map(x => x)
      .sort((a, b) => {
        return b.priorityVector - a.priorityVector;
      }).map(x => {
        x.rank = rank++;
        return x;
      }).sort((a, b) => {
        return a.order - b.order;
      });
    }
  }
}
