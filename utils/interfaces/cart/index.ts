export interface ICart {
  productId: string;
  userId: string;
  quality: number;
  id: string;
}

export interface IAddCart {
  productId: string;
  userId: string;
  quality: number;
}

export interface ICartProduceDetail {
  id: string;
  userId: string;
  productId: string;
  quality: number;
  productName: string;
  productImages: string[];
  productPrice: number;
}