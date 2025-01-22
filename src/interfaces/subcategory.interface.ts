import { Category } from './category.interface';

export interface Subcategory {
  _id?: string;
  name: string;
  category: string | Category; // يمكن أن يكون Category كاملاً أو مجرد ID
  image?: string;
}
