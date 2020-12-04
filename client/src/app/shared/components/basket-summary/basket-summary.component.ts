import { IBasketItem } from './../../models/Basket';

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { IOrderItem } from '../../models/Order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent implements OnInit {
  @Output()
  decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output()
  increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket = true;
  @Input() items: IBasketItem[] | IOrderItem[] = [];
  @Input() isOrder = true;

  constructor() {}

  ngOnInit(): void {}

  decrementItemQuantity(item: IBasketItem): void {
    this.decrement.emit(item);
  }
  incrementItemQuantity(item: IBasketItem): void {
    this.increment.emit(item);
  }
  removeBasketItem(item: IBasketItem): void {
    this.remove.emit(item);
  }
}
