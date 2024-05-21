import { Component, Inject, OnInit, inject } from '@angular/core';
import { ISale } from '../../../models/sale/sale.model';
import { SaleService } from '../../../services/sale/sale.service';
import { CustomFirstLetterUppercasePipe } from '../../../pipe/custom-first-letter-uppercase.pipe';
import { CustomCapitalizePipe } from '../../../pipe/custom-capitalize.pipe';
import { CustomCurrencyPipe } from '../../../pipe/custom-currency.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomCurrencyPipe, CustomCapitalizePipe, CustomFirstLetterUppercasePipe],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{

  saleHistory: ISale[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  private saleService = inject(SaleService);

  ngOnInit() {
    this.saleService.getSaleHistory().subscribe((saleHistory: ISale[]) => {
      this.saleHistory = saleHistory;
      this.totalPages = Math.ceil(this.saleHistory.length / this.itemsPerPage);
      console.log(this.saleHistory);
    });
  }

  getNameProduct(value: any): string {
    if (typeof value === 'object' && value !== null && 'nameProduct' in value) {
      return value.nameProduct;
    } else {
      return '';
    }
  }

}
