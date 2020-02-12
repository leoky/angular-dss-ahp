import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
// service
import { AlternativeService } from '../../services/alternative.service';
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
              private alternativeService: AlternativeService) { }

  paramId: number;
  criteriaName: string;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // + for change to be type number
      this.paramId = +params.get('id');

      if (params.get('id')) {

        if (this.alternativeService.altCrits) {

          this.criteriaName = this.alternativeService.altCrits[this.paramId].criteriaName;
          // calculate first
          this.alternativeService.calculate(this.paramId);
          // insert data to chart.js
          this.createChart();
          // add data to table
          this.dataSource = this.alternativeService.altCrits[this.paramId].alternatives.map((alternative) => {
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
        labels: this.alternativeService.altCrits[this.paramId].alternatives.map((x) => {
          return x.name;
        }),
        datasets: [
          {
            label: 'Priority Vector (%)',
            data: this.alternativeService.altCrits[this.paramId].alternatives.map((x) => {
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
  goBack() {
    this.location.back();
  }
}
