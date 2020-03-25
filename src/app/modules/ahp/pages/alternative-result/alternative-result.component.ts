import { Component, OnInit, ElementRef } from '@angular/core';
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
              private elementRef: ElementRef,
              private alternativeService: AlternativeService) { }

  paramId: number;
  criteriaName: string;
  criteriaLength: number;
  cr = 0;

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
      if (data && data[this.paramId].alternatives) {
        // if (data[this.paramId].alternatives) {
          this.criteriaName = data[this.paramId].name;
          this.criteriaLength = data.length;
          // calculate first
          this.cr = this.alternativeService.setPV(this.paramId);
          // insert data to chart.js
          this.createChart(data[this.paramId].alternatives);
          // add data to table
          this.dataSource = data[this.paramId].alternatives.map((alternative) => {
            return {
              rank: alternative.rank,
              name: alternative.name,
              desc: alternative.desc,
              percentage: alternative.priorityVector * 100
            };
          }).sort((a, b) => {
            return a.rank - b.rank;
          });
        // }
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
  goBack() {
    this.location.back();
  }
}
