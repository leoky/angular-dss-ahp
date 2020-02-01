import { Injectable } from '@angular/core';
// model
import { Criteria } from '../model/criteria';
import { pairs } from 'rxjs';

@Injectable()
export class CriteriaService {

  criteria: Criteria;
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
}
