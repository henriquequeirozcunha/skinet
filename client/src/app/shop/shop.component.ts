import { ShopParams } from './../shared/models/ShopParams';
import { IProductType } from './../shared/models/ProductType';
import { IBrand } from './../shared/models/Brand';
import { ShopService } from './shop.service';
import { IProduct } from './../shared/models/Product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IProductType[];
  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price low to High', value: 'priceAsc'},
    {name: 'Price High to low', value: 'priceDesc'}
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe(
      (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{id: 0, name: 'All'}, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{id: 0, name: 'All'}, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number): void {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number): void {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string): void {
    this.shopParams.sort = sort;
    this.getProducts();
  }
  onPageChanged(event: any): void {
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }
}
