import { Component } from '@angular/core';
import { SaleInf } from '../../models/myHistory/saleInf.model';
import { SaleService } from '../../services/sale/sale.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-user.component.html',
  styleUrl: './history-user.component.css'
})
export class HistoryUserComponent {

  sales: SaleInf[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 1;
  totalPages: number = 0;



  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    this.saleService.getMyHistory().subscribe(sales => {
      this.sales = sales;
      this.totalPages = Math.ceil(this.sales.length / this.itemsPerPage);
    });
  }
}
