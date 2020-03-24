import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
// service
import { CriteriaService } from '../../services/criteria.service';
import { Criteria } from '../../models/criteria';
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

  cr = 0;

  constructor(private criteriaService: CriteriaService,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.criteriaService.criterias$.subscribe(data => {
      if (data) {
        // calculate first
        this.cr = this.criteriaService.setPV();
        // insert data to chart.js
        this.createChart(data);
        // add data to table
        this.dataSource = data.map((criteria, index) => {
          return {
            rank: criteria.rank,
            name: criteria.name,
            desc: criteria.desc,
            percentage: criteria.priorityVector * 100
          };
        }).sort((a, b) => {
          return a.rank - b.rank;
        });
      }
    });
  }

  createChart(data: Criteria[]) {
    if (data[0].priorityVector) {
      const idCanvas = this.elementRef.nativeElement.querySelector('#canvas');
      this.chart = new Chart(idCanvas, {
        type: 'bar',
        data: {
          labels: data.map((x) => {
            return x.name;
          }),
          datasets: [
            {
              label: 'Priority Vector (%)',
              data: data.map((x) => {
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

}
