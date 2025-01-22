import { Component, OnInit } from '@angular/core';
import { SubcategoriesService } from '../services/subcategories.service';
import { Subcategory } from '../../interfaces/subcategory.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent implements OnInit {
  subcategories: Subcategory[] = [];

  constructor(private subcategoriesService: SubcategoriesService) {}



  loadSubcategories(): void {
    this.subcategoriesService.getAllSubcategories().subscribe({
      next: (res: any) => {
        console.log('Subcategories:',res);
        this.subcategories = res.data || res;
      },
      error: (err:any) => {
        console.error('Failed to load subcategories:', err);
      }
    });
  }
  ngOnInit(): void {
    this.loadSubcategories();
  }
}
