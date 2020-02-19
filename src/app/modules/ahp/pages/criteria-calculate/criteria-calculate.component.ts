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
    if (this.criteriaService.criterias) {
      // pair first
      this.pairwise = this.criteriaService.pairwise(this.criteriaService.criterias);
      // loop pair to form
      this.pairwise.map((x) => {
        this.pairForm.push(this.listGroup([x[0].name, x[1].name], x[0].name));
      });
    }
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
    console.log(this.pairForm.value);
    this.criteriaService.criterias.map((criteria: Criteria, index: number) => {
      // reset value first
      this.criteriaService.criterias[index].value = [];

      this.pairForm.value.map((x: any, mapIndex: number) => {
        if (index === mapIndex && index < this.criteriaService.criterias.length - 1) {
          this.criteriaService.criterias[index].value.push(1);
        }
        if (x.pair.includes(criteria.name)) {
          if (criteria.name === x.choose) {
            this.criteriaService.criterias[index].value.push(x.value);
          } else {
            this.criteriaService.criterias[index].value.push(1 / x.value);
          }
        }
        if (index === mapIndex && index >= this.criteriaService.criterias.length - 1) {
          this.criteriaService.criterias[index].value.push(1);
        }
      });
    });
    console.log(this.criteriaService.criterias);
    this.router.navigate(['/ahp/create/criteria', 'result']);
  }
}
