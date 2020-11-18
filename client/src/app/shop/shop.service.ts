import { ShopParams } from './../shared/models/ShopParams';
import { IProductType } from './../shared/models/ProductType';
import { IBrand } from './../shared/models/Brand';
import { IPagination } from '../shared/models/Pagination';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { IProduct } from '../shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams): Observable<IPagination>{

    let params = new HttpParams();

    if (shopParams.brandId !== 0){
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0){
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.search){
      params = params.append('search', shopParams.search.toString());
    }
    params = params.append('sort', shopParams.sort.toString());
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getProduct(id : number): Observable<IProduct>{
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands(): Observable<IBrand[]>{
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(): Observable<IProductType[]>{
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
