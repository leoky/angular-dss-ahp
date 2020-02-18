import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

}
