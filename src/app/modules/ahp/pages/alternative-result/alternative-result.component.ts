import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
// service
import { AlternativeService } from '../../services/alternative.service';
import { CriteriaService } from '../../services/criteria.service';
import { Criteria } from '../../models/criteria';
@Component({
  selector: 'app-alternative-result',
  templateUrl: './alternative-result.component.html',
  styleUrls: ['./alternative-result.component.scss']
})
export class AlternativeResultComponent implements OnInit {

  chart: {};

  // table
  displayedColumns: string[] = ['rank', 'name', 'percentage'];
  dataSource: any[];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private criteriaService: CriteriaService,
              private alternativeService: AlternativeService) { }

  paramId: number;
  criteriaName: string;
  results: Criteria;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        // + for change to be type number
        this.paramId = +params.get('id');

        this.initial();
      }
    });
  }
  initial() {
    this.criteriaService.criterias$.subscribe(data => {
      if (data) {
        if (data[this.paramId].alternatives) {
          this.criteriaName = data[this.paramId].name;
          // calculate first
          this.results = this.alternativeService.calculate(this.paramId);
          // insert data to chart.js
          this.createChart();
          // add data to table
          this.dataSource = this.results.alternatives.map((alternative) => {
            return {
              rank: alternative.rank,
              name: alternative.name,
              percentage: alternative.priorityVector * 100
            };
          }).sort((a, b) => {
            return a.rank - b.rank;
          });
        }
      }
    });
  }

  createChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.results.alternatives.map((x) => {
          return x.name;
        }),
        datasets: [
          {
            label: 'Priority Vector (%)',
            data: this.results.alternatives.map((x) => {
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
  goBack() {
    this.location.back();
  }
}
