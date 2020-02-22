import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// interceptor
import { ApiInterceptor } from './interceptor/api.interceptor';

import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    [
      { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
    ],
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
 }
