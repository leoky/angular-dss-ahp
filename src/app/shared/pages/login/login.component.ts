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

   // url
   redirectUrl = '/';

   // form
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              public router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.redirectUrl = this.userService.redirectUrl;
  }

  logIn() {
    if (this.loginForm.valid) {
      this.userService.logIn(this.loginForm.value).subscribe(result => {
        if (this.userService.user$) {
          this.router.navigateByUrl(this.redirectUrl);
        }
      }, () => {
        // if error
        this.clicked = false;
      });
    }
  }
}
