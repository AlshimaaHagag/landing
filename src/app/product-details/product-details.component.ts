import { Component, OnInit,OnDestroy } from '@angular/core';
import{ActivatedRoute} from '@angular/router';
import{ProductService}from '../services/product.service';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';
import {WishlistService} from '../services/wishlist.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ReviewsService} from '../services/reviews.service';
import {AuthService} from '../services/auth.service';
import {Pagination} from '../../interfaces/pagination';


@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    DecimalPipe,
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy{

  private subscription: any;
  private productId: string = '';
  product: any;
  loggedUser: any;
  errorMsg: string = '';
  category: string = '';
  stars:number[] =[5,4,3,2,1];

  reviewsForm = new FormGroup({
    comment: new FormControl(null, [Validators.required]),
    rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)])
  })


  constructor(private _activatedRoute: ActivatedRoute, private _productService: ProductService,
    private _wishlistService: WishlistService, private _reviewsService: ReviewsService,
    private _authService: AuthService) {
  }

  loadProduct(productId: string) {
    this.subscription = this._productService.getProduct(productId).subscribe({
      next: (res:any) => {
        this.product = res.data;
        console.log(this.product)
      },
      error: (err:any) => {
        err.error.message ? this.errorMsg = err.error.message : this.errorMsg = 'Invalid product details';
        // err.message ? this.errorMsg = err.message : this.errorMsg = err.errors[0].msg;
      }
    })
}
  addToWishlist(productId: string) {
    this._wishlistService.addToWishlist(productId).subscribe({
      next: (res:any) => {
        alert('Product Added to your wishlist')
      },
      error: (err:any) => {
        alert(`${err.error.message}`);
      }
    })
  }

  addReview(productId: string, formData: FormGroup) {
    this._reviewsService.addReview(productId, formData.value).subscribe({
      next: (res:any) => {
        this.loadProduct(productId);
        alert('Success');
      },
      error: (err:any) => {
        if (err.status === 400) alert(`${err.error.errors[0].msg}`)
        else alert(`${err.error.message}`)
      }
    })
  }

  deleteReview(reviewId: string) {
    this._reviewsService.deleteReview(reviewId).subscribe({
      next: (res:any) => {
        this.loadProduct(this.productId);
        alert('Success');
      },
      error: (err:any) => {
        if (err.status === 400) alert(`${err.error.errors[0].msg}`)
        else alert(`${err.error.message}`)
      }
    })
  }

  ngOnInit() {
    this.productId = this._activatedRoute.snapshot.params['id'];
    this.loadProduct(this.productId);
    this.loggedUser = this._authService.loggedUser.getValue();

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
