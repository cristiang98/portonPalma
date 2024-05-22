import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../models/product/product.model';
import { ApiProductsService } from '../../services/products/api-products.service';
import { CartServiceService } from '../../services/cart-service.service';
import { LoginService } from '../../services/login/login.service';
import { ICart } from '../../models/cart/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { CustomCurrencyPipe } from '../../pipe/custom-currency.pipe';
import { CustomCapitalizePipe } from '../../pipe/custom-capitalize.pipe';
import { CustomFirstLetterUppercasePipe } from '../../pipe/custom-first-letter-uppercase.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CustomCurrencyPipe, CustomCapitalizePipe, CustomFirstLetterUppercasePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  cart: ICart | null = null;
  originalProductsList: IProduct[] = [];
  productList: IProduct[] = [];
  productList2: IProduct[] = [];
  selectedCategory: string = 'Filtrar por Categoría';
  private _cartService = inject(CartServiceService);
  private _loginService = inject(LoginService);
  private _snackBar = inject(MatSnackBar);

  private _apiProductsService = inject(ApiProductsService);

  constructor() {
    this._cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {

    this._apiProductsService.getProducts().subscribe((data: IProduct[]) => {
      this.originalProductsList = data;
      this.productList = [...this.originalProductsList];
      this.productList2 = this.filterProducts(this.originalProductsList);
      console.log(this.productList2);
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

  lista() {
    this.productList = [...this.originalProductsList];
  }

  addToCart(product: IProduct) {
    if (product.idProduct !== undefined) {
      this._cartService.addProductToCart(product.idProduct).pipe(
        catchError(error => {
          if (error.status === 500) {
            this._snackBar.open('No se pudo agregar el producto al carrito. \nInicie sesion para agregar productos', 'Cerrar', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: 'my-snackbar',
            });
          } else {
            this._snackBar.open('Ocurrió un error al intentar agregar el producto al carrito.', 'Cerrar', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: 'my-snackbar',
            });
          }
          return of(false); // Devuelve un Observable que emite false
        })
      ).subscribe(success => {
        if (success !== false) {
          this._snackBar.open('Producto agregado al carrito', 'Cerrar', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: 'my-snackbar',
          });
  
          this._cartService.getCart().subscribe(cart => {
            this.cart = cart;
            console.log(this.cart === null ? 'Carrito vacío' : 'Carrito con productos');
            console.log(this.cart);
          });
        }
      });
    }
  }

  updateProducts() {
    this._apiProductsService.getProducts().subscribe((data: IProduct[]) => {
      this.originalProductsList = data;
      this.productList = [...this.originalProductsList];
      this.productList2 = this.filterProducts(this.originalProductsList);
    });
  }
}
