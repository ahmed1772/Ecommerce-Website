import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import { DetailsComponent } from './details/details.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
//    {path: "login" , component:LoginComponent},
    {path: "" , component:RegisterComponent, pathMatch:'full'},
    {path: "Home" , component:HomeComponent},
    {path: "Cart" , component:CartComponent},
    {path: "Categories" , component:CategoriesComponent},
    {path: "Products" , component:ProductsComponent},
    {path: "Brands" , component:BrandsComponent},
    {path: "details" , component:DetailsComponent},
    {path: "Register" , component:RegisterComponent},
    {path: "Login" , component:LoginComponent},
    {path: "**" , component:ErrorComponent},

];

