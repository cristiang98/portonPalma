import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISale } from '../../models/sale/sale.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-sale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-sale.component.html',
  styleUrl: './modal-sale.component.css'
})
export class ModalSaleComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISale
  ) {}
}
