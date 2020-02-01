import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

}
