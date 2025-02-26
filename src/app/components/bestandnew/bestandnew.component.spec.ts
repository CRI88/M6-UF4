import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestandnewComponent } from './bestandnew.component';

describe('BestandnewComponent', () => {
  let component: BestandnewComponent;
  let fixture: ComponentFixture<BestandnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestandnewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestandnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
