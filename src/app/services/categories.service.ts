import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category.interface';
import {ApisService} from './apis.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
   //
  private apiUrl = 'http://localhost:3000';
  private  readonly  productsRoute: string = '/api/v1/products';
  private  readonly categoryRoute: string = '/api/v1/categories';
  private  readonly subcategoryRoute: string = '/api/v1/subcategories';

  constructor(private http: HttpClient,private apisService:ApisService){
    this.apiUrl = apisService.apiUrl;
    this.productsRoute =  apisService.productsRoute;
    this.categoryRoute=  apisService.categoryRoute;
    this.subcategoryRoute =  apisService.subcategoryRoute;

  }

  // الحصول على جميع الفئات
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}${this.categoryRoute}`);
  }

}
