import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { MaterialModule } from '../material/material.module';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NgFor, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly searchControl = new FormControl<string>('', { nonNullable: true });

  items: Item[] = [];

  constructor(
    private readonly itemService: ItemService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.items = this.itemService.getFeaturedItems();
  }

  searchItems(): void {
    this.itemService.search(this.searchControl.value).subscribe((items) => {
      this.items = items;
    });
  }

  openItem(item: Item): void {
    this.dialog.open(ItemDialogComponent, {
      data: item,
      width: '90vw',
      height: '90vh',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'item-dialog-panel',
      autoFocus: false,
    });
  }
}
