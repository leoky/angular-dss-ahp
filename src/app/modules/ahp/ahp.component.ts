import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// service
import { CriteriaService } from './services/criteria.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Criteria } from './models/criteria';
import { User } from 'src/app/shared/models/user';

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

  constructor(private breakpointObserver: BreakpointObserver,
              private userService: UserService,
              private criteriaService: CriteriaService) { }

  ngOnInit() {
    if (this.userService.user$) {
      this.user$ = this.userService.user$;
    }
  }

}
