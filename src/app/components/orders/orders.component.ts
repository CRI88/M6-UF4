import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  userRole: string = String(sessionStorage.getItem('userRole'));
  userId = Number(sessionStorage.getItem('idUsuario'));
  orders: any[] = [];
  orderItems: { [key: number]: any[] } = {}; // Productos por cada orden

  constructor(private httpclient: HttpClient) {}

  async ngOnInit(): Promise<void> {
    console.log('User Role:', this.userRole);
    console.log('User ID:', this.userId);

    if (!this.userId) {
      console.error('Usuario no autenticado');
      return;
    }

    try {
      // Obtener todas las órdenes del usuario
      const ordersResponse = await fetch(`http://127.0.0.1:3000/api/orders/${this.userId}`);
      if (!ordersResponse.ok) throw new Error('Error al obtener órdenes');
      this.orders = await ordersResponse.json();

      // Obtener productos de cada orden
      for (const order of this.orders) {
        const orderItemsResponse = await fetch(`http://127.0.0.1:3000/api/order_items/${order.orderid}`);
        if (!orderItemsResponse.ok) throw new Error('Error al obtener productos de la orden');

        this.orderItems[order.orderid] = await orderItemsResponse.json();
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }
}
