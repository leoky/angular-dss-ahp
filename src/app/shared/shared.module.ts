import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    CoreModule
  ]
})
export class SharedModule { }
