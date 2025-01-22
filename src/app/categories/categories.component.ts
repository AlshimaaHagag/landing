import { Component, OnInit } from '@angular/core';
import{CategoriesService} from "../services/categories.service"
import { Category } from '../../interfaces/category.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}


  loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res: any) => {
        console.log('category:', res);
        this.categories = res.data || res;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }
  ngOnInit(): void {
    this.loadCategories();
  }

}
