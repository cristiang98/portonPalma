import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HorseComponent } from './pages/horse/horse.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HorseAdminComponent } from './pages/admin/horse-admin/horse-admin.component';
import { ProductAdminComponent } from './pages/admin/product-admin/product-admin.component';
import { ServiceeAdminComponent } from './pages/admin/servicee-admin/servicee-admin.component';
import { adminGuard } from './admin.guard';
import { ForgotPassComponent } from './pages/forgotPass/forgot-pass/forgot-pass.component';
import { ServiceeComponent } from './pages/servicee/servicee.component';
import { ResetPassComponent } from './pages/reset-pass/reset-pass.component';
import { EditUserComponent } from './pages/editUser/edit-user/edit-user.component';
import { EventsComponent } from './pages/events/events.component';
import { SalesComponent } from './pages/admin/sales/sales.component';
import { HistoryUserComponent } from './pages/history-user/history-user.component';
import { PqrsComponent } from './pages/pqrs/pqrs.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'about-us',component: AboutUsComponent },
    { path: 'horse/v1', component: HorseComponent },
    { path:'product/v1', component: ProductsComponent},
    { path:'services/v1', component: ServiceeComponent},
    { path: 'event/v1', component: EventsComponent},
    { path: 'user/auth/login', component: LoginComponent},
    { path: 'user/auth/register', component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPassComponent},
    { path: 'reset-password', component: ResetPassComponent},
    { path: 'edit-user', component: EditUserComponent},
    { path: 'history-user', component: HistoryUserComponent },
    { path: 'pqrs', component: PqrsComponent},
    { path: 'admin', component: AdminComponent, canActivate:[adminGuard], children: [
        { path: 'horse/v1', component: HorseAdminComponent },
        { path: 'product/v1', component: ProductAdminComponent },
        { path: 'services/v1', component:  ServiceeAdminComponent},
        { path: 'event/v1', component: HorseAdminComponent },
        { path: 'show-sale', component: SalesComponent}
      ]},
    { path: '**', redirectTo: '', pathMatch: 'full'}

];
