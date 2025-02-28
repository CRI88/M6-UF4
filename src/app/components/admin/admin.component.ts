import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgIf, NgClass } from '@angular/common';
import { ProductService } from '../../services/product.service';

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
  private apiUrl = 'http://172.17.22.89:3000/upload';

  constructor(private fb: FormBuilder, private http: HttpClient, private productService: ProductService) {
    this.productForm = this.fb.group({
      reference: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+([,.][0-9]+)?$')]],
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

      formData.append('reference', productData.reference);
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('type', productData.type);
      formData.append('offer', productData.offer.toString());

      if (productData.image) {
        formData.append('image', productData.image, productData.image.name);
      }

      this.http.post(this.apiUrl, formData).subscribe(
        (response) => {
          console.log('Producto agregado:', response);

          this.productService.addProduct({
            ...productData,
            imageUrl: this.imagePreview
          });

          this.productForm.reset();
          this.imagePreview = null;
        },
        (error) => {
          console.error('Error al agregar producto:', error);
        }
      );
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
