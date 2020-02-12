import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// service
import { CriteriaService } from '../../services/criteria.service';
import { Criteria } from '../../models/criteria';
import { AlternativeService } from '../../services/alternative.service';

@Component({
  selector: 'app-alternative-calculate',
  templateUrl: './alternative-calculate.component.html',
  styleUrls: ['./alternative-calculate.component.scss']
})
export class AlternativeCalculateComponent implements OnInit {

  // model
  criteria: Criteria;
  pairwise: any[];

  // form
  pairForm = this.fb.array([]);

  paramId: number;

  calculated: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private location: Location,
              private criteriaService: CriteriaService,
              private altService: AlternativeService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // + to change data type number
      this.paramId = +params.get('id');

      if (params.get('id')) {
        // check if already calculate
        this.checkResult();

        // initial data and form
        this.initial();
      }
    });
  }
  initial() {
    // initial data and form
    if (this.criteriaService.criterias) {
      this.criteria = this.criteriaService.criterias[this.paramId];
      this.createForm();
    }
  }

  // check if already calculate
  checkResult() {
    if (this.altService.altCrits) {
      if (this.altService.altCrits[this.paramId].alternatives[0].priorityVector) {
        this.calculated = true;
      }
    }
  }
  createForm(): void {
    if (this.altService.alternatives) {
      // pair first
      this.pairwise = this.altService.pairwise(this.altService.alternatives);
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
    this.altService.altCrits[this.paramId].alternatives.forEach((alternative: Criteria, index: number) => {
      this.altService.altCrits[this.paramId].alternatives[index].value = [];
      this.pairForm.value.forEach((x: any, mapIndex: number) => {

        if (index === mapIndex && index < this.altService.altCrits[this.paramId].alternatives.length - 1) {
          this.altService.altCrits[this.paramId].alternatives[index].value.push(1);
        }

        if (x.pair.includes(alternative.name)) {
          if (alternative.name === x.choose) {
            this.altService.altCrits[this.paramId].alternatives[index].value.push(x.value);
          } else {
            this.altService.altCrits[this.paramId].alternatives[index].value.push(1 / x.value);
          }
        }
        if (index === mapIndex && index >= this.altService.altCrits[this.paramId].alternatives.length - 1) {
          this.altService.altCrits[this.paramId].alternatives[index].value.push(1);
        }
      });
    });
    console.log(this.altService.altCrits);
    this.router.navigate(['/ahp/alternative/result', this.paramId]);
  }
  goBack() {
    this.location.back();
  }
}
