 import {Component, OnInit ,OnDestroy} from '@angular/core';
import { Product, ProductService} from '../services/product.service';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {DescriptionPipe} from '../pipes/description.pipe';
import {ActivatedRoute, Router} from '@angular/router';
  import{RouterModule} from '@angular/router';
  import {Pagination} from '../../interfaces/pagination';
  import {FormsModule} from '@angular/forms';
  import {CommonModule} from '@angular/common';
 import {elementAt} from 'rxjs';

  @Component({
    selector: 'app-products',
    imports: [
      CurrencyPipe,
      DecimalPipe,
    CommonModule,
      DescriptionPipe,
      RouterModule,
      FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy {
    products: any[] = [];
    categoryId: string | null = null;
    subcategoryId: string | null = null;

    searchValue: string = '';
    value: string = '';
    pagination: Pagination = {};
    private subscription: any;
    private page: number = 1;
    private limit: number = 12;
    private search: string = '';


    constructor(private productService: ProductService, private router: Router ,private route:ActivatedRoute) {
    }

    loadProducts(): void {
      this.productService.getAllProducts(this.page,this.limit,'category,name',this.search).subscribe({
        next: (res: any) => {
          console.log('Response from api :', res)
          this.products = res.data || res;
          this.products = Array.isArray(res) ? res : res.data;
          console.log('products', this.products);
          this.pagination = res.pagination;
        },
        error: err => {
          alert('failed to load products');
          console.log(err);
        }
      })
    }



    //////////////////////



    addToCart(productId: string): void{

    //console.log(`product is added to${productId}`);
    this.productService.addProductToCart(productId).subscribe({
      next: (res: any) => {
        console.log(`product ${productId} added to cart`);
        alert('product  added to cart ');
      },
      error: err => {
        console.log(err);
        alert('failed to add to cart');
      }
    });
  }
  searchProducts(value: string) {
    this.searchValue = value;
    this.productService.getAllProducts(1 ,20 ,'name','').subscribe({
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

  changePage(page: number) {
    this.page = page;
    this.loadProducts()
  }

  ngOnInit() {
    this.loadProducts()

    this.route.queryParams.subscribe(params => {
      this.categoryId = params['category'] || null;
      this.subcategoryId = params['subcategory'] || null;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

    protected readonly HTMLSelectElement = HTMLSelectElement;
  }
