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
        this.pairwise = this.criteriaService.pairwise(data);
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
        x.value = x.value * -1;
      }
    });
    this.pairForm.patchValue(a);
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
    this.pairForm.value.map(x => {
      if (x.value < 0) {
        x.value = x.value * -1;
        x.choose = x.pair[0];
      } else {
        x.choose = x.pair[1];
      }
    });
    console.log('Criteria pair form', this.pairForm.value);
    this.criteriaService.criterias$.value.forEach((criteria: Criteria, index: number) => {
      // reset value first
      criteria.value = [];

      this.pairForm.value.forEach((x: any, mapIndex: number) => {
        if (index === mapIndex && index < this.criteriaService.criterias$.value.length - 1) {
          criteria.value.push(1);
        }
        if (x.pair.includes(criteria.name)) {
          if (criteria.name === x.choose) {
            criteria.value.push(x.value);
          } else {
            criteria.value.push(1 / x.value);
          }
        }
        if (index === mapIndex && index >= this.criteriaService.criterias$.value.length - 1) {
          criteria.value.push(1);
        }
      });
    });
    console.log('Criteria pair result', this.criteriaService.criterias$.value);
    this.router.navigate([this.router.url.substring(0, this.router.url.length - 9), 'result']);
  }
}
