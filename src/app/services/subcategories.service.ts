import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subcategory } from '../../interfaces/subcategory';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  private apiUrl = '/api/v1/subcategories'; // تأكدي من أن الرابط صحيح

  constructor(private http: HttpClient) {}

  // الحصول على جميع الفئات الفرعية
  getAllSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.apiUrl);
  }

  // إنشاء فئة فرعية جديدة
  createSubcategory(subcategory: Subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(this.apiUrl, subcategory);
  }

  // حذف فئة فرعية
  deleteSubcategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
