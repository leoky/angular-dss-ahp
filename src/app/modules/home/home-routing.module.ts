import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { LoginComponent } from 'src/app/shared/pages/login/login.component';
import { RegisterComponent } from 'src/app/shared/pages/register/register.component';
import { UserComponent } from 'src/app/shared/pages/user/user.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
