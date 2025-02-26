import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialpageComponent } from './initialpage.component';

describe('InitialpageComponent', () => {
  let component: InitialpageComponent;
  let fixture: ComponentFixture<InitialpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
