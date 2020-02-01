import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhpRoutingModule } from './ahp-routing.module';
// material
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
// component
import { AhpComponent } from './ahp.component';
import { CriteriaComponent } from './pages/criteria/criteria.component';
import { CriteriaCalculateComponent } from './pages/criteria-calculate/criteria-calculate.component';
// service
import { CriteriaService } from './services/criteria.service';
import { CriteriaResultComponent } from './pages/criteria-result/criteria-result.component';

@NgModule({
  declarations: [AhpComponent, CriteriaComponent, CriteriaCalculateComponent, CriteriaResultComponent],
  imports: [
    CommonModule,
    AhpRoutingModule,
    SharedModule,
    // material
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
  ],
  providers: [
    CriteriaService
  ]
})
export class AhpModule { }
