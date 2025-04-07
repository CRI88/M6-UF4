import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ productoId: '1', action: 'update' })
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.productForm.value).toEqual({
      reference: '',
      name: '',
      price: '',
      description: '',
      type: 'running',
      offer: false,
      image: null,
    });
  });

  it('should mark form as invalid when required fields are empty', () => {
    component.productForm.setValue({
      reference: '',
      name: '',
      price: '',
      description: '',
      type: 'running',
      offer: false,
      image: null,
    });

    expect(component.productForm.invalid).toBeTruthy();
  });

  it('should validate name field with max length', () => {
    component.productForm.controls['name'].setValue('a'.repeat(51));
    expect(component.productForm.controls['name'].valid).toBeFalsy();
  });

  it('should validate price as a positive number within range', () => {
    component.productForm.controls['price'].setValue('-5');
    expect(component.productForm.controls['price'].valid).toBeFalsy();

    component.productForm.controls['price'].setValue('100000');
    expect(component.productForm.controls['price'].valid).toBeFalsy();

    component.productForm.controls['price'].setValue('50');
    expect(component.productForm.controls['price'].valid).toBeTruthy();
  });

  it('should handle file selection and update imagePreview', () => {
    const file = new File(['dummy content'], 'test-image.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } } as unknown as Event;
  
    component.onFileSelected(event);
  
    const reader = new FileReader();
    reader.onload = () => {
      component.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  
    expect(component.imagePreview).toBeTruthy();
  });
  

  it('should send a POST request when adding a new product', fakeAsync(() => {
    // Asignamos valores al formulario
    component.productForm.setValue({
      reference: '12345',
      name: 'Nuevo Producto',
      price: '25.50',
      description: 'Un producto nuevo',
      offer: false,
      type: 'otros',
      image: 'captura2.png',
    });
  
    component.onSubmit();
  
    const req = httpMock.expectOne('http://127.0.0.1:3000/api/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      productname: 'Nuevo Producto',
      description: 'Un producto nuevo',
      price: 25.50,
      offer: false,
      type: 'otros',
      image: 'captura2.png',
    });
  
    req.flush({ success: true });
    tick();
  }));
  

  it('should update form when editing a product', fakeAsync(() => {
    const mockProduct = {
      productid: 1,
      productname: 'Zapato Deportivo',
      price: 49.99,
      description: 'Zapatos cómodos para correr',
      type: 'calzado',
      offer: true,
      image: 'zapato.jpg'
    };
  
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response(JSON.stringify(mockProduct))));
  
    component.ngOnInit();
    tick();
  
    expect(component.productForm.value.name).toBe('Zapato Deportivo');
    expect(component.productForm.value.price).toBe(49.99);
    expect(component.productForm.value.description).toBe('Zapatos cómodos para correr');
  }));
  
});
