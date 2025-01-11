 import {Component, OnInit ,OnDestroy} from '@angular/core';
import {ApiResponse, Category, Product, ProductService, Subcategory} from '../services/product.service';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {DescriptionPipe} from '../pipes/description.pipe';
import {Router} from '@angular/router';
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
    allCategories: Category[] = [];
    // allSubcategories: Record<string, { id: string, name: string }[]> = {};
    allSubcategories: { [key: string]: Subcategory[] } = {};

    // allCategories: string[] = ['laptops' ,'clothes' ,'mobile_phones'];
    // allSubcategories: Record<string, string[]> ={
    //   laptops:['Mac','Lenovo','msi','Asus','Acer','HP','Dell'],
    //   clothes:['women' ,'man','shoes'],
    //   mobile_phones:['infinix','Xiaomi','realme','oppo','SAMSUNG','Apple']
    // };

    selectedSubcategory: string |null = null;
    selectedCategory: string| null = null;
    categories: any[] = [];
    subcategories: any = [];
     searchValue: string = '';
    value: string = '';
    categoryId: string = '';
    subcategoryId: string = '';
    pagination: Pagination = {};
    private subscription: any;
    private page: number = 1;
    private limit: number = 12;
    private search: string = '';


    constructor(private productService: ProductService, private router: Router) {
    }

    loadProducts(): void {

      // this.subscription = this.productService.getAllProducts(this.page, this.limit, 'category,name', this.search).subscribe({
      //   next: (res) => {
      //     this.products = res.data ;
      //     this.pagination = res.pagination;
      //   }
     // / })



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

    // loadSubcategories(categoryId: string): void {
    //   this.productService.getSubcategoriesByCategoryId(categoryId).subscribe({
    //     next: (subcategories: Subcategory[]) => {

          // if (Array.isArray(subcategories)) {
          //   this.allSubcategories[categoryId] = subcategories;
          // } else {
          //   console.error('Expected subcategories to be an array');
          // }
        // },
        // error: (err) => console.error('Error loading subcategories:', err),
      // });
    // }


///////////////////

    // loadCategories() {
    //   this.productService.getAllCategories().subscribe({
    //     next: (response:Category[]) => {
    //       console.log(response); // افحص الاستجابة
    //
    //         this.allCategories = response;
    //
    //     },
    //     error: (err) => console.error(err),
    //   });
    // }
    /////////////////////////
    //   onCategorySelect(event: Event): void {
    //   const target = event.target as HTMLSelectElement;
    //   const selectedValue = target.value;
    //
    //   if (selectedValue) {
    //     this.selectedCategory = selectedValue;
    //     this.loadSubcategories(selectedValue);
    //   } else {
    //     this.selectedCategory = null;
    //     this.allSubcategories = {};
    //   }
    // }
    /////////////////////////
    // onSubcategorySelect(event: Event): void {
    //   const target = event.target as HTMLSelectElement;
    //   const selectedValue = target.value;
    //
    //   if (selectedValue) {
    //     this.selectedSubcategory = selectedValue;
    //   } else {
    //     this.selectedSubcategory = null;
    //   }
    // }


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
    // this.loadCategories()
    // this.loadFilteredProducts('all','all');
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

    protected readonly HTMLSelectElement = HTMLSelectElement;
  }
