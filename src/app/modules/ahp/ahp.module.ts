import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhpRoutingModule } from './ahp-routing.module';
// material
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
// service
import { CriteriaService } from './services/criteria.service';
import { AlternativeService } from './services/alternative.service';
// component
import { AhpComponent } from './ahp.component';
import { CriteriaComponent } from './pages/criteria/criteria.component';
import { CriteriaCalculateComponent } from './pages/criteria-calculate/criteria-calculate.component';
import { CriteriaResultComponent } from './pages/criteria-result/criteria-result.component';
import { AlternativeComponent } from './pages/alternative/alternative.component';
import { AlternativeCalculateComponent } from './pages/alternative-calculate/alternative-calculate.component';
import { AlternativeResultComponent } from './pages/alternative-result/alternative-result.component';

@NgModule({
  declarations: [AhpComponent, CriteriaComponent, CriteriaCalculateComponent, CriteriaResultComponent,
    AlternativeComponent, AlternativeCalculateComponent, AlternativeResultComponent],
  imports: [
    CommonModule,
    AhpRoutingModule,
    SharedModule,
    // material
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatTableModule,
  ],
  providers: [
    CriteriaService,
    AlternativeService
  ]
})
export class AhpModule { }
