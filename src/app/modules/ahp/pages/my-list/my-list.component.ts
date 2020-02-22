import { Component, OnInit } from '@angular/core';
import { DecisionService } from '../../services/decision.service';
import { Decision } from '../../models/decision';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  myList = ['sdssd', '2d1e12d', 'sdj1k2jdl'];
  decisions: Decision[];

  constructor(private decisionService: DecisionService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.decisionService.getDecisions().subscribe(result => {
      this.decisions = result;
    });
  }

  delete(id: string) {

  }
}
