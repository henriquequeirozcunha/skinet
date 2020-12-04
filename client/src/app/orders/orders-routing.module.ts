import { OrderComponent } from './order/order.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: ':id', component: OrderDetailsComponent, data: { breadcrumb: { alias: 'orderDetails' } }}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
