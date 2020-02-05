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
    if (this.criteriaService.criterias) {
      // calculate first
      this.criteriaService.calculate();
      // insert data to chart.js
      this.createChart();
      // add data to table
      this.dataSource = this.criteriaService.criterias.map((criteria, index) => {
        return {
          rank: index + 1,
          name: criteria.name,
          percentage: criteria.priorityVector * 100
        };
      });
    }
  }

  createChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.criteriaService.criterias.map((x) => {
          return x.name;
        }),
        datasets: [
          {
            label: 'Priority Vector (%)',
            data: this.criteriaService.criterias.map((x) => {
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
