import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
// model
import { Criteria } from '../../models/criteria';
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

  criterias: Criteria[];
  criterias$: Observable<Criteria[]> = this.criteriaService.criterias$;

  constructor(private fb: FormBuilder,
              private criteriaService: CriteriaService) { }

  ngOnInit() {
    // if already set value
      this.criterias$.subscribe(data => {
        if (data) {
          this.criterias = data.sort((a, b) => {
            return a.order - b.order;
          });
          // generate list form
          this.listForm.clear();
          data.map(x => {
            this.addList();
          });
          this.listForm.patchValue(data);
          this.listForm.disable();
       } else {
         this.listForm.clear();
         this.listForm.push(this.createList());
         this.listForm.push(this.createList());
         this.listForm.push(this.createList());
       }
    });
  }
  // create list
  createList(): FormGroup {
    return this.fb.group({
      id: [],
      decisionId: [],
      name: ['', [Validators.required, Validators.maxLength(32)]],
      desc: [''],
      order: [0],
      value: [[]],
      rank: [],
      priorityVector: [],
      alternatives: [],
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
    const data = this.listForm.value.map((x: Criteria) => {
      x.order = order++;
      return x;
    });
    this.criteriaService.criterias$.next(data);
    this.listForm.disable();
    this.criterias = this.criteriaService.criterias$.value;
  }
}

