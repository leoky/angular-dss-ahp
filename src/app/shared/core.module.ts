import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
// library
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    // library
    FlexLayoutModule,
  ]
})
export class CoreModule { }
