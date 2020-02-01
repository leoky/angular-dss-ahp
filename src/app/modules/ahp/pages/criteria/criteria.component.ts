import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
// service
import { CriteriaService } from '../../services/criteria.service';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {

  // initial form
  // start with min 3 list
  listForm = this.fb.array([this.createList(), this.createList(), this.createList()]);

  constructor(private fb: FormBuilder,
              private criteriaService: CriteriaService) { }

  ngOnInit() {
    // if already set value
    if (this.criteriaService.criterias) {
      this.listForm.patchValue(this.criteriaService.criterias);
      this.listForm.disable();
    }
  }
  // create list
  createList(): FormGroup {
    return this.fb.group({
      name: [''],
      desc: [''],
      order: []
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
    this.criteriaService.criterias = this.listForm.value.map((x: any) => {
      x.order = order++;
      return x;
    });
    this.listForm.disable();
  }
}

