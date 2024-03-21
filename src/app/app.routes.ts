import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HorseComponent } from './pages/horse/horse.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'about-us',component: AboutUsComponent },
    { path: 'horse/v1', component: HorseComponent },
    { path:'product/v1', component: ProductsComponent},
    { path:'services/v1', component: ProductsComponent},
    { path: 'user/auth/login', component: LoginComponent},
    { path: 'user/auth/register', component: RegisterComponent},
    { path: '**', redirectTo: '', pathMatch: 'full'}

];
