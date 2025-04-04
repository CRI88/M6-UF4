import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  userRole: string = String(sessionStorage.getItem('userRole'));
  userId = Number(sessionStorage.getItem('idUsuario'));
  stock = 5;
  products: any[] = [];

  constructor(private httpclient: HttpClient) { }

  async ngOnInit(): Promise<void> {

    console.log('User Role:', this.userRole);
    console.log('User ID:', this.userId);
    

    try {
      const response = await fetch('http://127.0.0.1:3000/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error al obtener productos: ${response.statusText}`);
      }

      this.products = await response.json();
      console.log(this.products);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  async addToCart(product: any) {
    if (!this.userId) {
      console.error('Usuario no autenticado');
      return;
    }
    try {
      console.log('Enviando orden...');
      const orderResponse = await this.httpclient.post('http://127.0.0.1:3000/api/orders', {
        userid: this.userId,
        total_amount: product.price
      }).toPromise();
      console.log('Orden creada:', orderResponse);
  
      const orderId = (orderResponse as any).orderid;
      console.log('Enviando artículo para orden:', orderId);
      const orderItemResponse = await this.httpclient.post('http://127.0.0.1:3000/api/order_items', {
        orderid: orderId + 1,
        productid: product.productid,
        quantity: 1,
        price: product.price
      }).toPromise();
      console.log('Artículo añadido a la orden:', orderItemResponse);
  
      console.log('Producto añadido al carrito correctamente');
    } catch (error) {
      console.error('Error al añadir producto al carrito', error);
    }
  }  

  /* async editProduct(product: any) {
    try {
      await this.httpclient.put(`http://127.0.0.1:3000/api/products/${product.productid}`, product).toPromise();
      console.log('Producto actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar producto', error);
    }
  } */

  async deleteProduct(product: any) {
    try {
      await lastValueFrom(this.httpclient.delete(`http://127.0.0.1:3000/api/products/${product.productid}`));
      console.log('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  }
}
