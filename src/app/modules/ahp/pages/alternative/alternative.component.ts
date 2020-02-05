import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// model
import { Alternative } from '../../models/alternative';
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

  alternatives: Alternative[];
  constructor(private fb: FormBuilder,
              private alternativeService: AlternativeService) { }

  ngOnInit() {
    // if already set value
    if (this.alternativeService.alternatives) {
      this.alternatives = this.alternativeService.alternatives;
      this.listForm.patchValue(this.alternativeService.alternatives);
      this.listForm.disable();
    }
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
    let order = 0;
    this.alternativeService.alternatives = this.listForm.value.map((x: Alternative) => {
      x.order = order++;
      return x;
    });
    this.listForm.disable();
    this.alternatives = this.alternativeService.alternatives;
    }
  }

