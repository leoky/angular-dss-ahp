import { Criteria } from '../models/criteria';

export interface Pv {
    cr?: number; // consistency ratio
    next?: boolean;
    pv?: number[]; // priority vector
}

export class Ahp {
    // random index, start with n = 2
    ri = [0.58, 0.9, 1.12, 1.24, 1.32];

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
    // #normalise
    // first get total value in matrix (y side)
    // divide each elemen in matrix (crit value) with total value
    calculatePV(data: Criteria[]): Pv {
        if (!data) { return null; }
        // normalise
        const total = data.map((c, index) => {
          let sum = 0;
          data.map((x) => {
            sum += x.value[index];
          });
          return sum;
        });
        // calculate PV
        const pv = data.map(c => {
          let sum = 0;
          c.value.map((value, index) => {
            sum += (value / total[index]);
          });
          return sum / data.length;
        });
        // check if cr < 0.1
        const cr = this.getCR(total, pv);
        return {
            cr,
            next: cr < 0.1,
            pv
        };
    }
    // get Consistency ratio
    getCR(total: number[], pv: number[]): number {
        if (total && pv) {
            let lamdaMax = 0;
            total.map((c, index) => {
                lamdaMax += c * pv[index];
            });

            // calculate CI
            const ci = (lamdaMax - pv.length) / (pv.length - 1);

            // calculate CR
            const cr = ci / this.ri[pv.length - 3];
            return cr;
        }
    }
    // save pv to model
    // return cr
    setPV(data: Criteria[]) {
        if (data) {
            const pv = this.calculatePV(data);
            if (pv.next) {
                data.map((value, index) => {
                    value.priorityVector = pv.pv[index];
                });
                this.rank(data);
                return pv.cr;
            }
        }
    }
    // set rank from priority vector
    rank(data: Criteria[]): void {
        if (data) {
            // tslint:disable-next-line: prefer-const
            let rank = 1;
            data.map(x => x)
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
