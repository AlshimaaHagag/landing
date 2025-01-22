import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {BestSellersComponent} from '../best-sellers/best-sellers.component';
import {ProductsComponent} from '../products/products.component';
import{AboutUsComponent} from '../about-us/about-us.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    BestSellersComponent,
    ProductsComponent,
    AboutUsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
