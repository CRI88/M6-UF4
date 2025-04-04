import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Verifica que no haya solicitudes pendientes
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', async () => {
    const mockProducts = [
      { productid: 1, name: 'Product 1', description: 'Description 1', offer: 0, price: 10, type: 'type1', image: 'image1.jpg' },
      { productid: 2, name: 'Product 2', description: 'Description 2', offer: 0, price: 20, type: 'type2', image: 'image2.jpg' }
    ];

    // Espía el método fetch para simular la llamada GET
    const fetchSpy = spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      } as Response)
    );

    // Llama a ngOnInit y espera a que se resuelvan las promesas
    await component.ngOnInit();
    fixture.detectChanges();

    // Verifica que fetch se haya llamado con la URL y opciones correctas
    expect(fetchSpy).toHaveBeenCalledWith(
      'http://127.0.0.1:3000/api/products',
      jasmine.objectContaining({ method: 'GET', headers: { 'Content-Type': 'application/json' } })
    );

    // Verifica que los productos se hayan asignado correctamente
    expect(component.products).toEqual(mockProducts);
  });

  it('should add product to cart', async () => {
    const mockProduct = { userId: 2, total_amount: 10 };
    //component.userId = 2; // Simula que el usuario está autenticado

    // Llama al método addToCart y guarda la promesa
    const addCartPromise = component.addToCart(mockProduct);

    // Espera la solicitud POST para la creación de la orden
    const orderReq = httpMock.expectOne('http://127.0.0.1:3000/api/orders');
    expect(orderReq.request.method).toBe('POST');

    await addCartPromise;
  });

  it('should delete product', async () => {
    const mockProduct = { productid: 1, name: 'Product 1', description: 'Description 1', offer: 0, price: 10, type: 'type1', image: 'image1.jpg' };

    // Simula que hay un producto en la lista
    component.products = [mockProduct];

    // Llamar al método y guardar la promesa
    const deletePromise = component.deleteProduct(mockProduct);
    const id = mockProduct.productid;

    // Interceptar la solicitud DELETE
    const deleteReq = httpMock.expectOne(`http://127.0.0.1:3000/api/products/${id}`);
    expect(deleteReq.request.method).toBe('DELETE');

    // Simular respuesta exitosa
    deleteReq.flush({}, { status: 200, statusText: 'OK' });

    // Esperar que la promesa se complete
    await deletePromise;

    // Verificar que el producto fue eliminado de la lista
    expect(component.products.length).toBe(0);

    // Verificar que no haya solicitudes pendientes
    httpMock.verify();
  });

});
