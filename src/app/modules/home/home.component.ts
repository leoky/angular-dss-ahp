import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$: Observable<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(result => {
      this.user$ = this.userService.user$;
    });
  }

  logOut() {
    this.userService.logOut().subscribe();
  }
}
