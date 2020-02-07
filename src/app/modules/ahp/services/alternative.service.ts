import { Injectable } from '@angular/core';
// model
import { Alternative } from '../models/alternative';
import { Criteria } from '../models/criteria';
import { CriteriaService } from './criteria.service';

export class AltCrit {

}
@Injectable()
export class AlternativeService {

  alternatives: Criteria[];
  altCrits: Alternative[] = [];

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
    this.criteriaService.criterias$.subscribe(result => {
      this.altCrits = [];
      result.map(x => {
        if (this.alternatives) {
          this.altCrits.push({
            criteriaName: x.name,
            alternatives: this.alternatives
          });
        }
      });
    });
    // this.altCrits = [];
    // this.criteriaService.criterias.map(criteria => {
    //   this.altCrits.push({
    //     _id: criteria.order + '',
    //     criteriaName: criteria.name,
    //     alternatives: this.alternatives
    //   });
    // });
    console.log(this.altCrits);
  }

  calculate(id: number): void {
    if (this.altCrits) {
      const total = this.altCrits[id].alternatives.map((c, index) => {
        let sum = 0;
        this.altCrits[id].alternatives.map((x) => {
          sum += x.value[index];
        });
        return sum;
      });
      this.altCrits[id].alternatives.map((c, cIndex) => {
        let sum = 0;
        c.value.map((value, index) => {
          sum += (value / total[index]);
        });
        this.altCrits[id].alternatives[cIndex].priorityVector = sum / this.altCrits[id].alternatives.length;
      });
      this.rank(id);
    }
  }
  rank(id: number): void {
    if (this.altCrits) {
      // tslint:disable-next-line: prefer-const
      let rank = 1;
      this.altCrits[id].alternatives.map(x => {
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
