import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
// service
import { CriteriaService } from '../../services/criteria.service';
import { AlternativeService } from '../../services/alternative.service';
import { DecisionService } from '../../services/decision.service';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss']
})
export class FinalResultComponent implements OnInit {

  chart = {};

  // table
  displayedColumns: string[] = ['rank', 'name', 'percentage'];
  dataSource: any[];

  constructor(private criteriaService: CriteriaService,
              private decisionService: DecisionService,
              public alternativeService: AlternativeService) { }

  ngOnInit() {
    if (this.criteriaService.criterias$.value && this.criteriaService.criterias$.value[0].alternatives) {

      this.calculate();

      this.createChart();

      // add data to table
      this.dataSource = this.alternativeService.alternatives$.value.map((alternative) => {
        return {
          rank: alternative.rank,
          name: alternative.name,
          percentage: alternative.priorityVector * 100
        };
      }).sort((a, b) => {
        return a.rank - b.rank;
      });
      console.log('alternataive result', this.alternativeService.alternatives$.value);
    }
  }

  save() {
    this.decisionService.save().subscribe();
  }

  calculate() {
    // create: alternative[] = [ criteria [] ]
    // tslint:disable-next-line: prefer-const
    let alternative = Array.from(Array(this.alternativeService.alternatives$.value.length),
    () => new Array(this.criteriaService.criterias$.value.length));

    this.criteriaService.criterias$.value.map((crit) => {
      crit.alternatives.map((alt) => {
          alternative[alt.order][crit.order] = alt.priorityVector;
      });
    });
    // multiply alternative with criteria
    for (let i = 0; i < this.alternativeService.alternatives$.value.length; i++ ) {
      let sum = 0;
      for (let j = 0; j < this.criteriaService.criterias$.value.length; j++) {
        sum += (alternative[i][j] * this.criteriaService.criterias$.value.find(x => x.order === j).priorityVector);
      }
      this.alternativeService.alternatives$.value[i].priorityVector = sum;
    }
    // rank
    this.alternativeService.rankFinal();
  }
  createChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.alternativeService.alternatives$.value.map((x) => {
          return x.name;
        }),
        datasets: [
          {
            label: 'Priority Vector (%)',
            data: this.alternativeService.alternatives$.value.map((x) => {
              return x.priorityVector * 100;
            })
          }
        ]
      },
      options: {
        legend: {
        }
      }
    });
  }
}
