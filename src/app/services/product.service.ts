import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSource = new BehaviorSubject<any[]>([]);
  products$ = this.productsSource.asObservable();

  addProduct(product: any) {
    const currentProducts = this.productsSource.getValue();
    this.productsSource.next([...currentProducts, product]);
  }

  getProducts() {
    return this.products$;
  }
}
