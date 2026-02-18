import { Component, Inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MaterialModule } from '../material/material.module';
import { Item } from '../models/item';

@Component({
  selector: 'app-item-dialog',
  standalone: true,
  imports: [MaterialModule, CurrencyPipe],
  templateUrl: './item-dialog.component.html',
  styleUrl: './item-dialog.component.scss',
})
export class ItemDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly item: Item,
    private readonly dialogRef: MatDialogRef<ItemDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
