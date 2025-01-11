import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';

export const routes: Routes = [

{path:"" ,redirectTo:'home' ,pathMatch:"full"},
  {path:'home',title:'Home',loadComponent:() =>import("./home/home.component").then(c=>c.HomeComponent)},

  {
    path:'about-us',title:'About Us',loadComponent:() =>import("./about-us/about-us.component").then(c=>c.AboutUsComponent)
  },

  {
    path: "products",
    children: [
      {
        path: '',
        title: 'products',
        loadComponent: () => import('./products/products.component').then(c => c.ProductsComponent)
      },
      //product details => dynamic so we get it by id
      {
        path: ':id',
        title: 'product-details',
        loadComponent: () => import('./product-details/product-details.component').then(c => c.ProductDetailsComponent)
      },
      {
        path:'products/:categoryId',
        title:'category',
        loadComponent:() => import('./products/products.component').then(c=>c.ProductsComponent)

      },
      {
        path:'products/:categoryId/:subcategoryId',
        title:'subcategory',
        loadComponent:() => import('./products/products.component').then(c => c.ProductsComponent)
      }

    ]
  },
  {
    path: '**',
    title: '404 Not Found',
    loadComponent: () => import('./notfound/notfound.component').then(c => c.NotfoundComponent)
  }

]

