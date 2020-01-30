import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    CommonModule,
    CoreModule
  ]
})
export class SharedModule { }
