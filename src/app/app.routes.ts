import { Routes } from '@angular/router';
import { InitialpageComponent } from './components/initialpage/initialpage.component';
import { AdminComponent } from './components/admin/admin.component';
import { Component } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { AccountComponent } from './components/account/account.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    { path: '', component: InitialpageComponent },
    { path: 'initial', component: InitialpageComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'admin', component: AdminComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'account', component: AccountComponent},
    { path: 'orders', component: OrdersComponent}
];
