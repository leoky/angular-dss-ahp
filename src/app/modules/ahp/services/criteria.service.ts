import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// model
import { Criteria } from '../models/criteria';

@Injectable()
export class CriteriaService {

  criterias: Criteria[];
  criterias$: BehaviorSubject<Criteria[]> = new BehaviorSubject<Criteria[]>(null);

  constructor() { }

  saveCriteria(data: Criteria[]): void {
    if (data) {
      this.criterias = data;
      this.criterias$.next(data);
    }
  }

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
      // tslint:disable-next-line: prefer-const
      let rank = 1;
      this.criterias.map(x => {
        return x;
      }).sort((a, b) => {
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
