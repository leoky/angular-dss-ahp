import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhpRoutingModule } from './ahp-routing.module';
// material
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
// service
import { CriteriaService } from './services/criteria.service';
import { AlternativeService } from './services/alternative.service';
import { DecisionService } from './services/decision.service';
// component
import { AhpComponent } from './ahp.component';
import { CriteriaComponent } from './pages/criteria/criteria.component';
import { CriteriaCalculateComponent } from './pages/criteria-calculate/criteria-calculate.component';
import { CriteriaResultComponent } from './pages/criteria-result/criteria-result.component';
import { AlternativeComponent } from './pages/alternative/alternative.component';
import { AlternativeCalculateComponent } from './pages/alternative-calculate/alternative-calculate.component';
import { AlternativeResultComponent } from './pages/alternative-result/alternative-result.component';
import { FinalResultComponent } from './pages/final-result/final-result.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [AhpComponent, CriteriaComponent, CriteriaCalculateComponent, CriteriaResultComponent,
    AlternativeComponent, AlternativeCalculateComponent, AlternativeResultComponent, FinalResultComponent,
    MyListComponent, DialogConfirmComponent],
  imports: [
    CommonModule,
    AhpRoutingModule,
    SharedModule,
    // material
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
  ],
  entryComponents: [DialogConfirmComponent],
  providers: [
    CriteriaService,
    AlternativeService,
    DecisionService
  ]
})
export class AhpModule { }
