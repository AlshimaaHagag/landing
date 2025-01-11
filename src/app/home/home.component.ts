import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {BestSellersComponent} from '../best-sellers/best-sellers.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    BestSellersComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
