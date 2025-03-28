import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgIf, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  productForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  private apiUrl = 'http://172.17.22.89:3000/upload';

  action: string = '';
  productoId: number = 0;

  productoUpdate = {
    productid: 0,
    productname: "",
    price: 0,
    description: "",
    type: "",
    offer: false,
    image: ""
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.productForm = this.fb.group({
      reference: ['', Validators.required],
      name: ['', [
        Validators.required,
        this.nameValidator.bind(this),
        Validators.maxLength(50)
      ]],
      price: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+([,.][0-9]+)?$'),
        Validators.min(0.1),
        Validators.max(99999)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      type: ['running'],
      offer: [false],
      image: [null]
    });
  }

  nameValidator(control: any) {
    let nameTaken = false;

    //this.productService.getProducts().subscribe(products => {
    // if (products.some((product: any) => product.name.toLowerCase() === control.value.toLowerCase())) {
    //  nameTaken = true;
    //  }
    //  });

    if (nameTaken) {
      return { nameTaken: true };
    }

    return null;
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
      /* const formData = new FormData();

      formData.append('reference', productData.reference);
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('type', productData.type);
      formData.append('offer', productData.offer.toString());
      console.log("fg", formData);

      if (productData.image) {
        formData.append('image', productData.image, productData.image.name);
      } */

        let image = "";
        if (this.productForm.value.image){
          image = this.productForm.value.image;
        }

        const formData = {
          productname: this.productForm.value.name,
          description: this.productForm.value.description,
          price: this.productForm.value.price,
          offer: this.productForm.value.offer,
          type: this.productForm.value.type,
          stock: this.productForm.value.stock,
          image: image
        }

      if (this.action === 'update') {
        // Actualizar producto (PUT)
        this.http.put(`http://127.0.0.1:3000/api/products/${this.productoId}`, formData).subscribe(
          (response) => {
            console.log('Producto actualizado:', response);
            this.productForm.reset();
            this.imagePreview = null;
          },
          (error) => {
            console.error('Error al actualizar producto:', error);
          }
        );
      } else {
        // Crear nuevo producto (POST)
        this.http.post(this.apiUrl, formData).subscribe(
          (response) => {
            console.log('Producto agregado:', response);
            this.productForm.reset();
            this.imagePreview = null;
          },
          (error) => {
            console.error('Error al agregar producto:', error);
          }
        );
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  async ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.productoId = params['productoId'],
      this.action = params['action']
    });

    console.log("ngOnInit()");

    console.log("productoId: ", this.productoId);

    if (this.action === "update") {
      //Get producto by id

      try {
        const response = await fetch("http://localhost:3000/api/products/" + this.productoId);

        this.productoUpdate = await response.json();

        this.productForm.patchValue({ reference: this.productoUpdate.productid })
        this.productForm.patchValue({ name: this.productoUpdate.productname })
        this.productForm.patchValue({ price: this.productoUpdate.price })
        this.productForm.patchValue({ description: this.productoUpdate.description })
        this.productForm.patchValue({ type: this.productoUpdate.type })
        this.productForm.patchValue({ offer: this.productoUpdate.offer })

      } catch (error) {
        console.log("Se ha producido un error: ", error);
      }



    }
  }
}
