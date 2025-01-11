import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApisService} from './apis.service';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private  readonly reviewsRoute: string = '';
  private readonly productsRoute: string = '';

  constructor(private http: HttpClient, private _apisService: ApisService) {
    this.apiUrl = _apisService.apiUrl;
    this.reviewsRoute = _apisService.reviewsRoute;
    this.productsRoute = _apisService.productsRoute;


  }
  getReviews(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.reviewsRoute}/my?page=${page}&limit=${limit}`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
  }

  addReview(productId: string, formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.productsRoute}/${productId}/reviews?lang=en`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }

  updateReview(reviewId: string, formData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.reviewsRoute}/${reviewId}?lang=en`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }
  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.reviewsRoute}/${reviewId}?lang=en`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }

}
