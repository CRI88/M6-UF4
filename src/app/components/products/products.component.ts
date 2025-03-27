import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private httpclient: HttpClient) { }

  async ngOnInit(): Promise<void> {
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
}
