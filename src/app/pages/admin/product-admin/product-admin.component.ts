import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CustomFirstLetterUppercasePipe } from '../../../pipe/custom-first-letter-uppercase.pipe';
import { CustomCapitalizePipe } from '../../../pipe/custom-capitalize.pipe';
import { CustomCurrencyPipe } from '../../../pipe/custom-currency.pipe';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { Category, IProduct } from '../../../models/product/product.model';
import { LoginService } from '../../../services/login/login.service';
import { ApiProductsService } from '../../../services/products/api-products.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomCurrencyPipe, CustomCapitalizePipe, CustomFirstLetterUppercasePipe, NgClass],
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css'
})
export class ProductAdminComponent implements OnInit, OnDestroy{

  products: IProduct[] = []; // Inicializa la lista de produtos
  category1 = Category; // Inicializa la categoría
  categoryKeys = Object.keys(Category);// Inicializa las claves de la categoría
  newProduct: IProduct = {  // Inicializa el nuevo producto
    nameProduct: '',
    description: '',
    price: 0,
    stock: 0,
    imagePath: '',
    category: Category.ALIMENTACION,

  };

  productById :any = null;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  selectedProductId: number = 0;
  private productsSub: Subscription | null = null;

  private _loginService = inject(LoginService);
  private _productService = inject(ApiProductsService);
  private _snackBar = inject(MatSnackBar);

  constructor() { }

  ngOnInit() {
    this.getProducts();

    // Suscribirse a los cambios en la lista de productos
    this.productsSub = this._productService.getProductsUpdateListener().subscribe((products: IProduct[]) => {
      this.products = products;
    });

    
  }

  ngOnDestroy() {
    this.productsSub?.unsubscribe();
  }

  getProducts() {
    this._productService.getProducts().subscribe(products => {
      this.products = products;
      console.log('products:', products);
    });
  }


  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.selectedFile = file; // Assign the selected file to this.selectedFile
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  selectProduct(product: IProduct) {
    const imagePath = product.imagePath;
    if (imagePath) {
      // Convert the horse's image URL to a File
      fetch(imagePath)
        .then(response => response.blob())
        .then(blob => {
          // Extract the file name from the imagePath
          const url = new URL(imagePath);
          const pathname = url.pathname;
          const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
  
          this.selectedFile = new File([blob], filename, {type: 'image/jpeg'});
          this.previewUrl = URL.createObjectURL(this.selectedFile);
          this.productById = product;
          if (product.idProduct === undefined) {
            throw new Error('product.idProduct is undefined');
          }
          this.selectedProductId = product.idProduct;
        })
        .catch(error => console.error('Error:', error));
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.selectedFile) {
      // Obtiene el rol del usuario
      const userRole = this._loginService.getRole();
      // Verifica si el rol del usuario es 'ADMIN'
      if (userRole === 'ADMIN') {
        // Verifica si el token ha expirado
        if (this._loginService.isTokenExpired()) {
          console.log('El token ha expirado');
        } else {
          console.log('El token no ha expirado');
          this._productService.addProduct( this.selectedFile,this.newProduct).subscribe(() => {
            this.getProducts(); // Actualiza la lista de caballos

            // Muestra un mensaje de confirmación
            this._snackBar.open('Producto agregado', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: 'my-snackbar',
            });

            form.reset(); // Limpia el formulario
            this.selectedFile = null; // Limpia el archivo seleccionado
          });
        }
      } else {
        // Muestra un mensaje de error

        this._snackBar.open('El usuario no está autorizado para agregar un producto', 'Cerrar', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: 'my-snackbar',
        });

        console.log('El usuario no está autorizado para agregar un producto');
      }
    }
    console.log('Formulario valido?', form.valid, this.newProduct);
  }

  deleteProduct(idProduct: number | undefined) {
    if (idProduct !== undefined) {
      this._productService.deleteProduct(idProduct).subscribe({
        next: () => {
          // Actualizar la lista de caballos después de eliminar un caballo
          this.getProducts();
        },
        error: (error) => {
          if (error.status === 200) {
            // Si el estado de la respuesta es 200, asumir que la eliminación fue exitosa

            this._snackBar.open('Producto eliminado', 'Cerrar', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: 'my-snackbar',
            });

            this.getProducts();
          } else {

            this._snackBar.open('Error al eliminar el producto', 'Cerrar', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: 'my-snackbar',
            });

            // Manejar otros errores aquí
            console.error(error);
          }
        }
      });
    }
  }

  updateProduct(form: NgForm) {
    if (form.valid) {
      if (this.selectedFile === null) {
        console.log('No file selected');
        // Handle no file selected
      } else {
        this._productService.putProduct(this.selectedProductId, this.productById, this.selectedFile).subscribe(
          response => {
            console.log('Product updated successfully');

            this._snackBar.open('Producto actualizado', 'Cerrar', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: 'my-snackbar',
            });

            form.reset();
            // Handle successful response
          },
          error => {

            this._snackBar.open('Error al actualizar el producto', 'Cerrar', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: 'my-snackbar',
            });

            console.log('Error updating horse:', error);
            // Handle error
          }
        );
      }
    }
  }

  onProductSelectChange() {
  console.log('selectedProductId:', this.selectedProductId); // Verificar el valor de selectedProductId

  const selectedProductId = Number(this.selectedProductId);
  const selectedProduct = this.products.find(product => {
    console.log('product.idProduct:', product.idProduct); // Verificar el valor de idProduct para cada producto
    return product.idProduct === selectedProductId;
  });

  if (selectedProduct) {
    this.productById = selectedProduct;
  } else {
    alert("Producto no existe");
  }
  }

}
