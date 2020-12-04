import { OrdersService } from './../orders.service';
import { IOrder } from './../../shared/models/Order';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderList: IOrder[];

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
  }

  // tslint:disable-next-line: typedef
  getOrders() {
    this.ordersService.getOrdersForUser().subscribe((response) => {
      this.orderList = response;
    });
  }

  // tslint:disable-next-line: typedef
  moveToOrderDetail(order: IOrder) {
    const navigationExtras: NavigationExtras = { state: order };
    this.router.navigate(['orders/' + order.id], navigationExtras);
  }
}
