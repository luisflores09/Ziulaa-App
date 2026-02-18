export interface Item {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  priceText?: string;
  imageUrl: string;

  source?: string;
  link?: string;
  rating?: number;
  ratingCount?: number;
}
