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
  criteriaName: string;
  pairwise: any[];
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
      if (params.get('id')) {
        // + to change data type number
        this.paramId = +params.get('id');

        // initial data and form
        this.initial();
      }
    });
  }

  initial() {
    // initial data and form
    this.criteriaService.criterias$.subscribe(data => {
      if (data) {
        this.criteriaName = data[this.paramId].name;
        this.createForm();

        // check if already calculate
        if (data[this.paramId].alternatives) {
          if (data[this.paramId].alternatives[this.paramId].priorityVector) {
            this.calculated = true;
            this.addDataToForm(data[this.paramId].alternatives);
          } else {
            this.calculated = false;
          }
        }
      }
    });
  }

  createForm(): void {
    this.altService.alternatives$.subscribe(data => {
      if (data) {
        this.pairForm.clear();
        // pair first
        this.pairwise = this.altService.pairwise(data);
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

  addDataToForm(data: Criteria[]) {
    const a = [];
    data.map((criteria, cIndex) => {
      criteria.value.map((val, vIndex) => {
        if (criteria.order !== vIndex) {
          if (val >= 1) {
            a.push({
              pair: [data[cIndex].name, data[vIndex].name],
              choose: data[cIndex].name,
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
    this.criteriaService.criterias$.value[this.paramId].alternatives.forEach((alternative: Criteria, index: number) => {
      alternative.value = [];
      this.pairForm.value.forEach((x: any, mapIndex: number) => {

        if (index === mapIndex && index < this.criteriaService.criterias$.value[this.paramId].alternatives.length - 1) {
          alternative.value.push(1);
        }

        if (x.pair.includes(alternative.name)) {
          if (alternative.name === x.choose) {
            alternative.value.push(x.value);
          } else {
            alternative.value.push(1 / x.value);
          }
        }
        if (index === mapIndex && index >= this.criteriaService.criterias$.value[this.paramId].alternatives.length - 1) {
          alternative.value.push(1);
        }
      });
    });
    // console.log('altCrit result', this.altService.altCrits);
    console.log('altCrit result ', this.paramId, ' ', this.criteriaService.criterias$.value[this.paramId].alternatives);
    // delete calculate/0
    this.router.navigate([this.router.url.substring(0, this.router.url.length - 11), 'result', this.paramId]);
  }
  goBack() {
    this.location.back();
  }
}
