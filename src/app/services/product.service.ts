import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'localhost:3000';  // Cambiar a tu URL real
  private uploadUrl = 'http://172.17.22.89:3000/upload';  // URL para subir la imagen

  constructor(private http: HttpClient) {}

  // Subir imagen
  uploadImage(image: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.post<string>(this.uploadUrl, formData);
  }

  // Crear un nuevo producto
  addProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/products`, productData);
  }

  // Actualizar un producto
  updateProduct(productId: number, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/products/${productId}`, productData);
  }

  // Obtener un producto por su ID
  getProduct(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/products/${productId}`);
  }
}
