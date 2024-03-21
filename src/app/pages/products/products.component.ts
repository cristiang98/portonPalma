import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../models/product/product.model';
import { ApiProductsService } from '../../services/products/api-products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  
  originalProductsList: IProduct[] = [];
  productList: IProduct[] = [];
  productList2: IProduct[] = [];
  selectedCategory: string = 'Filtrar por Categoría';

  private _apiProductsService = inject(ApiProductsService);

  ngOnInit(): void {

    this._apiProductsService.getProducts().subscribe((data: IProduct[]) => {
      this.originalProductsList = data;
      this.productList = [...this.originalProductsList];
      this.productList2 = this.filterProducts(this.originalProductsList);
    });

  }

  filterProducts(productList: IProduct[]) {
    return productList.filter((product, index, self) =>
      index === self.findIndex((p) => p.category === product.category)
    );
  }

  filterByCategory(category: string) {
    this._apiProductsService.getProducts().subscribe((data: IProduct[]) => {
      this.originalProductsList = data;
      this.productList = this.originalProductsList.filter(product => product.category === category);
      this.selectedCategory = category;
    });

  }

  lista(){
    this.productList = [...this.originalProductsList];
  }

}
