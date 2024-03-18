import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';
  private currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = {
      id: 0,
      userid: "",
    };
  }
  getUser(): Observable<User> {
      return this.http.get<User>(this.baseUrl + '/api/user').pipe(tap(o => (this.currentUser = o)));
  }

  setUser(user: User): void {
    this.currentUser = user;
  }

}
  


