import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AhpComponent } from './ahp.component';
import { CriteriaComponent } from './pages/criteria/criteria.component';
import { CriteriaCalculateComponent } from './pages/criteria-calculate/criteria-calculate.component';
import { CriteriaResultComponent } from './pages/criteria-result/criteria-result.component';
import { AlternativeComponent } from './pages/alternative/alternative.component';
import { AlternativeCalculateComponent } from './pages/alternative-calculate/alternative-calculate.component';
import { AlternativeResultComponent } from './pages/alternative-result/alternative-result.component';
import { FinalResultComponent } from './pages/final-result/final-result.component';
import { MyListComponent } from './pages/my-list/my-list.component';

const routes: Routes = [
  { path: ':id',
    component: AhpComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'criteria', pathMatch: 'full'},
          { path: 'criteria', component: CriteriaComponent},
          { path: 'criteria/calculate', component: CriteriaCalculateComponent},
          { path: 'criteria/result', component: CriteriaResultComponent},

          { path: 'alternative', component: AlternativeComponent},
          { path: 'alternative/calculate/:id', component: AlternativeCalculateComponent},
          { path: 'alternative/result/:id', component: AlternativeResultComponent},

          { path: 'result', component: FinalResultComponent},

          { path: 'my-list', component: MyListComponent},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhpRoutingModule { }
