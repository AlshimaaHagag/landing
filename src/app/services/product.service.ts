  import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ApisService} from './apis.service';
import {HttpParams} from '@angular/common/http';
import{FormsModule} from '@angular/forms';
export interface Product  {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    subcategory: string;
    image: string;

}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000';
private  readonly  productsRoute: string = '/api/v1/products';
private  readonly categoryRoute: string = '/api/v1/categories';
private  readonly subcategoryRoute: string = '/api/v1/subcategories';

  constructor(private apisService: ApisService , private http: HttpClient) {
    this.apiUrl = apisService.apiUrl;
    this.productsRoute =  apisService.productsRoute;
   this.categoryRoute=  apisService.categoryRoute;
   this.subcategoryRoute =  apisService.subcategoryRoute;
}


  getAllProducts(page:number=1 ,limit:number=20 ,sort:string='name',search:string): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.productsRoute}?page=${page}&limit=${limit}&sort=${sort}&search=${search}`,{withCredentials:true});
}


  getProduct(ProductId: string): Observable<any> {
    return this.http.get<Product>(`${this.apiUrl}${this.productsRoute}/${ProductId}?lang=en`, {withCredentials:true});

  }



  addProductToCart(productId:string): Observable<Product> {
    return this.http.put<any>(`${this.apiUrl}/api/v1/carts/${productId}`, productId);
  }
}

