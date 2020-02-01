import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AhpComponent } from './ahp.component';
import { CriteriaComponent } from './pages/criteria/criteria.component';
import { CriteriaCalculateComponent } from './pages/criteria-calculate/criteria-calculate.component';

const routes: Routes = [
  { path: '',
    component: AhpComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'criteria', pathMatch: 'full'},
          { path: 'criteria', component: CriteriaComponent},
          { path: 'criteria/calculate', component: CriteriaCalculateComponent}
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
