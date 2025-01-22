import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subcategory } from '../../interfaces/subcategory.interface';
import {ApisService} from './apis.service';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
   // تأكدي من أن الرابط صحيح
  private apiUrl = 'http://localhost:3000';
  private  readonly  productsRoute: string = '/api/v1/products';
  private  readonly categoryRoute: string = '/api/v1/categories';
  private  readonly subcategoryRoute: string = '/api/v1/subcategories';

  constructor(private http: HttpClient,private apisService: ApisService ) {
    this.apiUrl = apisService.apiUrl;
    this.productsRoute =  apisService.productsRoute;
    this.categoryRoute=  apisService.categoryRoute;
    this.subcategoryRoute =  apisService.subcategoryRoute;

  }

  // الحصول على جميع الفئات الفرعية
  getAllSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.apiUrl}${this.subcategoryRoute}`);
  }


}
