import {Subcategory} from './subcategory.interface';

export interface Category {
  _id?: string;
  name: string;
  image?: string;
  subcategories?: Subcategory[];
}
