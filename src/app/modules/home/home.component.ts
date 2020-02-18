import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$: Observable<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.userService.user$) {
      this.user$ = this.userService.user$;
    }
  }

}
