import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// model
import { Criteria } from '../models/criteria';
import { CriteriaService } from './criteria.service';

export class AltCrit {

}
@Injectable()
export class AlternativeService {

  alternatives$: BehaviorSubject<Criteria[]> = new BehaviorSubject<Criteria[]>(null);

  constructor(private criteriaService: CriteriaService) { }

  // for pair bettween alternative
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
  createAltCrit(): void {
    if (this.criteriaService.criterias$.value && this.alternatives$.value) {
      this.criteriaService.criterias$.value.forEach(result => {
        if (this.alternatives$.value) {
          result.alternatives = this.alternatives$.value.map(alt => ({...alt}));
        }
      });
      console.log('crti-alt', this.criteriaService.criterias$.value);
    }
  }

  calculate(id: number): void {
    if (this.criteriaService.criterias$.value[id].alternatives) {
      const total = this.criteriaService.criterias$.value[id].alternatives.map((c, index) => {
        let sum = 0;
        this.criteriaService.criterias$.value[id].alternatives.map((x) => {
          sum += x.value[index];
        });
        return sum;
      });
      this.criteriaService.criterias$.value[id].alternatives.map((c, cIndex) => {
        let sum = 0;
        c.value.map((value, index) => {
          sum += (value / total[index]);
        });
        this.criteriaService.criterias$.value[id].alternatives[cIndex].priorityVector
        = sum / this.criteriaService.criterias$.value[id].alternatives.length;
      });
      this.rank(id);
    }
  }
  rank(id: number): void {
    if (this.criteriaService.criterias$.value[id].alternatives) {
      // tslint:disable-next-line: prefer-const
      let rank = 1;
      this.criteriaService.criterias$.value[id].alternatives.map(x => x)
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
  rankFinal(): void {
    if (this.alternatives$.value) {
      let rank = 1;
      this.alternatives$.value.map(x => x)
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
