import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HorseComponent } from './pages/horse/horse.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'about-us',component: AboutUsComponent },
    { path: 'horse/v1', component: HorseComponent },
    { path: '**', redirectTo: '', pathMatch: 'full'}

];
