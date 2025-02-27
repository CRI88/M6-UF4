import { Routes } from '@angular/router';
import { InitialpageComponent } from './components/initialpage/initialpage.component';
import { AdminComponent } from './components/admin/admin.component';
import { Component } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
    { path: '', component: InitialpageComponent },
    { path: 'admin', component: AdminComponent},
    { path: 'products', component: ProductsComponent},
];
