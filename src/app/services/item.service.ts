import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly items: Item[] = [
    {
      id: '1',
      name: 'Bananas',
      shortDescription: 'Fresh, ripe bananas (per lb).',
      description:
        'Fresh bananas with a sweet, mellow flavor. Great for smoothies, oatmeal, and quick snacks.',
      price: 0.59,
      imageUrl: 'https://placehold.co/1200x800/png?text=Bananas',
    },
    {
      id: '2',
      name: 'Whole Milk',
      shortDescription: '1 gallon, rich and creamy.',
      description:
        'Whole milk with a creamy taste. Ideal for coffee, cereal, baking, and everyday use.',
      price: 3.49,
      imageUrl: 'https://placehold.co/1200x800/png?text=Whole%20Milk',
    },
    {
      id: '3',
      name: 'Eggs',
      shortDescription: 'Grade A large eggs (dozen).',
      description:
        'A dozen large eggs. Perfect for breakfast, baking, and meal prep.',
      price: 2.99,
      imageUrl: 'https://placehold.co/1200x800/png?text=Eggs',
    },
    {
      id: '4',
      name: 'Roma Tomatoes',
      shortDescription: 'Juicy tomatoes (per lb).',
      description:
        'Roma tomatoes that are great for salads, sauces, and roasting. Bright flavor and firm texture.',
      price: 1.29,
      imageUrl: 'https://placehold.co/1200x800/png?text=Tomatoes',
    },
    {
      id: '5',
      name: 'Chicken Breast',
      shortDescription: 'Boneless, skinless (per lb).',
      description:
        'Lean boneless, skinless chicken breast. Versatile protein for grilling, baking, or pan-searing.',
      price: 4.99,
      imageUrl: 'https://placehold.co/1200x800/png?text=Chicken%20Breast',
    },
    {
      id: '6',
      name: 'Brown Rice',
      shortDescription: '2 lb bag, pantry staple.',
      description:
        'Whole-grain brown rice with a nutty flavor. A healthy base for bowls, stir-fries, and sides.',
      price: 2.49,
      imageUrl: 'https://placehold.co/1200x800/png?text=Brown%20Rice',
    },
  ];

  getFeaturedItems(): Item[] {
    return [...this.items];
  }

  search(query: string): Item[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return this.getFeaturedItems();
    }

    return this.items.filter((item) => {
      const haystack = `${item.name} ${item.shortDescription} ${item.description}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }
}
