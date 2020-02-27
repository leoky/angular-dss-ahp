import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
// service
import { CriteriaService } from '../../services/criteria.service';
@Component({
  selector: 'app-criteria-result',
  templateUrl: './criteria-result.component.html',
  styleUrls: ['./criteria-result.component.scss']
})
export class CriteriaResultComponent implements OnInit {

  chart: {};
  // table
  displayedColumns: string[] = ['rank', 'name', 'percentage'];
  dataSource: any[];

  constructor(private criteriaService: CriteriaService) { }

  ngOnInit() {
    this.criteriaService.criterias$.subscribe(data => {
      if (data) {
        // calculate first
        this.criteriaService.calculate();
        // insert data to chart.js
        this.createChart();
        // add data to table
        this.dataSource = this.criteriaService.criterias$.value.map((criteria, index) => {
          return {
            rank: criteria.rank,
            name: criteria.name,
            percentage: criteria.priorityVector * 100
          };
        }).sort((a, b) => {
          return a.rank - b.rank;
        });
      }
    });
  }

  createChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.criteriaService.criterias$.value.map((x) => {
          return x.name;
        }),
        datasets: [
          {
            label: 'Priority Vector (%)',
            data: this.criteriaService.criterias$.value.map((x) => {
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
