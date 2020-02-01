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
  dataSource = [
    {rank: 1, name: 'roe', percentage: '43%'},
    {rank: 2, name: 'der', percentage: '33%'},
    {rank: 3, name: 'per', percentage: '13%'},
  ];
  constructor(private criteriaService: CriteriaService) { }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        // labels: this.criteriaService.criterias.map((x) => {
        //   return x.name;
        // }),
        labels: ['pbv', 'der', 'roe'],
        datasets: [
          {
            label: 'Priority Vector(%)',
            data: [65, 59, 80]
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
