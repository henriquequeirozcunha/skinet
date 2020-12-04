import { IOrder } from './../../shared/models/Order';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-sucess',
  templateUrl: './checkout-sucess.component.html',
  styleUrls: ['./checkout-sucess.component.scss']
})
export class CheckoutSucessComponent implements OnInit {
  order: IOrder;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if (state){
      this.order = state as IOrder;
    }
   }

  ngOnInit(): void {

  }

  goToViewOrder(): void {
    const navigationExtras: NavigationExtras = { state: this.order };
    this.router.navigate(['orders'], navigationExtras);
  }

}
