import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// service
import { CriteriaService } from '../../services/criteria.service';
import { Criteria } from '../../models/criteria';

@Component({
  selector: 'app-criteria-calculate',
  templateUrl: './criteria-calculate.component.html',
  styleUrls: ['./criteria-calculate.component.scss']
})
export class CriteriaCalculateComponent implements OnInit {

 pairwise: any[];
 pairForm = this.fb.array([]);

 pairTitle = [
   'Equal important',
   'Between',
   'Moderate important',
   'Between',
   'Strong important',
   'Between',
   'Very strong important',
   'Between',
   'Extreme  important',
 ];

  constructor(private criteriaService: CriteriaService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.criteriaService.criterias$.subscribe(data => {
     if (data) {
        // pair first
        this.pairwise = this.criteriaService.ahpHelper.pairwise(data);
        // loop pair to form
        this.pairForm.clear();
        this.pairwise.map((x) => {
          this.pairForm.push(this.listGroup([x[0].name, x[1].name]));
        });
        // if already calculate
        if (data[0].value) {
          this.addDataToForm(data);
        }
      }
    });
  }

  addDataToForm(data: Criteria[]) {
    const a = [];
    data.map(criteria => {
      criteria.value.map((val, vIndex) => {
        if (criteria.order !== vIndex) {
          if (val >= 1) {
            a.push({
              pair: [data[criteria.order].name, data[vIndex].name],
              choose: data[criteria.order].name,
              value: val
            });
          }
        }
      });
    });
    this.syncWithPair(a);
  }

  syncWithPair(data: any[]) {
    const a = [];
    this.pairwise.map(x => {
      data.map(y => {
        if ([x[0].name, x[1].name].includes(y.pair[0]) && [x[0].name, x[1].name].includes(y.pair[1])) {
          a.push({
            pair: [x[0].name, x[1].name],
            choose: y.choose,
            value: y.value
          });
        }
      });
    });
    a.map(x => {
      if (x.pair[0] === x.choose) {
        if (x.value !== 1) {
          x.value = x.value * -1;
        } else {
          x.value = x.value;
        }
      }
    });
    // filter if duplicate pair
    const b = a.filter((value, index, self) =>
      index === self.findIndex((x) => (x.pair[0] === value.pair[0] && x.pair[1] === value.pair[1]))
    );
    this.pairForm.patchValue(b);
  }

  // form item stucture
  listGroup(pairs: any[]): FormGroup {
    return this.fb.group({
      pair: [pairs, Validators.required],
      choose: [''],
      value: ['', Validators.required],
    });
  }
  calculate() {
    // set choose from value
    const pairForm = this.pairForm.value.map(x => ({...x}));
    pairForm.map(x => {
      if (x.value < 0) {
        x.value = x.value * -1;
        x.choose = x.pair[0];
      } else {
        x.choose = x.pair[1];
      }
    });
    console.log('Criteria pair form', pairForm);

    const tempData = this.criteriaService.criterias$.value.map(x => ({...x}));

    tempData.forEach((criteria: Criteria, index: number) => {
      // reset value first
      criteria.value = [];

      pairForm.forEach((x: any, mapIndex: number) => {
        if (index === mapIndex && index < tempData.length - 1) {
          criteria.value.push(1);
        }
        if (x.pair.includes(criteria.name)) {
          if (criteria.name === x.choose) {
            criteria.value.push(x.value);
          } else {
            criteria.value.push(1 / x.value);
          }
        }
        if (index === mapIndex && index >= tempData.length - 1) {
          criteria.value.push(1);
        }
      });
    });
    // check Consistency ratio < 0.1
    const a = this.criteriaService.calculatePV(tempData);
    if (a.next) {
      this.criteriaService.criterias$.next(tempData);
      console.log('Criteria pair result', this.criteriaService.criterias$.value);
      console.log('CR criteria: ', a.cr);
      this.router.navigate([this.router.url.substring(0, this.router.url.length - 9), 'result']);
    } else {
      alert(`CR = ${a.cr} \nCR > 0.1\nTry again!`);
    }
  }
}
