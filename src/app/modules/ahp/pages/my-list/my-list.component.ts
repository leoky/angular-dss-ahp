import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DecisionService } from '../../services/decision.service';
import { Decision } from '../../models/decision';
import { UserService } from 'src/app/core/services/user.service';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  decisions: Decision[];

  constructor(private decisionService: DecisionService,
              private userService: UserService,
              private matDialog: MatDialog,
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
    // dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    // parsing data to dialog
    dialogConfig.data = {
      title: 'Delete',
      description: 'Are you sure you want to do this?'
    };

    this.matDialog.open(DialogConfirmComponent, dialogConfig)
    .afterClosed().subscribe(result => {
      if (result) {
        this.decisionService.delete(id).subscribe(() => {
          this.getData();
        });
      }
    });

  }
}
