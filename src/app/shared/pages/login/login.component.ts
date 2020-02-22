import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   // password
   isHide = true;

   // spinner
   clicked = false;

   // form
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              public router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  logIn() {
    if (this.loginForm.valid) {
      this.userService.logIn(this.loginForm.value).subscribe(result => {
        if (this.userService.user$) {
          this.router.navigate(['/']);
        }
      }, () => {
        // if error
        this.clicked = false;
      });
    }
  }
}
