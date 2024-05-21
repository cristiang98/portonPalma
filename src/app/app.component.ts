import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from './services/admin/admin.service';
import { LoginComponent } from './pages/login/login.component';
import { UserLoginRequest } from './models/user/user.model';
import { LoginService } from './services/login/login.service';
import { User } from './models/userPrueba/userPrueba.model';
import { CartServiceService } from './services/cart-service.service';
import { IProduct } from './models/product/product.model';
import { ICart } from './models/cart/cart.model';
import { HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SaleService } from './services/sale/sale.service';
import { ApiProductsService } from './services/products/api-products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalSaleComponent } from './pages/modal-sale/modal-sale.component';
import { ISale } from './models/sale/sale.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  cart: ICart | null = null;
  title = 'porton-de-la-palma';
  menuOption: string = '';
  showNavbar: boolean = true;
  private _loginService = inject(LoginService);
  private _cartService = inject(CartServiceService);
  private _saleService = inject(SaleService);
  private _snackBar= inject(MatSnackBar);
  private _dialog = inject(MatDialog);
  private authService = inject(LoginService);
  sale:ISale = {
    id: 0,
    total: 0,
    userEmail: ' ',
    dni: ' ',
    items: [],
    date: ''
};

  currentUser: User | null = null;
  name: string = '';
  rol: string = '';
  

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Determina si el navbar debe mostrarse según la ruta actual
        this.showNavbar = !['/admin', '/admin/horse/v1', '/admin/product/v1', '/admin/event/v1', '/admin/services/v1', '/admin/show-sale'].includes(event.url);
      }
    });

    // Suscríbete a la información del usuario
    this._loginService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.name = user.sub;
        this.rol = user.role;
      }
      else {
        this.currentUser = null;
        this.name = '';
        this.rol = '';
      }
    });
  }
 
  ngOnInit() {
    this._cartService.updateCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  logout() {
    this._loginService.logout().subscribe(() => {
      // Limpiar los datos del usuario
      this.currentUser = null;
      this.name = '';
      this.rol = '';
  
      // Navegar al home
      this.router.navigate(['/home']);
    });
  }


  onOption(option: string) {
    this.menuOption = option;
  }

  removeItem(nameProduct: string) {
    this._cartService.removeItem(nameProduct).subscribe(() => {
      this._cartService.getCart().subscribe(cart => {
        this.cart = cart;
      });
    });
  }

  emptyCart() {
      if (this.currentUser && this.currentUser.token) {
          const token = this.currentUser.token;
          this._cartService.emptyCart(token).subscribe(() => {
              this._cartService.getCart().subscribe(cart => {
                  this.cart = cart;
              });
          });
      } else {
          console.error('currentUser or currentUser.token is undefined');
      }
  }

  successfulSale() {
    this._saleService.successfulSale().subscribe((sale) => {
      window.location.href = sale;

    });
  }


}
