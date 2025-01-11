import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe, DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DescriptionPipe} from '../pipes/description.pipe';
import {ProductService} from '../services/product.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-best-sellers',
  imports: [
    DecimalPipe,
    RouterLink,
    CurrencyPipe,
    DescriptionPipe,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss'
})
export class BestSellersComponent  implements OnInit,OnDestroy{
  products: any[] = [];
  private subscription: any;
  searchValue: string='';

  constructor(private _productService: ProductService) { }

  // Load products from  API
  loadProducts() {
    this.subscription = this._productService.getAllProducts(1,20,'name','').subscribe({
      next: (res: any) => {
        this.products = res.data.slice(2,14);

      },
      // error: (err: any) => {
      //   console.error('Error fetching products:', err);
      //   alert('Failed to load products. Please try again later.');
      // }
    });

  }

  searchProducts(value: string) {
    this.searchValue = value;
    this._productService.getAllProducts(1,20,'name','').subscribe({
      next: (res: any) => {
        this.products = res.data.filter((product: any) =>
          product.name.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      },
      error: err => {
        console.log(err);
        alert('failed to load products');
      }
    });
  }



  // Add to cart simulation
  addToCart(productId: string) {
    // Since this is a fake API, we simulate a successful response
    alert(`Product  added to cart successfully!`);
  }

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
