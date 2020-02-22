import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// component
import { LoginComponent } from '../shared/pages/login/login.component';
import { RegisterComponent } from '../shared/pages/register/register.component';
import { UserComponent } from '../shared/pages/user/user.component';

// material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
// library
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDividerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    // library
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDividerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    // library
    FlexLayoutModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}},
  ]
})
export class SharedModule { }
