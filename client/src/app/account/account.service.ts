import { IAddress } from './../shared/models/Address';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IUser } from './../shared/models/User';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router ) { }


  // tslint:disable-next-line: typedef
  loadCurrentUser(token: string): Observable<null> | Observable<IUser> | Observable<void>  {
    if (token === null){
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }
  // tslint:disable-next-line: typedef
  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  // tslint:disable-next-line: typedef
  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email );
  }

  // tslint:disable-next-line: typedef
  getUserAddress() {
    return this.http.get(this.baseUrl + 'account/address');
  }
  // tslint:disable-next-line: typedef
  updateUserAddress(address: IAddress) {
    return this.http.put(this.baseUrl + 'account/address', address);
  }
}
