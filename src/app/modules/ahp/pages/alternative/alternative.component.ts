import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// model
import { Criteria } from '../../models/criteria';
// service
import { AlternativeService } from '../../services/alternative.service';
@Component({
  selector: 'app-alternative',
  templateUrl: './alternative.component.html',
  styleUrls: ['./alternative.component.scss']
})
export class AlternativeComponent implements OnInit {
  // initial form
  // start with min 3 list
  listForm = this.fb.array([this.createList(), this.createList(), this.createList()]);

  alternatives: Criteria[];

  constructor(private fb: FormBuilder,
              private alternativeService: AlternativeService) { }

  ngOnInit() {
    // if already set value
    this.alternativeService.alternatives$.subscribe(data => {
      if (data) {
        this.alternatives =  data.sort((a, b) => {
          return a.order - b.order;
        });
        // generate form
        this.listForm.clear();
        this.alternatives.map(x => {
          this.addList();
        });
        this.listForm.patchValue(this.alternativeService.alternatives$.value);
        this.listForm.disable();
      }
    });
  }
  // create list
  createList(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      order: [0],
      value: [[]]
    });
  }
  // get list
  get getList() {
    return this.listForm as FormArray;
  }
  // add list
  addList() {
    this.listForm.push(this.createList());
  }
  // delete list
  deleteList(index: number) {
    this.getList.removeAt(index);
  }
  // save list
  saveList() {
    // add order
    let order = 0;
    this.alternativeService.alternatives$.next(this.listForm.value.map((x: Criteria) => {
      x.order = order++;
      return x;
    }));

    this.listForm.disable();

    // update this local varibel
    this.alternatives = this.alternativeService.alternatives$.value;

    this.alternativeService.createAltCrit();
    }
  }

