import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // form
  userForm = this.fb.group({
    name: [''],
    email: ['', Validators.required],
    phone: [''],
    gender: [''],
    birth: [''],
  });
  constructor(private location: Location,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm.disable();
  }
  cancel() {
    this.userForm.disable();
  }
  goBack() {
    this.location.back();
  }
}
