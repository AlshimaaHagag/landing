import {Injectable} from '@angular/core';
import {ApisService} from './apis.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly apiUrl:string = 'https://fakestoreapi.com/products';
  private readonly wishlistRoute: string = '/carts';

  constructor(private _apisService: ApisService, private http: HttpClient) {
    this.apiUrl = _apisService.apiUrl;
    this.wishlistRoute = _apisService.wishlistRoute;
  }

  getWishlist(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.wishlistRoute}?lang=en`, {
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
      withCredentials: true
    })
  }

  addToWishlist(productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.wishlistRoute}?lang=en`, {productId}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.wishlistRoute}/${productId}?lang=en`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }
}


