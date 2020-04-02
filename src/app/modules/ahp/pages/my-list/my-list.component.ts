import { Component, OnInit } from '@angular/core';
import { DecisionService } from '../../services/decision.service';
import { Decision } from '../../models/decision';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  decisions: Decision[];

  constructor(private decisionService: DecisionService,
              private route: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.decisionService.getDecisions().subscribe(result => {
        this.decisions = result;
    },
    (err) => {
      this.route.navigateByUrl('/login');
    });
  }

  delete(id: string) {
    this.decisionService.delete(id).subscribe(result => {
      this.getData();
    });
  }
}
