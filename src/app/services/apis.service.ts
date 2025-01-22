import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  readonly wishlistRoute:string ='/carts'
  readonly apiUrl:string ='http://localhost:3000';
  readonly reviewsRoute: string = '/api/v1/reviews';
  readonly productsRoute: string = '/api/v1/products';
  readonly categoryRoute: string = '/api/v1/categories';
  readonly  subcategoryRoute: string = '/api/v1/subcategories';
  readonly authRoute: string = '/api/v1/auth';
}
