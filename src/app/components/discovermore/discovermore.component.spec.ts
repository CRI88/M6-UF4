import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscovermoreComponent } from './discovermore.component';

describe('DiscovermoreComponent', () => {
  let component: DiscovermoreComponent;
  let fixture: ComponentFixture<DiscovermoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscovermoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscovermoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
