import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductService (Integration Tests)', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should upload an image', () => {
    const mockResponse = 'http://172.17.22.89:3000/uploads/image.jpg';
    const mockFile = new File(['dummy content'], 'test-image.jpg', { type: 'image/jpeg' });

    service.uploadImage(mockFile).subscribe(response => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne('http://172.17.22.89:3000/upload');
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();
    req.flush(mockResponse);
  });

  it('should add a new product', () => {
    const mockProduct = {
      name: 'Test Product',
      price: 50.00,
      description: 'This is a test product',
      type: 'electronics',
      offer: false,
      image: 'test.jpg',
    };

    service.addProduct(mockProduct).subscribe(response => {
      expect(response).toEqual({ success: true, product: mockProduct });
    });

    const req = httpMock.expectOne('localhost:3000/api/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush({ success: true, product: mockProduct });
  });

  it('should update a product', () => {
    const productId = 1;
    const updatedProduct = {
      name: 'Updated Product',
      price: 60.00,
      description: 'Updated description',
      type: 'electronics',
      offer: true,
      image: 'updated.jpg',
    };

    service.updateProduct(productId, updatedProduct).subscribe(response => {
      expect(response).toEqual({ success: true, product: updatedProduct });
    });

    const req = httpMock.expectOne(`localhost:3000/api/products/${productId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush({ success: true, product: updatedProduct });
  });

  it('should get a product by ID', () => {
    const productId = 1;
    const mockProduct = {
      id: productId,
      name: 'Existing Product',
      price: 40.00,
      description: 'Some description',
      type: 'fashion',
      offer: false,
      image: 'existing.jpg',
    };

    service.getProduct(productId).subscribe(response => {
      expect(response).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`localhost:3000/api/products/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
});
