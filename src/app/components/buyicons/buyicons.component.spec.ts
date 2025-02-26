import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyiconsComponent } from './buyicons.component';

describe('BuyiconsComponent', () => {
  let component: BuyiconsComponent;
  let fixture: ComponentFixture<BuyiconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyiconsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyiconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
