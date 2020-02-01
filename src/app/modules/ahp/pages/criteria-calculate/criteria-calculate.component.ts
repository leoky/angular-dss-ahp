import { Component, OnInit } from '@angular/core';
// service
import { CriteriaService } from '../../services/criteria.service';

@Component({
  selector: 'app-criteria-calculate',
  templateUrl: './criteria-calculate.component.html',
  styleUrls: ['./criteria-calculate.component.scss']
})
export class CriteriaCalculateComponent implements OnInit {
 crit1 = 1;
 crit2 = 1;
 pairwise: any[];
  constructor(private criteriaService: CriteriaService) { }

  ngOnInit() {
    if (this.criteriaService.criterias) {
      console.log(this.criteriaService.criterias);
      console.log(this.criteriaService.pairwise(this.criteriaService.criterias));
      this.pairwise = this.criteriaService.pairwise(this.criteriaService.criterias);
    }
  }

}
