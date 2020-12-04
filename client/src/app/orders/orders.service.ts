import { IOrder } from './../shared/models/Order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getOrdersForUser(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.baseUrl + 'orders');
  }

  // tslint:disable-next-line: typedef
  getOrder(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(this.baseUrl + 'orders/' + id);
  }


}
