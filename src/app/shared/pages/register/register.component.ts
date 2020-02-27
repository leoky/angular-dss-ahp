import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // spinner
  clicked = false;

  // form
  regisForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required,  Validators.maxLength(50)]],
    password: ['', [Validators.required,  Validators.maxLength(32)]],
    repassword: ['', [Validators.required,  Validators.maxLength(32)]],
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }
  register() {
    if (this.regisForm.valid) {
      this.userService.register(this.regisForm.value).subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/login');
          this.clicked = false;
        }
      }, () => {
        this.clicked = false;
      });
    }
  }
}
