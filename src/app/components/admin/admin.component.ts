import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  productForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  products: any[] = []; // Este array simula una lista de productos almacenados
  private apiUrl = 'http://172.17.22.89:3000/upload'; // La URL de tu servidor (asegúrate de que el backend esté corriendo)

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      reference: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Campo obligatorio y debe ser un número
      description: ['', Validators.required],
      type: ['running'],
      offer: [false],
      image: [null]
    })
  }

  isInvalid(field: string): boolean {
    return this.productForm.controls[field].invalid && this.productForm.controls[field].touched;
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      const formData = new FormData();

      // Agregar los datos del formulario a un objeto FormData (incluyendo la imagen)
      formData.append('reference', productData.reference);
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('type', productData.type);
      formData.append('offer', productData.offer.toString());

      if (productData.image) {
        formData.append('image', productData.image, productData.image.name);
      }

      const existingProductIndex = this.products.findIndex(p => p.reference === productData.reference);

      if (existingProductIndex !== -1) {
        // Si el producto ya existe, actualizamos el producto en el servidor
        this.updateProduct(formData);
      } else {
        // Si el producto no existe, lo agregamos al servidor
        this.addProduct(formData);
      }

    } else {
      this.productForm.markAllAsTouched();
    }
  }

  // Método para agregar un nuevo producto al servidor
  addProduct(formData: FormData): void {
    this.http.post(this.apiUrl, formData).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
        // Aquí puedes actualizar la lista de productos o mostrar un mensaje de éxito
      },
      (error) => {
        console.error('Error al agregar producto:', error);
      }
    );
  }

  // Método para actualizar un producto existente
  updateProduct(formData: FormData): void {
    const reference = this.productForm.value.reference;
    this.http.put(`${this.apiUrl}/${reference}`, formData).subscribe(
      (response) => {
        console.log('Producto actualizado:', response);
        // Aquí puedes actualizar la lista de productos o mostrar un mensaje de éxito
      },
      (error) => {
        console.error('Error al actualizar producto:', error);
      }
    );
  }
}