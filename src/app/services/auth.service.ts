import { Injectable } from '@angular/core';
import {ApisService} from './apis.service';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject,Observable} from 'rxjs';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly apiUrl: string = 'https://localhost:3000';
private readonly authRoute: string = '';
  loggedUser = new BehaviorSubject(null);


constructor(private _apisService: ApisService, private http: HttpClient ,private router: Router) {
  this.apiUrl = _apisService.apiUrl;
  this.authRoute = _apisService.authRoute;

}


}
