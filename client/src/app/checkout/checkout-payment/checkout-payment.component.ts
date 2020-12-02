import { ToastrService } from 'ngx-toastr';
import { IOrder, IOrderToCreate } from './../../shared/models/Order';
import { CheckoutService } from './../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBasket } from 'src/app/shared/models/Basket';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.mapOrderToCreate(basket);

    console.log(basket);

    this.checkoutService
      .createOrder(orderToCreate)
      .subscribe((order: IOrder) => {
        this.toaster.success('Order Created Successfuly');
        this.basketService.deleteLocalBasket(basket.id);
        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navigationExtras);
      }, error => {
        this.toaster.error(error.message);
        console.log(error);
      });
  }
  // tslint:disable-next-line: typedef
  mapOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm
        .get('deliveryForm')
        .get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value,
    };
  }
}
