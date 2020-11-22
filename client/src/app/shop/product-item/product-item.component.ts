import { BasketService } from './../../basket/basket.service';
import { IProduct } from '../../shared/models/Product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;


  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }

}
