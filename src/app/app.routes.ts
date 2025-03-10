import { Routes } from '@angular/router';
import { InitialpageComponent } from './components/initialpage/initialpage.component';
import { AdminComponent } from './components/admin/admin.component';
import { Component } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { AccountComponent } from './components/account/account.component';
import { ProductviewComponent } from './components/productview/productview.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: InitialpageComponent },
    { path: 'initial', component: InitialpageComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'admin', component: AdminComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'account', component: AccountComponent},
    { path: 'productview', component: ProductviewComponent}
];
