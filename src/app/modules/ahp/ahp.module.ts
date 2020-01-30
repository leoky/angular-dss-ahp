import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// material
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
// component
import { AhpRoutingModule } from './ahp-routing.module';
import { AhpComponent } from './ahp.component';
import { CriteriaComponent } from './pages/criteria/criteria.component';

@NgModule({
  declarations: [AhpComponent, CriteriaComponent],
  imports: [
    CommonModule,
    AhpRoutingModule,
    SharedModule,
    // material
    MatSidenavModule
  ]
})
export class AhpModule { }
