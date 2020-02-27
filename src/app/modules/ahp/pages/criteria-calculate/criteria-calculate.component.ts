import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// service
import { CriteriaService } from '../../services/criteria.service';
import { Criteria } from '../../models/criteria';
import { AlternativeService } from '../../services/alternative.service';

@Component({
  selector: 'app-criteria-calculate',
  templateUrl: './criteria-calculate.component.html',
  styleUrls: ['./criteria-calculate.component.scss']
})
export class CriteriaCalculateComponent implements OnInit {

 pairwise: any[];
 pairForm = this.fb.array([]);

  constructor(private criteriaService: CriteriaService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.criteriaService.criterias$.subscribe(data => {
     if (data) {
        // pair first
        this.pairwise = this.criteriaService.pairwise(data);
        // loop pair to form
        this.pairwise.map((x) => {
        this.pairForm.push(this.listGroup([x[0].name, x[1].name], x[0].name));
        });
     }
    });
  }

  // form item stucture
  listGroup(pairs: any[], choose: string): FormGroup {
    return this.fb.group({
      pair: [pairs, Validators.required],
      choose: [choose, Validators.required],
      value: ['', Validators.required],
    });
  }
  calculate() {
    console.log('Criteria pair form', this.pairForm.value);
    this.criteriaService.criterias$.value.map((criteria: Criteria, index: number) => {
      // reset value first
      criteria.value = [];

      this.pairForm.value.map((x: any, mapIndex: number) => {
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
