import { Component,OnInit } from '@angular/core';
import {RouterLink} from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';
import { Category } from '../../interfaces/category.interface';
import { Subcategory } from '../../interfaces/subcategory.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',



})
export class NavbarComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoriesService: CategoriesService, private subcategoriesService: SubcategoriesService){ }
  ngOnInit(): void {
    this.loadCategories();
    //this.loadSubcategoriesForCategories()
  }
  loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res: any) => {
        console.log( 'Categories',res);
        this.categories = res.data || res;
        this.loadSubcategoriesForCategories();
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      },
    });
  }
  loadSubcategoriesForCategories(): void {
    this.categories.forEach((category) => {
      this.subcategoriesService.getAllSubcategories().subscribe({
        next: (res: any) => {
          console.log( 'Subcategories for category:',category._id,res);
          category.subcategories = res.data.filter(
            (subcategory: Subcategory) => subcategory.category === category._id
          );
        },
        error: (err) => {
          console.error('Failed to load subcategories:', err);
        },
      });
    });
  }

}
