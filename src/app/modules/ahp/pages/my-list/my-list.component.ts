import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecisionService } from '../../services/decision.service';
import { Decision } from '../../models/decision';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  decisions: Decision[];

  constructor(private decisionService: DecisionService,
              private userService: UserService,
              private route: Router) { }

  ngOnInit() {
    this.userService.getUser().subscribe(data => {
      if (data) {
        this.getData();
      } else {
        this.route.navigateByUrl('/login');
      }
    });
  }

  getData() {
    this.decisionService.getDecisions().subscribe(result => {
        this.decisions = result;
    });
  }

  delete(id: string) {
    this.decisionService.delete(id).subscribe(result => {
      this.getData();
    });
  }
}
