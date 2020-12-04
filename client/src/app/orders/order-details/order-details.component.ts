import { OrdersService } from './../orders.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/Order';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  order: IOrder;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private orderService: OrdersService
  ) {
    this.bcService.set('@orderDetails', '');
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation && navigation.extras && navigation.extras.state;
    // if (state) {
    //   this.order = state as IOrder;
    // }
  }

  ngOnInit(): void {
    this.loadOrder();
  }

  // tslint:disable-next-line: typedef
  loadOrder() {
     this.orderService.getOrder(+this.activatedRoute.snapshot.params.id).subscribe((order: IOrder) => {
       this.order = order;
       this.bcService.set('@orderDetails', ( `Order# ${this.order.id} - ${this.order.status}`));
     }, error => {
       console.log(error);
     });
  }
}
