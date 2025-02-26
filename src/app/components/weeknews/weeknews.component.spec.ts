import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeknewsComponent } from './weeknews.component';

describe('WeeknewsComponent', () => {
  let component: WeeknewsComponent;
  let fixture: ComponentFixture<WeeknewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeknewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeknewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
