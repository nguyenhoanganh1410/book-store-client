import { ICategory } from '../category';

export interface IProduct {
  id: string;
  name: string;
  desc: string;

  sold?: number;
  price: number;
  discount?: number;
  images: string[];
  category?: string;
}
