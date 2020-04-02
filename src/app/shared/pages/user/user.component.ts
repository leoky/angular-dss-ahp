import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

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
              private userService: UserService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.userService.getUser().subscribe(data => {
      this.userForm.patchValue(data);
    }, (err) => {
      this.router.navigate(['/login']);
    });
    this.userForm.disable();
  }

  update() {
    if (this.userForm.valid) {
      this.userService.update(this.userForm.value).subscribe(result => {
        this.userForm.disable();
      });
    }
  }
  cancel() {
    this.getData();
  }
  goBack() {
    this.location.back();
  }
}
