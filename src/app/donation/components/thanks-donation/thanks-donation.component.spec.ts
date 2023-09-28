import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksDonationComponent } from './thanks-donation.component';

describe('ThanksDonationComponent', () => {
  let component: ThanksDonationComponent;
  let fixture: ComponentFixture<ThanksDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanksDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanksDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
