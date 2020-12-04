import { BasketService } from './../basket/basket.service';
import { IBasketTotals } from './../shared/models/Basket';
import { Observable } from 'rxjs';
import { AccountService } from './../account/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  basketTotals$: Observable<IBasketTotals>;

  constructor(private fb: FormBuilder, private accountService: AccountService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValues();
    this.basketTotals$ = this.basketService.basketTotalSource$;
  }

  createCheckoutForm(): void {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });
  }

  getAddressFormValues(): void {
    this.accountService.getUserAddress().subscribe(address => {
      if (address){
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    }, error => {
      console.log(error);
    });
  }

}
