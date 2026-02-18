import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';
import { Item } from '../models/item';

interface RapidApiProduct {
  title: string;
  source?: string;
  link?: string;
  price?: string;
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
  productId?: string;
  position?: number;
}

interface RapidApiSearchResponse {
  products: RapidApiProduct[];
}

@Injectable({ providedIn: 'root' })
export class RapidApiProductsService {
  constructor(private readonly http: HttpClient) {}

  search(query: string): Observable<Item[]> {
    const url = this.getSearchUrl();
    const params = new HttpParams().set('q', query);

    return this.http
      .get<RapidApiSearchResponse>(url, { params })
      .pipe(map((resp) => (resp.products ?? []).map((p) => this.mapProduct(p))));
  }

  private getSearchUrl(): string {
    const baseUrl = environment.api.baseUrl?.trim().replace(/\/$/, '') || '';
    const path = environment.api.searchPath ?? '/api/search';

    return baseUrl ? `${baseUrl}${path}` : path;
  }

  private mapProduct(product: RapidApiProduct): Item {
    const numericPrice = this.parsePrice(product.price);
    const id = product.productId || `${product.position ?? ''}-${product.title}`;

    return {
      id,
      name: product.title,
      shortDescription: product.source ? `Source: ${product.source}` : 'Grocery item',
      description: product.link ? `View listing: ${product.link}` : 'No description available.',
      price: Number.isFinite(numericPrice) ? numericPrice : 0,
      priceText: product.price,
      imageUrl: product.imageUrl || 'https://placehold.co/1200x800/png?text=Item',
      source: product.source,
      link: product.link,
      rating: product.rating,
      ratingCount: product.ratingCount,
    };
  }

  private parsePrice(price?: string): number {
    if (!price) return Number.NaN;
    const cleaned = price.replace(/[^0-9.]/g, '');
    return Number.parseFloat(cleaned);
  }
}
