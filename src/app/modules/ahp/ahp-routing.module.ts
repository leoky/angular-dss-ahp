import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AhpComponent } from './ahp.component';
import { CriteriaComponent } from './pages/criteria/criteria.component';

const routes: Routes = [
  { path: '',
    component: AhpComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'criteria', pathMatch: 'full'},
          { path: 'criteria', component: CriteriaComponent}
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
