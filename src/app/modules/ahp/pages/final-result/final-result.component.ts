import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
// service
import { CriteriaService } from '../../services/criteria.service';
import { AlternativeService } from '../../services/alternative.service';
import { DecisionService } from '../../services/decision.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss']
})
export class FinalResultComponent implements OnInit {

  // button
  saveButton = false;

  chart = {};

  // table
  displayedColumns: string[] = ['rank', 'name', 'percentage'];
  dataSource: any[];

  user$ = this.userService.user$;

  constructor(private criteriaService: CriteriaService,
              private decisionService: DecisionService,
              private userService: UserService,
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

      // show hide save update button
      if (this.decisionService.decision.id) {
        this.saveButton = false;
      } else {
        this.saveButton = true;
      }
      console.log('alternataive result', this.alternativeService.alternatives$.value);
    }
  }

  save() {
    this.decisionService.save().subscribe(() => {
      this.saveButton = false;
    });
  }

  update() {
    this.decisionService.update().subscribe();
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
        scales: {
          yAxes: [{
            ticks : {
              min: 0,
              max: 100
            }
          }]
        }
      }
    });
  }
}
