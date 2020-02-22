import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material';
// service
import { CriteriaService } from './services/criteria.service';
import { UserService } from 'src/app/core/services/user.service';
import { DecisionService } from './services/decision.service';
import { User } from 'src/app/core/models/user';
import { Criteria } from './models/criteria';

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

  user$: Observable<User>;

  // decision name control
  dNameControl = new FormControl('Untitled AHP');

  constructor(private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private criteriaService: CriteriaService,
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
    this.route.paramMap.subscribe(params => {
      if (params.get('id') === 'create') {
        this.decisionService.createNew();
      } else {
        if (params.get('id')) {
          this.decisionService.getDecision(params.get('id')).subscribe();
        }
      }
    });
    this.getUser();
    this.updateDecision();
  }

  // form control
  updateDecision() {
    this.decisionService.decision.name = this.dNameControl.value;
    this.dNameControl.valueChanges.subscribe(value => {
      this.decisionService.decision.name = value;
    });
  }

  // for user
  getUser() {
    this.userService.getUser().subscribe(result => {
      this.user$ = this.userService.user$;
    });
  }
  logOut() {
    this.userService.logOut().subscribe();
  }
}
