import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
// service
import { User } from 'src/app/core/models/user';
import { CriteriaService } from './services/criteria.service';
import { UserService } from 'src/app/core/services/user.service';
import { DecisionService } from './services/decision.service';
import { Criteria } from './models/criteria';
import { AlternativeService } from './services/alternative.service';
// component
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-ahp',
  templateUrl: './ahp.component.html',
  styleUrls: ['./ahp.component.scss']
})
export class AhpComponent implements OnInit {
  // for navbar
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  // sidebar
  @ViewChild('drawer', {static: true}) drawer: MatSidenav;

  showNav = true;
  sidebars = [
    {
      name: 'Criteria',
      link: 'criteria',
      title: ''
    },
    {
      name: 'Alternative',
      link: 'alternative',
      title: ''
    }
  ];
  // auto update value if updated
  criterias$: Observable<Criteria[]> = this.criteriaService.criterias$;

  user$: Observable<User> = this.userService.user$;

  // decision name control
  dNameControl = new FormControl();

  constructor(private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog,
              private userService: UserService,
              private criteriaService: CriteriaService,
              private alternativeService: AlternativeService,
              private decisionService: DecisionService) {
    // for hide navbar in mylist route
    this.router.events.subscribe(event => {
      if ( event instanceof NavigationEnd) {
        if (event.url === '/ahp/0/my-list' && this.drawer.open) {
          this.drawer.close();
          this.showNav = false;
        } else {
          this.showNav = true;
          this.drawer.open();
        }
      }
    });
  }

  ngOnInit() {
    this.userService.getUser().subscribe();
    this.route.paramMap.subscribe(params => {
      if (params.get('id') === 'create') {
        // this.decisionService.createNew();
        this.updateDecision();
      } else {
        // get data from server
        this.decisionService.getDecision(params.get('id')).subscribe(() => {
          this.updateDecision();
        });
      }
    });
  }

  createNew() {
    // check if it has been edited
    if (this.criteriaService.criterias$.value || this.alternativeService.alternatives$.value) {
      // dialog
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;

      this.matDialog.open(DialogConfirmComponent, dialogConfig)
      .afterClosed().subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/ahp/create');
          // reset data
          this.decisionService.createNew();
          this.updateDecision();
        }
      });
    }
  }

  // form control
  updateDecision() {
    // set default name
    if (this.decisionService.decision.name) {
      this.dNameControl.patchValue(this.decisionService.decision.name);
    }
    // update if name changed
    this.dNameControl.valueChanges.subscribe(value => {
      this.decisionService.decision.name = value;
    });
  }

  logOut() {
    this.userService.logOut().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
