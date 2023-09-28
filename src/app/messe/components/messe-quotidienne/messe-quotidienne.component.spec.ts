import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesseQuotidienneComponent } from './messe-quotidienne.component';

describe('MesseQuotidienneComponent', () => {
  let component: MesseQuotidienneComponent;
  let fixture: ComponentFixture<MesseQuotidienneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesseQuotidienneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesseQuotidienneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
