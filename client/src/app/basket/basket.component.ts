import { IBasketItem } from './../shared/models/Basket';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../shared/models/Basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<Basket>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  // tslint:disable-next-line: typedef
  removeBasketItem(item: IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }
  // tslint:disable-next-line: typedef
  incrementItemQuantity(item: IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }
  // tslint:disable-next-line: typedef
  decrementItemQuantity(item: IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }


}
